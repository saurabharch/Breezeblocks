module.exports = function(currentUser, github){
	var repoObj = {
	  "name": "Test",
	  "description": "React Native mobile app generated by BreezeBlocks.io",
	  "homepage": currentUser.github.profileUrl,
	}
	var user = github.getUser();

	return new Promise(function(resolve, reject){
		user.createRepo(repoObj, function(err, res) {
			if(err) reject(err);
			else {
				console.log("repo created");
				resolve(res);
			}
		});
	})
}