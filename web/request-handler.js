var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var http = require('http');
var getter = require('http-get')
var querystring = require('querystring');
// require more modules/folders here!

var handleRequest = function(req, res) {
    var statusCode;

    if (req.method === "GET") {
        // var url = req.url;
        // var request = require('request');
        // request.get(req.url, function(err, response, body){

        //TODO: Return the content of the actual website from the archive.    

        // })
        if (req.url === "/") {
            fs.readFile(path.join(__dirname, '../web/public/index.html'), function(err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, helpers.headers);
                res.end(data)
            })
        } else {
            res.writeHeader(404);
            res.end('404, file not found')
            // }
        }
    }

    if (req.method === "POST") {
        // if (req.url === "/") {
        var url = "";
        req.on('data', function(data) { //data giving back NOTHING!.
            // console.log(JSON.stringify(data));
            url += data;
            console.log(url);

        });

        req.on('end', function() {
            statusCode = 302;
            url = querystring.parse(url);
            //var url //parse the data, and then get the url property of the resulting object
            archive.addUrlToList(url.url, function() {
                res.writeHead(statusCode, helpers.headers);
                res.end();
            });
        })

        // }

        //TODO: this should call the "addURLtoList" helper function. 
        // isUrlInList(req.url)

        // fs.readFile(req.url, function(err, data){
        //   console.log(req.url);
        //   fs.writeFile(path.join(__dirname, './', 'sites.txt'), data, encoding='utf8', function(err, data){
        //     if(err){
        //       throw err;
        //     }
        //   })
        // })
    }
};

exports.handleRequest = handleRequest;
//exports.getPage = getPage;

// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   //index: path.join(__dirname, '../web/public/index.html')
//   list: path.join(__dirname, '../archives/sites.txt')
// };
// var path = require('path');
// var archive = require('../helpers/archive-helpers');
// // require more modules/folders here!

// var url = require('url');
// var helpers = require('./http-helpers');

// var actions = {
//     'GET': function(req, res) {
//         var urlPath = url.parse(req.url).pathname;

//         // / means index.html
//         if (urlPath === '/') {
//             urlPath = '/index.html';
//         }

//         helpers.serveAssets(res, urlPath, function() {
//             // trim leading slash if present
//             if (urlPath[0] === '/') {
//                 urlPath = urlPath.slice(1)
//             }

//             archive.isUrlInList(urlPath, function(found) {
//                 if (found) {
//                     helpers.sendRedirect(res, '/loading.html');
//                 } else {
//                     helpers.send404(res);
//                 }
//             });
//         });
//     },
//     'POST': function(req, res) {
//         helpers.collectData(req, function(data) {
//             var url = data.split('=')[1].replace('http://', '');
//             // check sites.txt for web site
//             archive.isUrlInList(url, function(found) {
//                 if (found) { // found site
//                     // check if site is on disk
//                     archive.isUrlArchived(url, function(exists) {
//                         if (exists) {
//                             // redirect to site page (/www.google.com)
//                             helpers.sendRedirect(res, '/' + url);
//                         } else {
//                             // Redirect to loading.html
//                             helpers.sendRedirect(res, '/loading.html');
//                         }
//                     });
//                 } else { // not found
//                     // add to sites.txt
//                     archive.addUrlToList(url, function() {
//                         // Redirect to loading.html
//                         helpers.sendRedirect(res, '/loading.html');
//                     });
//                 }
//             });
//         });
//     }
// };

// exports.handleRequest = function(req, res) {
//     var handler = actions[req.method];
//     if (handler) {
//         handler(req, res);
//     } else {
//         helpers.send404(res);
//     }
// };

// // var path = require('path');
// // var archive = require('../helpers/archive-helpers');
// // var url = require('url');
// // var helpers = require('./http-helpers');
// // var fs = require('fs');
// // var http = require('http');
// // var getter = require('http-get')
// // var querystring = require('querystring');
// // // require more modules/folders here!

// // var handleRequest = function(req, res) {
// //     var statusCode;

// //     if (req.method === "GET") {
// //         // var url = req.url;
// //         // var req = require('req');
// //         // req.get(req.url, function(err, res, body){

// //         //TODO: Return the content of the actual website from the archive.    

// //         // })
// //         // console.log(archive);
// //         if (req.url === "/") {
// //             fs.readFile(path.join(__dirname, '../web/public/index.html'), function(err, data) {
// //                 if (err) {
// //                     throw err;
// //                 }
// //                 res.writeHead(200, helpers.headers);
// //                 res.end(data)
// //             })
// //         } else {
// //             res.writeHeader(404);
// //             res.end('404, file not found')
// //             // }
// //         }
// //     }

// //     if (req.method === "POST") {
// //         // if (req.url === "/") {
// //         var url = "";
// //         req.on('data', function(data) { //data giving back NOTHING!.
// //             // console.log(JSON.stringify(data));
// //             url += data;
// //             console.log(url);

// //         });

// //         req.on('end', function() {
// //             statusCode = 302;
// //             url = querystring.parse(url);
// //             //var url //parse the data, and then get the url property of the resulting object
// //             archive.addUrlToList(url.url, function() {
// //                 res.writeHead(statusCode, helpers.headers);
// //                 res.end();
// //             });
// //         })

// //         // }

// //         //TODO: this should call the "addURLtoList" helper function. 
// //         // isUrlInList(req.url)

// //         // fs.readFile(req.url, function(err, data){
// //         //   console.log(req.url);
// //         //   fs.writeFile(path.join(__dirname, './', 'sites.txt'), data, encoding='utf8', function(err, data){
// //         //     if(err){
// //         //       throw err;
// //         //     }
// //         //   })
// //         // })
// //     }
// // };

// // // exports.handleRequest = function(req, res) {
// // //     res.end(archive.paths.list)
// // // }

// // var actions = {
// //         'GET': function(req, res) {
// //             var urlPath = url.parse(req.url).pathname;

// //             if (urlPath === '/') {
// //                 //serve index.html
// //                 urlPath = '/index.html';
// //             }
// //             helpers.serveAssets(res, urlPath, function() {
// //                 // trim leading slash if present
// //                 if (urlPath[0] === '/') {
// //                     urlPath = urlPath.slice(1)
// //                 }

// //                 archive.isUrlInList(urlPath, function(found) {
// //                     if (found) {
// //                         helpers.sendRedirect(res, '/loading.html');
// //                     } else {
// //                         helpers.send404(res);
// //                     }
// //                 });
// //             });
// //         },
// //         'POST': function() {}
// //     }
// //     //exports.getPage = getPage;

// // // exports.paths = {
// // //   siteAssets: path.join(__dirname, '../web/public'),
// // //   archivedSites: path.join(__dirname, '../archives/sites'),
// // //   //index: path.join(__dirname, '../web/public/index.html')
// // //   list: path.join(__dirname, '../archives/sites.txt')
// // // };

// // exports.handleRequest = function(req, res) {
// //     var handler = actions[req.method];
// //     if (handler) {
// //         handler(req, res);
// //     } else {
// //         helpers.send404(res);
// //     }
// // };
