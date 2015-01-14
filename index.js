var escape = require("escape-html");
module.exports.create = function( translations ) {
    return function translate(key, placeholders) {
        var result = translations[translations.locale || "en"][key];

        if (typeof placeholders === "undefined") {
            return result;
        }

        Object.keys( placeholders ).forEach( function( key ) {
            var value = placeholders[key];
            if (!placeholders.escaped) {
                value = escape(value);
            }
            result = result.replace( new RegExp( "\{\{" + key + "\}\}", "g"), value);
        });
        return result;
    };
};