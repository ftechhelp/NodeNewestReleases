var api = require("./NewestReleasesAPI");
var theMovieDBAPIKey = "";

var testTV = async () => {
    var res = await api.getNewestTVShows(theMovieDBAPIKey);
    console.log(res);
}

var testMovie = async () => {
    var res = await api.getNewestDVDReleases(theMovieDBAPIKey);
    console.log(res);
}


testTV();
testMovie();