/// <reference types="cypress" />

import votes from '../../data/new-votes.json'

const VOTES_FILE = './data/new-votes.json'

describe('Searches Scottish Parliament website for the voting records', () => {

  votes
    .filter(vote => !('members' in vote))
    .forEach((vote, i) => {
      it (`Gets voting record for ${vote.name}`, () => {
        const aye = []
        const nae = []
        const abstained = []
        const novote = []
        cy.visit(encodeURI(vote.url))
        cy.get('button:contains("No, thanks")')
          .click()
        cy.get('a:contains("Show details")')
          .click({multiple: true})
        cy.get('[id^="panel_votes_"')
          .each($panel => {
            $panel
              .find('h5:contains("For") + ul li')
              .each((i, li) => {
                aye.push(Cypress.$(li).text())
              })
            $panel
              .find('h5:contains("Against") + ul li')
              .each((i, li) => {
                nae.push(Cypress.$(li).text())
              })
            $panel
              .find('h5:contains("Abstained") + ul li')
              .each((i, li) => {
                abstained.push(Cypress.$(li).text())
              })
            $panel
              .find('h5:contains("Did not vote") + ul li')
              .each((i, li) => {
                novote.push(Cypress.$(li).text())
              })
          })
          .then(() => {
            votes[i].members = {
              aye,
              nae,
              abstained,
              novote,
            }
          })
      })
  })

  it('Saves voting records', () => {
    cy.writeFile(VOTES_FILE, JSON.stringify(votes, null, 2))
  })
})