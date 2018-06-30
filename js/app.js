'use strict'

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(function(registration) {
      console.log("Service Worker Registered");
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register", err);
    })

}


var convertCurrency = function() {
	//grabbing constants from the DOM
	const from = document.getElementById('from').value;
	const to = document.getElementById('to').value;

	//using XML predefined web API
	let request = new XMLHttpRequest();
	let api = "5b4cda2779663ad20d70a5b76a4205b5";
	let url = `http://data.fixer.io/api/latest?access_key=${api}&symbols=${from},${to}`;
	request.open("GET", url, true);
	request.send();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			let result = request.responseText;
			// alert(result); //check if result is passed.
			//to convert to JSON object
			let jsResult = JSON.parse(result);

			//calculating result for one unit
			let oneUnit = jsResult.rates[to]/jsResult.rates[from];
			let amt = document.getElementById('fromAmount').value;
			document.getElementById('toAmount').value = (oneUnit*amt).toFixed(2);

		}
	}
}
