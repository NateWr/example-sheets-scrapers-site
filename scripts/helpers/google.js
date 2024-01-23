/**
 * Helper functions for connecting to Google's API
 */

import { auth } from 'google-auth-library'
import 'dotenv/config'

export const spreadsheetId = process.env.SPREADSHEET_ID

export const getCredentials = scopes => {
  const credentials = JSON.parse(
    atob(process.env.GOOGLE_SERVICE_ACCOUNT)
  )
  const creds = auth.fromJSON(credentials)
  creds.scopes = scopes

  return creds
}
