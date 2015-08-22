'use strict';
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Build = mongoose.model('Build');
var generator = require('../../reactUtils/generator');
var fs = require('fs-extra');
var Github = require('github-api');
module.exports = router;

var htmlData = [
    {
        className: ['drop-area','view-1'],
        children: [
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-1'],
             props: [
                 { "name": "title", "value": "my cool app", type: "string" }
             ]
            },
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-2'],
             props: [
                 { "name": "title", "value": "my okay app", type: "string" }
             ]
            },
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-3'],
             props: [
                 { "name": "title", "value": "my bad app", type: "string" }
             ]
            },
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-3'],
             props: [
                 { "name": "title", "value": "the title", type: "string" }
             ]
            }

        ]
    },
    {
        className: ['drop-area','view-2'],
        children: [
            {type: 'Image',
             className: ["ui-image",'view-2-image-1'],
                 props: [
                 { "name": "source", "value": "http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg", type: "string" }
             ]
            },
            {type: 'Image',
             className: ['ui-image', 'view-2-image-2'],
             props: [
                 { "name": "source", "value": "https://imgs.xkcd.com/comics/perl_problems.png", type: "string" }
             ]    
            }             
        ]

    }
]


var styleData = {
    "view1": {
        "flex": '1',
        "justify-content": 'center',
        "align-items": 'center',
        "background-color": '#F5FCFF',
    },
    "img1": {
        "width": '200px',
        "height": '200px',
    },
    "view2": {
        "flex": '1',
        "justify-content": 'center',
        "align-items": 'center',
        "background-color": '#F5FCFF',
    },
    "img2": {
        "width": '200px',
        "height": '200px',
    }
};


var data = {
	html: htmlData,
	css: styleData,
	userId: "55d8dd1295179f6fd7ca8374",
    buildId: "1234567"
}

router.post('/', function (req, res, next) {
	//generator(req.body.html, req.body.css, req.body.userId, req.body.buildId)
	generator(data.html, data.css, data.userId, data.buildId)
	.then(function(zippedProject){
		//prompt user to download zipped project
		res.status(201).sendFile(zippedProject, function(err){
			//if(err) console.error('Your project failed to zip correctly', err);
			if(err) throw err;
			else{
				console.log('download complete');
				//remove files?
				// fs.remove(directoryPath, function(err){
				// 	if(err) console.error('Error deleting', err)
				// 	else console.log("files deleted");
				// })
			}
		})

	})
	.then(function(){
		//perform github stuff if user has a github account
		// User.findById(req.body.userId).exec()
		User.findById(data.userId).exec()
		.then(function(currentUser){
			console.log("currentUser", currentUser);

			var repoObj = {
			  "name": "Test",
			  "description": "Test repo for Breeze Blocks Project",
			  "homepage": currentUser.github.profileUrl,
			  "scopes": [
			  	"public_repo"
			  ]
			}
			var github = new Github({
				id: currentUser.github.id,
				token: currentUser.github.token,
				auth: "oauth"
			})
			var user = github.getUser();

			user.createRepo(repoObj, function(err, res) {
				if(err) console.error(err);
				else console.log(res);
			});
		})
	})
	.then(null, next);
	
})

