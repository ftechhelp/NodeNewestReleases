var exports = module.exports = {};
var CreateMoviesAndTV = require('./modules/api_modules/CreateMoviesAndTV');
//TESTING PAGE AMOUNT BACK TO 100 NEEDED
exports.getNewestDVDReleases = async (moviedbAPIKey, pagesAmount = 30, withOriginalLanguage = 'en') => {

    return await CreateMoviesAndTV.create(moviedbAPIKey, pagesAmount, withOriginalLanguage, "movie");

}

exports.getNewestTVShows = async function (moviedbAPIKey, pagesAmount = 5, withOriginalLanguage = 'en'){

    return await CreateMoviesAndTV.create(moviedbAPIKey, pagesAmount, withOriginalLanguage, "tv");

};