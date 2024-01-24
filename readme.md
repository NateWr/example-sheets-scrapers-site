# Sheets and Scrapers

An example of how to use Cypress, Google Sheets, and Vite to create and publish public interest datasets.

## Get Started

Before you start, you will need the following.

1. A personal Google (Gmail) or Google Workspace account.
2. A copy of this [Google Sheet](https://docs.google.com/spreadsheets/d/1uI_xGjJoCHiGp2rXimHX44GAQrbOMuOHijhYxcRwE_Q) that you have ownership permissions on.
3. Create a [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) in your Google Cloud settings. You'll need to:
   1. Enable the Google Sheets API in your Google Cloud settings.
   2. Create a new Project.
   3. Create a new Service Account.
   4. Generate a JSON key for the Service Account.
4. Share your Google Sheet with the Service Account's email address. The email address will look like `<name>@<project>-123456.iam.gserviceaccount.com`.
5. Use the [btoa()](https://developer.mozilla.org/en-US/docs/Web/API/btoa) function to base64 encode the JSON key. Example: `btoa(JSON.stringify({...}))`.
6. Create a `.env` file with the encoded JSON key and the Google Sheet id:

```
GOOGLE_SERVICE_ACCOUNT="eyJ0e...29tIn0="
SPREADSHEET_ID="1uI_xGjJoCHi...YxcRwE_Q"
```

If you want help, join the [Scottish Technology Discord](https://discord.gg/bgHpBkq24p).

## Usage

Get the voting record for new votes from the Scottish Parliament website and save it in the spreadsheet.

```
npm run get-new-data
```

Get the site data from the spreadsheet.

```
npm run get-site-data
```

View the site in dev mode.

```
npm run dev
```

Build the site for production.

```
npm run build
```

Get all data and build the site in a single command (useful for automated deployments on services like Netlify).

```
npm run deploy
```