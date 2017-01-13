function init() {
	var rootpath = "//" + window.location.host + "/_ah/api";

	gapi.client.load('helloworldendpoints', 'v1', loadCallback, rootpath);
}

function loadFGCallback () {
	console.log('load fortunegoodie endpoints callback');
}

function loadCallback () {
	console.log('load helloworld endpoints callback');
	enableButtons ();
}

function enableButtons () {
	btn = document.getElementById("input_greet_generically");
	btn.onclick= function(){greetGenerically();};

	btn.value="Click me for a generic greeting";

	btn = document.getElementById("input_greet_by_name");
	btn.onclick=function(){greetByName();};

	btn.value="Click me for a personal greeting";
}

function greetGenerically () {
	var request = gapi.client.helloworldendpoints.sayHello();

	request.execute(sayHelloCallback);
}

function greetByName () {
	var name = document.getElementById("name_field").value;

	var request = gapi.client.helloworldendpoints.sayHelloByName({'name': name});
	request.execute(sayHelloCallback);
}

function sayHelloCallback (response) {
	alert(response.greeting);
}
