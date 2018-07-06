var exports = module.exports = {};
const TimeSaver = require('./TimeSaver');
const MovieorTV = require('./PhysicalMedia');
const movieOrTVShowBaseImagePath = "https://image.tmdb.org/t/p/w300";

exports.retreiveDVDsWithPhysicalCopies = async (MovieDB, pageResults, withOriginalLanguage) => {

    var movies = [];
    
    //GO THROUGH PAGE RESULTS
    await TimeSaver.asyncForEach(pageResults, async (movie) => {

        var movieId = movie.id;
        
        var movieReleaseDates = await MovieDB.movieReleaseDates(movieId);

        //GO THROUGH MOVIE RELEASE DATES
        await TimeSaver.asyncForEach(movieReleaseDates.results, async (movieReleaseDate) => {

            if (movieReleaseDate.iso_3166_1 != 'US' && movieReleaseDate.iso_3166_1 != 'CA')
                return;
            
            //GO THROUGH MOVIE RELEASE DATE RESULTS
            await TimeSaver.asyncForEach(movieReleaseDate.release_dates, async (individualReleaseDate) => {

                if (individualReleaseDate.iso_639_1 != withOriginalLanguage)
                    return;
                
                //IF PHYSICAL RELEASE, ADD IT TO ARRAY
                if (individualReleaseDate.type == 4){

                    var physicalMedia = MovieorTV.Create();

                    physicalMedia.id = movieId;
                    physicalMedia.name = movie.title;
                    physicalMedia.releaseDate = movie.release_date;
                    physicalMedia.releaseYear = movie.release_date.split('-')[0];
                    physicalMedia.description = movie.overview;

                    var typesOfImages = await MovieDB.movieImages(movieId);

                    if (typesOfImages.posters[0] =! undefined)
                        physicalMedia.pathLink = movieOrTVShowBaseImagePath + typesOfImages.posters[0].file_path;
                        

                    if (!movies.includes(physicalMedia))
                        movies.push(physicalMedia);

                }

            });

        });

    });

    return movies;

}

exports.retreiveTV = async (MovieDB, results, withOriginalLanguage) => {

    var tvShows = [];
    
    //GO THROUGH PAGE RESULTS
    await TimeSaver.asyncForEach(results, async (tv) => {

        if (tv.first_air_date == undefined)
            return;

        var tvId = tv.id;

        var physicalMedia = MovieorTV.Create();

        physicalMedia.id = tvId;
        physicalMedia.name = tv.name;
        physicalMedia.releaseDate = tv.first_air_date;
        physicalMedia.releaseYear = tv.first_air_date.split('-')[0];
        physicalMedia.description = tv.overview;

        var typesOfImages = await MovieDB.tvImages(tvId);

        if (typesOfImages.posters[0] != undefined)
            physicalMedia.pathLink = movieOrTVShowBaseImagePath + typesOfImages.posters[0].file_path;

        if (!tvShows.includes(physicalMedia))
            tvShows.push(physicalMedia);

    });

    return tvShows;

}