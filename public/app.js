$(document).ready(function(){
	$.getJSON("/api/memo")
	.then(addMemos)
	
	$("#memoInput").keypress(function(event){
		if(event.which == 13){
			createMemos();
		}
	});
	
	$(".list").on("click", "li", function(){
		updateMemo($(this));
	});
	
	$(".list").on("click","span", function(event){
		//this stops clicking on span X from activating parent li click listener
		event.stopPropagation();
		
		removeMemo($(this).parent());
	});
	
})

function addMemos(memos) {
	memos.forEach(function(memo){
		addMemo(memo);
	})
}

function addMemo(memo){
	var newMemo = $("<li class='task'>"+ memo.name + "<span>X</span>"+ "</li>");
	//get memo id to jquery memory
	newMemo.data("id", memo._id);
	newMemo.data("completed", memo.completed);
	
	if(memo.completed){
		newMemo.addClass("done");
	}
	$(".list").append(newMemo);
}

function createMemos(){
	var userInput = $("#memoInput").val();
	$.post("/api/memo", {name: userInput})
	.then(function(newMemo){
		$("#memoInput").val("");
		addMemo(newMemo);
	})
	.catch(function(err){
		console.log(err);
	})
}

function removeMemo(memo){
	var clickId = memo.data("id");
	var deleteUrl = "/api/memo/"+ clickId;
		
	$.ajax({
		method: "DELETE",
		url: deleteUrl
	})
	.then(function(data){
		memo.remove();
	})
	.catch(function(err){
		console.log(err);
	})
}

function updateMemo(memo){
	
	var updateUrl = "/api/memo/"+ memo.data("id");
	var isDone = !memo.data("completed");
	var updateData = {completed: isDone};
	
	$.ajax({
		method: "PUT",
		url: updateUrl,
		data: updateData
	})
	.then(function(data){
		memo.toggleClass("done");
		memo.data("completed", isDone);
	})
	.catch(function(err){
		console.log(err);
	})
}


