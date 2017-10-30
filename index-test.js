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
