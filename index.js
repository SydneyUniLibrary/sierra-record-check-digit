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


function calcCheckDigit(recordNumber) {
  let m = 2
  let x = 0
  let i = Number(recordNumber)
  while (i > 0) {
    let a = i % 10
    i = Math.floor(i / 10)
    x += a * m
    m += 1
  }
  const r = x % 11
  return r === 10 ? 'x' : String(r)
}


function addCheckDigit(recordNumber, { addToVirtualRecords = false, checkDigit = undefined } = {}) {
  let numberPart, fore, aft
  if (typeof recordNumber === 'number') {
    numberPart = recordNumber
  } else {
    let match = /^(\.?[a-z]?)(\d{6,7})(@\w{1,5})?$/i.exec(recordNumber)
    if (match) {
      fore = match[1]
      numberPart = match[2]
      aft = match[3]
    } else {
      throw new Error(`Record number is invalid or already has a check digit: ${recordNumber}`)
    }
  }
  const chkDgt = (
    !aft || addToVirtualRecords
    ? (checkDigit || calcCheckDigit(numberPart))
    : undefined
  )
  return [ fore, numberPart, chkDgt, aft ].join('')
}


module.exports = {
  calcCheckDigit,
  addCheckDigit,
}
