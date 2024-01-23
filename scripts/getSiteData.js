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

const msps = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `MSPs!A1:ZZ9999`
})

const mspsRows = msps?.data?.values ?? []
const titles = mspsRows.slice(0, 1).flat()
const members = mspsRows
  .slice(1)
  .map(row => {
    const name = row[0]
    const party = row[1]
    const votes = row
      .slice(2)
      .map((vote, i) => {
        return {
          name: titles[i + 2],
          vote,
        }
      })
    return {
      name,
      party,
      votes,
    }
  })

const siteData = {
  members,
}

try {
  fs.writeFileSync('./data/site-data.json', JSON.stringify(siteData, null, 2))
} catch (err) {
  console.error(err)
}
