# NodeNewestReleases
## An API to facilitate getting newest DVD and TV show releases from TheMovieDB.

The API is asynchronous so make sure you keep that in mind when applying it
to your project. The reason for that is because The MovieDB has a request limiter on their 
service, so the async takes care of that by pausing after so many queries to not trigger
the request limiter. With that being said, using ```getNewestDVDReleases()``` is pretty slow.
It takes about a couple minutes for it to return with the default amount of pages it looks through for movies
giving you a large selection of recent DVD movies. Depending on the amount of pages you choose
to use, it can take less time.

Example of use:
```
var api = require("./NewestReleasesAPI");
var theMovieDBAPIKey = "TheMovieDB API Key";

var getNewestTVShows = async () => {
    var TVShowsArray = await api.getNewestTVShows(theMovieDBAPIKey);
    
    //use the data
}

var getNewestDVDReleases = async () => {
    var DVDMoviesArray = await api.getNewestDVDReleases(theMovieDBAPIKey);
    
    //use the data
}

```

Both functions can take up to 3 parameters to customize the query:
```
moviedbAPIKey [string]: The MovieDB API Key.
pagesAmount [int]: The amount of pages to look through for movies or TV shows.
withOriginalLanguage [string]: ISO 639-1 string to filter results by their original language value.


getNewestTVShows(moviedbAPIKey, pagesAmount = 5, withOriginalLanguage = 'en')
getNewestDVDReleases(moviedbAPIKey, pagesAmount = 30, withOriginalLanguage = 'en')
```

For both TV and Movies, it returns the same types of objects in an array. Here is an example of the output:

```
Array(3) [Object, Object, Object]
length:3
__proto__:Array(0) [, …]
0:Object {id: 525845, name: "Neapolitan", releaseDate: "2018-05-24", …}
	description:"In 2002, an introverted young man falls in love on a beta-test dating site only for the young woman to abruptly stop talking to him. He sets to find out why."
	id:525845
	name:"Neapolitan"
	releaseDate:"2018-05-24"
	releaseYear:"2018"
__proto__:Object {constructor: , __defineGetter__: , __defineSetter__: , …}
1:Object {id: 521512, name: "Tig Notaro: Happy To Be Here", releaseDate: "2018-05-22", …}
	description:"Comedian Tig Notaro unleashes her inner prankster in a playful stand-up special packed with funny anecdotes, parenting confessions and more."
	id:521512
	name:"Tig Notaro: Happy To Be Here"
	releaseDate:"2018-05-22"
	releaseYear:"2018"
	
	...
```






