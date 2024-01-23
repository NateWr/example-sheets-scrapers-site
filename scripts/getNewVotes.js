import fs from 'fs'
import { google } from 'googleapis'
import { spreadsheetId, getCredentials } from './helpers/google.js'

const scopes = [
  'https://www.googleapis.com/auth/spreadsheets',
]
const auth = getCredentials(scopes)
const sheets = google.sheets({
  version: 'v4',
  auth: auth
})

const votesRange = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `A2:Z9999`
})

const votes = votesRange?.data?.values
  ?.map(([
    name,
    url,
  ]) => {
    return {
      name,
      url,
    }
  })
  ?? []

const oldVotesRange = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `MSPs!C1:ZZ1`
})

const oldVotes = oldVotesRange?.data?.values?.flat() ?? []
const newVotes = votes
  .filter(vote => !oldVotes.includes(vote.name))

if (newVotes.length) {
  try {
    fs.writeFileSync('./data/votes.json', JSON.stringify(newVotes, null, 2))
  } catch (err) {
    console.error(err)
  }
} else {
  console.log(`No new votes found.`)
}