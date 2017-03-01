
//Function usado para pedir informaction del API server
//Hay que pasar cual parte del database que quiere, IE: "/comments"
function UserAction(database) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://jsonplaceholder.typicode.com"+database, false);
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
		return response
}

//Function usado para encontrar los posts que contiene el String
//Hay que pasar el String
//Imprira la informacion a la pagina
var searchPosts = function(searchString){
  var  noData=true,results="";
  data = UserAction("/posts")

	for (post in data){
		if (data[post].title.search(searchString)>=0){
      noData=false;
      results = results+JSON.stringify(data[post])+"<br>";
		}
	}

  if (noData){
    document.getElementById("output").innerHTML="No posts found with that wording."
  }else{
    document.getElementById("output").innerHTML=results;
  }
};

//Function usado para encontrar todos los comentarios connectado a un post
//Hay que pasar un postId
//Imprira la informacion a la pagina
var findComments = function(postId){
  postId= Number(postId);
  data = UserAction("/comments")
  var noData=true,results="";

	for (comment in data){
		if (data[comment].postId===postId){
      noData = false;
      results = results+JSON.stringify(data[comment])+"<br>";
		}
	}

  if (noData){
    document.getElementById("output").innerHTML="No comments found for this post, check to make sure the post exists  ."
  }else{
    document.getElementById("output").innerHTML=results;
  }
};



//Function usado para encontrar los posts con id de la serie de fibonnaci hasta 100
//Imprira la informacion a la pagina
var findFibonnaci=function(){
	data = UserAction("/posts")
  var results="";
	var fibonnaciNums = getFibSeqUpTo(100);
	for (post in data){
		if (fibonnaciNums.search(","+data[post].id.toString()+",")>=0){
      results = results+JSON.stringify(data[post])+"<br>";
		}
	}
  document.getElementById("output").innerHTML=results;
};

//Function usado para obtener los numeros que existe en la serie de Fibonnaci
//Hay que pasar el max
//Volvera la sequencia con un seperador de "," IE: ",1,1,2,3,5,8,"
var getFibSeqUpTo = function (max){
	var a=1,b=1,c,final=",1,";
	while (a<max){
		final = final+a.toString()+",";
		c=a;
		a=a+b;
		b=c;
	}
	return final
}
