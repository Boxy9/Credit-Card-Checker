// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const validateCred = arr => {
    let flag = false;
    let digit = 0;
    let sum = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        if ( flag ) {
            flag = false;
            digit = arr[i] * 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        else {
            flag = true;
            digit = arr[i];
        }
        sum += digit;
    }
    if (sum % 10 === 0) {
        return true;
    }
    else {
        return false;
    }
};
const findInvalidCards = arrNest => {
    let invalidCards = [];
    arrNest.forEach((arr) => {
        if (!validateCred(arr)) {
            invalidCards.push(arr);
        }
    })
    return invalidCards;
};
// console.log(findInvalidCards(batch));

const idInvalidCardCompanies = arrNest => {
    // console.log(arrNest);
    let comps = [];
    arrNest.forEach((arr) => {
        switch (arr[0]) {
            case 3:
                if (comps.indexOf('Amex (American Express)') === -1) {
                    comps.push('Amex (American Express)');
                }
                break;
            case 4:
                if (comps.indexOf('Visa') === -1) {
                    comps.push('Visa');
                }
                break;
            case 5:
                if (comps.indexOf('Mastercard') === -1) {
                    comps.push('Mastercard');
                }
                break;
            case 6:
                if (comps.indexOf('Discover') === -1) {
                    comps.push('Discover');
                }
                break;
            default:
                console.log('Company not found for # ' + arr);
                break;
        }
    });
    return comps;
};

const makeValidCardNums = strg => {
    let arr = [0];
    if (typeof strg === 'string') {
        // 'split' the string into an array of numbers..... 
        // get it to a number array using 'map', then 'filter' out anything that isn't a +ve number.
        arr = strg.split('').map( x => parseInt(x)).filter(x => parseInt(x) >= 0); 
    }
    else if (typeof strg === 'number') {
        const realStrg = strg.toString(); // make it a string
        // 'split' the string into an array of numbers..... 
        // get it to a number array using 'map', then 'filter' out anything that isn't a +ve number.
        arr = realStrg.split('').map( x => parseInt(x)).filter(x => parseInt(x) >= 0); 
    }
    else if (Array.isArray(strg)) {
        // just in case we have ['1','2','3'] or anything else.....
        arr = strg.map( x => parseInt(x)).filter(x => parseInt(x) >= 0);    
    }
    else {
        return 'Not a valid input for this function';
    }
    flag = false;
    let digit = 0;
    let sum = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        if ( flag ) {
            flag = false;
            digit = arr[i] * 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        else {
            flag = true;
            digit = arr[i];
        }
        sum += digit;
    }
    digit = (sum % 10);
    if (digit <= arr[arr.length - 1]) {
        arr[arr.length - 1] = arr[arr.length - 1] - digit;
    }
    else {
        arr[arr.length - 1] = arr[arr.length - 1] + (10 - digit);
    }
    if (validateCred(arr)) {
       console.log('valid ' + arr);
    }
    else {
       console.log('invalid' + arr + ' try again ?');
    }
}
console.log(idInvalidCardCompanies(findInvalidCards(batch)));
findInvalidCards(batch).forEach(x => makeValidCardNums(x));
