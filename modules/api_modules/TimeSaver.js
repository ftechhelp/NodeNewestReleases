var exports = module.exports = {};
const moment = require('moment');

/* 
    Description: Used to get today's date in this specific
    format (YYYY-MM-DD). Can feed it the number of months, weeks
    or days you want it to go back in time.

    Return Example: 2018-05-04
    Return Type: String
*/
exports.getTodaysDate = (numberToGoBack = 0, typeToGoBack = "months", ) => {
    
    return moment().subtract(numberToGoBack, typeToGoBack).format('YYYY-MM-DD');

}

/* 
    Description: Basically an async version of the 
    forEach method for arrays.

    Return Type: Promise<void>
*/
exports.asyncForEach = async (array, callback) => {

    for (let index = 0; index < array.length; index++)
        await callback(array[index], index, array);

}