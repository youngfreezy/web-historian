var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('underscore');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
exports.paths = {
    siteAssets: path.join(__dirname, '../web/public'),
    archivedSites: path.join(__dirname, '../archives/sites'),
    list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
    _.each(pathsObj, function(path, type) {
        exports.paths[type] = path;
    });
};


exports.readListOfUrls = function(callback) {
    fs.readFile(exports.paths.list, function(err, sites) {
        sites = sites.toString().split('\n');
        if (callback) {
            callback(sites);
        }
    });
};

exports.isUrlInList = function(url, callback) {
    exports.readListOfUrls(function(sites) {
        var found = _.any(sites, function(site, i) {
            return site.match(url)
        });
        callback(found);
    });
};

exports.addUrlToList = function(url, callback) {
    fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
        callback();
    });
};

exports.isUrlArchived = function(url, callback) {
    var sitePath = path.join(exports.paths.archivedSites, url);

    fs.exists(sitePath, function(exists) {
        callback(exists);
    });
};

exports.downloadUrls = function(urlArray) {
    _.each(urlArray, function(url) {
        var location = paths.archivedSites + "/" + url;
        fs.writeFile(location, "This file is awesome", function(err, data) {
            if (err) {
                console.log('there was an error in your writeFile function');
            }
        });

        var file = fs.createWriteStream(paths.archivedSites + "/" + url);
        // console.log(file);
        url = "http://" + url;
        htmlfetcher.fetchData(url, file);
    })
};
// var fs = require('fs');
// var path = require('path');
// var request = require('request');
// var _ = require('underscore');
// //var htmlfetcher = require('../workers/htmlfetcher');

// /*
//  * You will need to reuse the same paths many times over in the course of this sprint.
//  * Consider using the `paths` object below to store frequently used file paths. This way,
//  * if you move any files, you'll only need to change your code in one place! Feel free to
//  * customize it in any way you wish.
//  */

// exports.paths = {
//     'siteAssets': path.join(__dirname, '../web/public'),
//     "archivedSites": path.join(__dirname, '../archives/sites'),
//     "index": path.join(__dirname, '../web/public/index.html'),
//     "list": path.join(__dirname, '../archives/sites.txt')
// };

// // Used for stubbing paths for tests, do not modify
// exports.initialize = function(pathsObj) {
//     _.each(pathsObj, function(path, type) {
//         exports.paths[type] = path;
//     });
// };

// // The following function names are provided to you to suggest how you might
// // modularize your code. Keep it clean!

// exports.readListOfUrls = function(callback) {
//     fs.readFile(exports.paths.list, function(err, data) {

//         data = data.toString().split("\n");
//         if (callback) {
//             callback(data);
//         };
//     })

//     // var sitesArray = [];
//     // fs.readFile(paths.list, {
//     //     encoding: 'utf8'
//     // }, function(err, data) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     sitesArray = data.split("\n");
//     //     callback(sitesArray);
//     // });
// }

// exports.isUrlInList = function(url, callback) {
//     // you can reuse the function above!
//     exports.readListOfUrls(function(data) {
//         var found = _.any(data, function(site, i) {
//             return site.match(url)
//         });
//         callback(found);
//     })
// };

// exports.addUrlToList = function(url, callback) {

//     fs.appendFile(exports.paths.list, url + '\n', 'utf8', function(err, data) {
//         if (err) {
//             console.log(err);
//         }
//         callback();
//     });

// };

// exports.isUrlArchived = function(url, callback) {

//     fs.exists(exports.paths.archivedSites, function(data) {
//         //console.log(data);
//         callback(data);
//     })
//     // addUrlToList(url, function() {
//     //     callback();
//     // });
// };

// exports.downloadUrls = function(urlArray) {
//     // Iterate over urls and pipe to new files
//     _.each(urls, function(url) {
//         if (!url) {
//             return;
//         }
//         //use the request library to get html content. 
//         //once you have it pipe to a readable stream
//         //which you are creating on the fly.  
//         //the stream you are creating is at arhcilves/sites/ plus the actual url.  
//         request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
//     });

//     // _.each(urlArray, function(url) {
//     //     if (!url) {
//     //         return;
//     //     }
//     //     var file = fs.createWriteStream(url + ".txt");
//     //     url = "http://" + url;
//     //     htmlfetcher.fetchData(url, file);
//     // })
// };

// // exports.paths = paths;
// // exports.addUrlToList = addUrlToList;
// // exports.isUrlInList = isUrlInList;
// // exports.readListOfUrls = readListOfUrls;
// // exports.isUrlArchived = isUrlArchived;
// // exports.downloadUrls = downloadUrls;
