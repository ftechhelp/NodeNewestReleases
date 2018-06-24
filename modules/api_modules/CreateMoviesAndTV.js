var exports = module.exports = {};
const _mdb = require('moviedb-promise');
const CreatePhysicalMedia = require('./CreatePhysicalMedia');
const TimeSaver = require('./TimeSaver');
var MovieDB;

async function filterPhysicalMedia(page, withOriginalLanguage, movieOrTV){

    if (movieOrTV == "movie")
        return await CreatePhysicalMedia.retreiveDVDsWithPhysicalCopies(MovieDB, page.results, withOriginalLanguage);
    else if (movieOrTV == "tv")
        return await CreatePhysicalMedia.retreiveTV(MovieDB, page.results, withOriginalLanguage);

}

async function getResultPage(page, withOriginalLanguage, movieOrTV){

    if (movieOrTV == "movie"){

        return await MovieDB.discoverMovie({
            sort_by: 'release_date.desc',
            'release_date.lte': TimeSaver.getTodaysDate(1),
            'primary_release_date.lte': TimeSaver.getTodaysDate(1),
            language: 'en-US',
            with_original_language: withOriginalLanguage,
            page: page
        
        });

    }else if (movieOrTV == "tv"){

        return await MovieDB.discoverTv({
            sort_by: 'first_air_date.desc',
            'air_date.lte': TimeSaver.getTodaysDate(1, "days"),
            'first_air_date.lte': TimeSaver.getTodaysDate(1, "days"),
            language: 'en-US',
            with_original_language: withOriginalLanguage,
            page: page
        
        });

    }

}

exports.create = async (apiKey, pagesAmount, withOriginalLanguage, movieOrTV) => {

    //DECLARE MOVIEDB API
    MovieDB = new _mdb(apiKey);

    //GET ALL THE PAGES OF RECENT MOVIES
    var pages = [];

    for (var p = 1; p <= pagesAmount; p++){
        
        var page = await getResultPage(p, withOriginalLanguage, movieOrTV);
        pages.push(page);

    }

    var media = [];
    
    //FILTER ALL THE PAGES TO KEEP THE MOVIES THAT HAVE A PHYSICAL COPY
    await TimeSaver.asyncForEach(pages, async (page) => {

        var physicalMedia = await filterPhysicalMedia(page, withOriginalLanguage, movieOrTV);
        media = media.concat(physicalMedia);

    });

    //SORT ARRAY BE RELEASE DATE DESC
    media.sort(function(a,b){

        return new Date(b.releaseDate) - new Date(a.releaseDate);

    });

    return media;
    

}