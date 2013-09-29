
var MongoClient = require('mongodb').MongoClient,
	Server 		= require('mongodb').Server,
	CONFIG 		= require('config').TinyURL,
	utils 		= require('../util');

var collectionName = "tinyURL";

var openMongoclient = function(res,action){

	var mongoclient = new MongoClient(new Server(CONFIG.dbHost, CONFIG.dbPort, {native_parser: true}));
	mongoclient.open(function(err, thisMongoclient){
		if(err!=null){
			if(res!=null)
				res.respond(err,500);
			if (thisMongoclient!=null)
				thisMongoclient.close();
			return;
		}
		
		//the action should close the connection
		action(thisMongoclient);
	});
}

//init counter
var initCounter = function(counterName){
	openMongoclient(null,function(thisMongoclient){
		utils.initCounter(thisMongoclient, CONFIG.dbName, counterName);
	});
}

initCounter("urlId");

/**
 * Insertion of folder
 */
var insertUrl = function(res,mongoclient, dataBase, url,hash){

	utils.getNextSequence(dataBase,"urlId",function(id){
		
		dataBase.collection(collectionName).insert({
				url 	: url,
				_id 	: id,
				date 	: new Date()
			},function(err,result){
				if(err!=null){
					mongoclient.close();
					res.respond(err,500);
					return;
			}


			if(hash==null)
				hash = utils.getHash(id);

			//Test to know id the hash has not been ever use.
			dataBase.collection(collectionName).findOne({hash: hash},function(err,doc){

				//Error
				if(err!=null){
					mongoclient.close();
					res.respond(err,500);
					return;
				}

				//No result
				if(doc==null){
					//keep this id
					dataBase.collection(collectionName).update(
						result[0],
						{
							$set:{hash:hash}
						},
						function(err,count){

							if(err!=null){
								mongoclient.close();
								res.respond(err,500);
								return;
							}

							result[0].hash = hash;
							mongoclient.close();
							res.json(result[0]);
						}
					);
				}else{
					//change the id

					//clean old id
					dataBase.collection(collectionName).remove(
						{
							_id: id
						},
						function(err,result){

							if(err!=null){
								mongoclient.close();
								res.respond(err,500);
								return;
							}

							insertUrl(res,mongoclient, dataBase, url,null);
						}
					);
				}
			});
		});
	});
}

/**
 * Url controller
 */

/**
 * Get url
 */
exports.get = function(req, res, hash){

		openMongoclient(res,function(mongoclient){

		var dataBase = mongoclient.db(CONFIG.dbName);
		dataBase.collection(collectionName).findOne({hash: hash},function(err,doc){
		
			//Error
			if(err!=null){
				mongoclient.close();
				res.respond(err,500);
				return;
			}

			//No result
			if(doc==null){
				mongoclient.close();
				res.respond(err,404);
				return;

			}else{
				//return result
				res.redirect(301, doc.url);
				mongoclient.close();
			}
		});

	});
	
};

/**
 * Post url
 */
exports.post = function(req, res){

	if(req.body.url == null || req.body.url == ""){
		res.respond("url param could not be null",412);
		return;
	}

	var url = req.body.url;

	openMongoclient(res,function(mongoclient){

		var dataBase = mongoclient.db(CONFIG.dbName);

		//test not exist
		dataBase.collection(collectionName).findOne({url: url},function(err,doc){
			
			//Error
			if(err!=null){
				mongoclient.close();
				res.respond(err,500);
				return;
			}

			//No result
			if(doc==null){
				insertUrl(res,mongoclient, dataBase, url,null);
				return;
			}
			
			mongoclient.close();
			res.json(doc);
			return;			

		});
		
	});
};