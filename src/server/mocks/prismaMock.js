/* global jest, beforeEach */
const { mockDeep, mockReset } = require('jest-mock-extended')

const prisma = require('../db/index')
const prismaMock = prisma

jest.mock('../db/index', () => mockDeep())

beforeEach(() => {
  mockReset(prismaMock)
})

module.exports = prismaMock;
