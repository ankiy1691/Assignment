	$(".btn").click(function(){
	//console.log($("#movie").val());
	  $(".clr").remove();
	
	$.ajax({
		dataType:"json",
		url:"http://www.omdbapi.com/?s="+$("#movie").val(),
		
		success:function(data){
		if(data.Response==="True"){
		var arr=data.Search;
		 var len=data.Search.length;
		
		 for(var i=0;i<len;i++){
		 
		 $("<img></img>",{
		height:"300px",
		src:arr[i].Poster,
		class:"col s2 clr"
		}).insertAfter(".headings");
		 
		 $("<p></p>",{
		height:"300px",
		text:arr[i].imdbID,
		class:"col s2 clr"
		}).insertAfter(".headings");
		 
		 $("<p></p>",{
		 height:"300px",
		text:arr[i].Year,
		class:"col s2 clr"
		}).insertAfter(".headings");
		 
		$("<p></p>",{
		height:"300px",
		text:arr[i].Title,
		class:"col s3 clr"
		}).insertAfter(".headings");
		 
		$("<p></p>",{
		height:"300px",
		text:arr[i].Type,
		class:"col s3 clr"
		}).insertAfter(".headings");
		 
		 }
		}
		 else{
			 alert("Given movie is not there!!");
		 }

		}
		
		
		
	});
	
	
	
	
	
});