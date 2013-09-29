/**
 * Permet de caculer le hash d'un id
 */
function getHash(id){
	var charString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";
	var charLength = charString.length;
	var reste = id;
	reste = reste%charLength;
	if(id/charLength>1){
		return charString[reste]+getHash((id-reste)/charLength);
	}else{
		return charString[reste];
	}
};

function getNextSequence(db,name,callback) {
	console.log(name);
   	db.collection("counters").findAndModify(
          { _id: name },
          {},
          { $inc: { seq: 1 } },
          {new: true},
            function(err, ret){
            	callback(ret.seq);
//            	return ret.seq;
            }
   );
}

function initCounter(thisMongoclient,dbName,counterName){
	var dataBase = thisMongoclient.db(dbName);
	dataBase.collection("counters").find({
		_id: counterName
	}).toArray(function(err, docs){

		if(err!=null){
			res.respond(err,500);
			thisMongoclient.close();
			return;
		}

		if(docs == null || docs.length==0){
			//create counter
			dataBase.collection("counters").insert({
				_id     : counterName,
				seq     : 0
			},function(err,result){
				thisMongoclient.close();
				//rien
			});
			return;
		}

		thisMongoclient.close();
	});
}

exports.getHash = getHash;
exports.getNextSequence = getNextSequence;
exports.initCounter = initCounter;