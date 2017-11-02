# sierra-record-check-digit
Calculates the check digit for a Sierra record number.




## Install

```
npm install 'SydneyUniLibrary/sierra-record-check-digit#v1.0'
```



## How to use

In NodeJS v8+:
```js
const { addCheckDigit, calcCheckDigit } = require('@sydneyunilibrary/sierra-record-check-digit')
```

In ECMAScript 2015+:
```js
import { addCheckDigit, calcCheckDigit } from '@sydneyunilibrary/sierra-record-check-digit'
```

### calcCheckDigit

`calcCheckDigit` calculates a check digit for a given record number. The given record number can be a string or a number.
Regardless, the returned check digit will be a string.

```js
calcCheckDigit('3384632') // => '7'
calcCheckDigit(3384632) // => '7'
calcCheckDigit(1125421) // => 'x'
``` 

The record number must be just the number part. It cannot include a record type char, an initial period or the
virtual record part. `calcCheckDigit` will throw an error if it does.

```js
calcCheckDigit('i4105199') // => throws Error
calcCheckDigit('.i4105199') // => throws Error
calcCheckDigit('i4105199@abcde') // => throws Error
``` 

`calcCheckDigit` presumes the given record number does not have a check digit. `calcCheckDigit` will give the wrong
result if you give it a record number that does have a check digit.

### addCheckDigit

`addCheckDigit` calculates the check digit for a given record number and returns a new string that includes both the
record number and the check digit. The given record number can be a string or number. It can include a record type char
and an initial period.

```js
addCheckDigit(3384632) // => '33846327'
addCheckDigit('3384632') // => '33846327'
addCheckDigit('i3384632') // => 'i33846327'
addCheckDigit('.i3384632') // => '.i33846327'
````

You can explicitly give `addCheckDigit` a check digit to add. You can do this if you want to add the palceholder check
digit `a`, or if you already know the check digit want to save `addCheckDigit` for having to calculate it.
`addCheckDigit` will not validate the check digit you give it in any way.  

```js
addCheckDigit('3384632', { checkDigit: 'a' }) // => '3384632a'
addCheckDigit('i3384632', { checkDigit: '7' }) // => 'i33846327'
addCheckDigit('i3384632', { checkDigit: '!' }) // => 'i3384632!'
```

addCheckDigit will not add a check digit to a virtual record number by default, even if you explicitly give it a check
digit to add. This mirrors Sierra's own behaviour.

```js
addCheckDigit('i3384632@abcd') // => 'i3384632@abcd'
addCheckDigit('.i3384632@abcd') // => '.i3384632@abcd'
````

You can include an option to force `addCheckDigit` to add a check digit to virtual record numbers.

```js
addCheckDigit('i3384632@abcd', { addToVirtualRecords: true}) // => 'i33846327@abcd'
addCheckDigit('.i3384632@abcd', { addToVirtualRecords: true}) // => '.i33846327@abcd'
````

`addCheckDigit` presumes the given record number does not already include the check digit. If you give it a record number
that does include a check digit, `addCheckDigit` will add another check digit and you will end up with an invalid record
number. If you don't know if a record number has a check digit, you can use the `detect` function from
[@SydneyUniLibrary/sierra-record-id](https://github.com/SydneyUniLibrary/sierra-record-id) to find out.




## License

Copyright (c) 2017  The University of Sydney Library

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
