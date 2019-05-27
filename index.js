//we want to make synchronous requests
const request = require('sync-request');

//encode string to UTF-8
const utf8 = require('utf8');

//used to concat string
const util = require('util');

//used to get list of country codes for translation
const ISO6391 = require('iso-639-1');

//how many milliseconds do we sleep (we need to sleep to prevent being blocked by google)
const sleepDuration = 5000;

//our google translate url
const endpoint = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=%s&tl=%s&dt=t&q=%s';

//auto detect our source language when translating
const sourceLanguage = 'auto';

async function getTranslation(languageCode, translationText) {
	
	//pause before making request to prevent being blocked by google
	await sleep(sleepDuration);
	
	//create our url
	const url = util.format(endpoint, sourceLanguage, languageCode, utf8.encode(translationText))
	
	//perform our request
	var res = await request('GET', url);
	
	//convert the data from byte to readable string
	var data = res.body.toString('utf-8');
	
	try {
		
		//convert readable string to json object
		var result = JSON.parse(data);
		
		//now access our json object for the translation
		return result[0][0][0];
		
	} catch (error) {
		
		console.log(data);
		console.log(error);
		
		//return the language code where error occurred
		return languageCode + ' - error';
	}
}

async function translate(text) {
	
	//translate the text in all available languages
	for (var i = 0; i < ISO6391.getAllCodes().length; i++) {
		
		//the description of the language
		const desc = ISO6391.getName(ISO6391.getAllCodes()[i]);
		
		//get the language code
		const code = ISO6391.getAllCodes()[i];
		console.log(desc + ' = ' + await getTranslation(code, text));
	}
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve,ms)
    });
}

//translate phrase in many languages
//translate('hi how are you?');
