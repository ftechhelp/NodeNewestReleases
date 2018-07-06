var api = require("./NewestReleasesAPI");
var theMovieDBAPIKey = "ed8d0e0ff54f92da744bd726f5516574";

var test = async () => {
    var res = await api.getNewestTVShows(theMovieDBAPIKey);
    console.log(res);
    res = await api.getNewestDVDReleases(theMovieDBAPIKey);
    console.log(res);
}

test();