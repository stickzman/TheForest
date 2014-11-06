var runSomeTests = function () {
	var descrip = document.getElementById('descrip');
	
	console.log(descrip.tagName);
	console.log(descrip.innerHTML);
	console.log(descrip.parentNode.tagName);
	
	var headings = document.querySelectorAll('aside > h1');
	
	for (i = 0; i < headings.length; i++){
		console.log(headings[i].innerHTML);
	}
	
	var title = document.querySelector('header > h1');
	console.log(title.tagName);
	console.log(title.innerHTML);
	console.log(title.parentNode.tagName);

	var headers = document.querySelectorAll('h1');
	for (i = 0; i < headers.length; i++) {
		console.log(headers[i].innerHTML);
	}
};

window.onload = runSomeTests;
