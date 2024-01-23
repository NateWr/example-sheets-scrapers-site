import fs from 'fs'
import { google } from 'googleapis'
import { spreadsheetId, getCredentials } from './helpers/google.js'

const votes = JSON.parse(
  await fs.promises.readFile(
    new URL('../data/votes.json', import.meta.url)
  )
)

if (!votes.length) {
  throw new Error('No voting records to save.')
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const getColumnLetter = number => {
  const pos = number % 26
  const letter = letters[pos]
  return letter.repeat(Math.ceil(number / 26))
}

const scopes = [
  'https://www.googleapis.com/auth/spreadsheets',
]
const auth = getCredentials(scopes)
const sheets = google.sheets({
  version: 'v4',
  auth: auth
})

const membersRange = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `MSPs!A2:A1000`
})
const members = membersRange?.data?.values?.flat() ?? []

const oldVotesRange = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `MSPs!B1:ZZ1`
})
const oldVotes = oldVotesRange?.data?.values ?? []
let countOldVotes = oldVotes.length ? oldVotes[0].length : 0

votes
  .forEach(vote => {
    countOldVotes++
    const columnLetter = getColumnLetter(countOldVotes)
    const memberVotes = members
      .map(member => {
        if (vote.members.aye.includes(member)) {
          return 'Aye'
        }
        if (vote.members.nae.includes(member)) {
          return 'Nae'
        }
        if (vote.members.abstained.includes(member)) {
          return 'Abstained'
        }
        if (vote.members.novote.includes(member)) {
          return 'Did not vote'
        }
        return ''
      })
    sheets.spreadsheets.values
      .update({
        auth,
        spreadsheetId,
        range: `MSPs!${columnLetter}1:${columnLetter}1000`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[vote.name], ...memberVotes.map(value => [value])],
        }
      })
  })
