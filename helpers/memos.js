var db = require("../models");

exports.getMemos = function(req,res){
	db.Memo.find()
	.then(function(memo){
		res.json(memo);
	})
	.catch(function(err){
		res.send(err);
	})
}

exports.createMemos = function(req,res){
	db.Memo.create(req.body)
	.then(function(newMemo){
		res.status(201).json(newMemo);
	})
	.catch(function(err){
		console.log(err);
	})
}

exports.getMemo = function(req,res){
	db.Memo.findById(req.params.memoId)
	.then(function(foundTodo){
		res.json(foundTodo);
	})
	.catch(function(err){
		console.log(err);
	})
}

exports.updateMemo = function(req,res){
	db.Memo.findOneAndUpdate({_id: req.params.memoId}, req.body, {new: true})
	.then(function(memo){
		res.json(memo);
	})
	.catch(function(err){
		console.log(err);
	})
}

exports.deleteMemo = function(req,res){
	db.Memo.remove({_id: req.params.memoId})
	.then(function(){
		res.json({message: "Meo want food"});
	})
	.catch(function(err){
		console.log(err);
	})
}

module.exports = exports;