/// <reference path="../support/index.d.ts" />
import {
  genreFields,
  platformFields,
  priceFields,
  sortFields
} from '../../src/utils/filter/fields'

describe('Explore Page', () => {
  it('should render filter columns', () => {
    cy.visit('/games')

    cy.findByRole('heading', { name: /sort by price/i }).should('exist')
    cy.findByRole('heading', { name: /^price/i }).should('exist')
    cy.findByRole('heading', { name: /platforms/i }).should('exist')
    cy.findByRole('heading', { name: /genres/i }).should('exist')

    cy.getFields(priceFields)
    cy.getFields(platformFields)
    cy.getFields(sortFields)
    cy.getFields(genreFields)
  })

  it('should show 12 games and add more games when show more button is clicked', () => {
    cy.getByDataCy('game-card').should('have.length', 12)
    cy.findByRole('button', { name: /show more/i }).click()
    cy.getByDataCy('game-card').should('have.length', 24)
  })

  it('should order by price', () => {
    cy.findByText(/lowest to highest/i).click()
    cy.location('href').should('contain', 'sort=price%3Aasc')

    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.findByText('$0.00').should('exist')
      })

    cy.findByText(/highest to lowest/i).click()
    cy.location('href').should('contain', 'sort=price%3Adesc')

    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeGreaterThan(0)
      })
  })

  it('should filter by price', () => {
    cy.findByText(/highest to lowest/i).click()

    cy.findByText(/free/i).click()
    cy.location('href').should('contain', 'price_lte=0')
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.findByText('$0.00').should('exist')
      })

    cy.findByText('Under $50').click()
    cy.location('href').should('contain', 'price_lte=50')
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(50)
      })

    cy.findByText('Under $100').click()
    cy.location('href').should('contain', 'price_lte=100')
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(100)
      })

    cy.findByText('Under $150').click()
    cy.location('href').should('contain', 'price_lte=150')
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(150)
      })

    cy.findByText('Under $250').click()
    cy.location('href').should('contain', 'price_lte=250')
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(250)
      })

    cy.findByText('Under $500').click()
    cy.location('href').should('contain', 'price_lte=500')
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(500)
      })
  })
})
