var api = require("./NewestReleasesAPI");
var theMovieDBAPIKey = "";

var test = async () => {
    var res = await api.getNewestTVShows(theMovieDBAPIKey);
    console.log(res);
    res = await api.getNewestDVDReleases(theMovieDBAPIKey);
    console.log(res);
}

test();