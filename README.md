# Dead Simple translations
This module provides you an easy way to translate strings.
Just pass in an object to .create with all your locales + translations and you will get a function to translate strings.

# Installation
`npm install simple-translate`

# Usage
```js
var Translate = require("simple-translate");
var translations = {
    "en": {
        "hello": "Hello!",
        "hello_name": "Hello {{name}}!"
    },
    "de": {
        "hello": "Hallo!",
        "hello_name": "Hallo {{name}}!"
    }
}
# default locale is "en"
var translate = Translate.create(translations);
translate("hello"); // "Hello!"
translate("hello_name", {name: "Horst"}); // "Hello Horst!"

# If you want any other locale you can simply set the "locale" property
translations.locale = "de";
var translate = Translate.create(translations);
translate("hello"); // "Hello!"
translate("hello_name", {name: "Horst"}); // "Hello Horst!"
```

[![Build Status](https://travis-ci.org/quizshow/translate.svg)](https://travis-ci.org/quizshow/translate)