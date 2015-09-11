var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Q = require('q');

exports.headers = headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10, // Seconds.
    'Content-Type': "text/html"
};

module.exports.serveAssets = function(res, asset, callback) {
    // Write some code here that helps serve up your static files!
    // (Static files are things like html (yours or archived from others...),
    // css, or anything that doesn't change often.)

    // check to see if the asset is an archive or a static asset
    archive.isUrlArchived(asset, function(exists) {
        if (exists) {
            archive.readUrl(asset, function(data) {
                res.write(data, function() {
                    callback();
                });
            });
        } else {
            fs.readFile(path.join(archive.paths.siteAssets, asset), function(err, data) {
                if (err) {
                    res.statusCode = 404;
                    res.end();
                } else {
                    res.write(data, function() {
                        callback();
                    });
                }
            });
        }
    });

};

module.exports.handlePostBody = function(req, callback) {
    var data = '';

    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {
        callback(queryString.parse(data));
    });
};
