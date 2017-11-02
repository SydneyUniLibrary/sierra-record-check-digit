'use strict'

/*
 * Copyright (C) 2017  The University of Sydney Library
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


const expect = require('chai').expect

const { addCheckDigit, calcCheckDigit } = require('./index')


const knownCheckDigits = [
  [ 100114,  '0' ],
  [ 2539964, '0' ],
  [ 100610,  '1' ],
  [ 1655776, '1' ],
  [ 583623,  '2' ],
  [ 1629736, '2' ],
  [ 572288,  '3' ],
  [ 4093863, '3' ],
  [ 284683,  '4' ],
  [ 3898776, '4' ],
  [ 395792,  '5' ],
  [ 3040121, '5' ],
  [ 542671,  '6' ],
  [ 2626834, '6' ],
  [ 459573,  '7' ],
  [ 2699873, '7' ],
  [ 581326,  '8' ],
  [ 2054794, '8' ],
  [ 539148,  '9' ],
  [ 1203395, '9' ],
  [ 585345,  'x' ],
  [ 1562237, 'x' ],
]

const obviousRecordNumbersWithCheckDigits = [
  'b33846327',
  'b47116523@mdill',
  'o100007x',
  'b1125421x',
]

const obviousInvalidRecordNumbers = [
  null,
  {},
  '#b33846327',
  'b',
  '.b',
  'b12345',
  'b4711652@',
  'b4711652@toolong',
  '.b12345',
  '.b4711652@',
  '.b4711652@toolong',
]


describe('calcCheckDigit', function () {
  for (const [ recordNum, expectedCheckDigit ] of knownCheckDigits) {
    it(`given ${recordNum}, it returns '${expectedCheckDigit}'`, function () {
      expect(calcCheckDigit(Number(recordNum))).to.equal(expectedCheckDigit)
    })
    it(`given '${recordNum}', it returns '${expectedCheckDigit}'`, function () {
      expect(calcCheckDigit(String(recordNum))).to.equal(expectedCheckDigit)
    })
  }
})


describe('addCheckDigit', function () {

  describe('record number as a number', function () {
    for (const [ recordNum, expectedCheckDigit ] of knownCheckDigits) {
      const input = Number(recordNum)
      const expectedOutput = `${recordNum}${expectedCheckDigit}`
      it(`given ${input}, it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input)).to.equal(expectedOutput)
      })
    }
  })

  describe('record number as a string', function () {
    for (const [ recordNum, expectedCheckDigit ] of knownCheckDigits) {
      const input = String(recordNum)
      const expectedOutput = `${recordNum}${expectedCheckDigit}`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input)).to.equal(expectedOutput)
      })
    }
  })

  describe('record number with a type char', function () {
    for (const [ recordNum, expectedCheckDigit ] of knownCheckDigits) {
      const input = `b${recordNum}`
      const expectedOutput = `b${recordNum}${expectedCheckDigit}`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input)).to.equal(expectedOutput)
      })
    }
  })

  describe('record number with a type char and initial period', function () {
    for (const [ recordNum, expectedCheckDigit ] of knownCheckDigits) {
      const input = `.i${recordNum}`
      const expectedOutput = `.i${recordNum}${expectedCheckDigit}`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input)).to.equal(expectedOutput)
      })
    }
  })

  describe("doesn't add to virtual records by default", function () {
    for (const [ recordNum ] of knownCheckDigits) {
      const input = `p${recordNum}@abcde`
      const expectedOutput = `p${recordNum}@abcde`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input)).to.equal(expectedOutput)
      })
    }
    for (const [ recordNum ] of knownCheckDigits) {
      const input = `.p${recordNum}@abcde`
      const expectedOutput = `.p${recordNum}@abcde`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input)).to.equal(expectedOutput)
      })
    }
  })

  describe("doesn't add to virtual records if explicitly told not to", function () {
    for (const [ recordNum ] of knownCheckDigits) {
      const input = `p${recordNum}@abcde`
      const expectedOutput = `p${recordNum}@abcde`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input, { addToVirtualRecords: false })).to.equal(expectedOutput)
      })
    }
    for (const [ recordNum ] of knownCheckDigits) {
      const input = `.p${recordNum}@abcde`
      const expectedOutput = `.p${recordNum}@abcde`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input, { addToVirtualRecords: false })).to.equal(expectedOutput)
      })
    }
  })

  describe('adds to virtual records when told to', function () {
    for (const [ recordNum, expectedCheckDigit ] of knownCheckDigits) {
      const input = `p${recordNum}@abcde`
      const expectedOutput = `p${recordNum}${expectedCheckDigit}@abcde`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input, { addToVirtualRecords: true })).to.equal(expectedOutput)
      })
    }
    for (const [ recordNum, expectedCheckDigit ] of knownCheckDigits) {
      const input = `.p${recordNum}@abcde`
      const expectedOutput = `.p${recordNum}${expectedCheckDigit}@abcde`
      it(`given '${input}', it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input, { addToVirtualRecords: true })).to.equal(expectedOutput)
      })
    }
  })

  describe('invalid input', function () {
    for (const input of obviousRecordNumbersWithCheckDigits) {
      it(`given '${input}', it throws an error`, function () {
        function callingAddCheckDigit() { addCheckDigit(input) }
        expect(callingAddCheckDigit).to.throw(/already has a check digit/i)
      })
    }
    for (const input of obviousInvalidRecordNumbers) {
      it(`given '${input}', it throws an error`, function () {
        function callingAddCheckDigit() { addCheckDigit(input) }
        expect(callingAddCheckDigit).to.throw(/record number is invalid/i)
      })
    }
  })

  describe('uses the given check digit', function () {
    for (const [ recordNum ] of knownCheckDigits) {
      const input = Number(recordNum)
      const expectedOutput = `${recordNum}a`
      it(`given ${input}, it returns '${expectedOutput}'`, function () {
        expect(addCheckDigit(input, { checkDigit: 'a' })).to.equal(expectedOutput)
      })
    }
  })

})
