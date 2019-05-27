## GoogleTranslateNodeJS

### Translate a word or phrase using google translate in many languages

#### To support localization in your application(s) translating words in different languages is a time consuming task

#### This function is great to tweak if you need to create a config file to support multiple langugages for your video games

When you run this file don't tweak the sleep duration. The reason is to prevent google from blocking us so we don't make too many requests.

```javascript
const sleepDuration = 5000;
```

In order to run this script you have to install 4 dependencies

```
//we want to make synchronous requests
npm i sync-request
```

```
//encode string to UTF-8
npm i utf8
```

```
//used to concat string
npm i util
```

```
//used to get list of country codes for translation
npm i iso-639-1
```

```javascript
//in our index.js file we call translate which will convert to multiple languages
translate('hi how are you?');
```

```javascript
//run the function
node index.js
```
