var escape = require("escape-html");
module.exports.create = function( translations ) {
    return function translate(key, placeholders) {
        var result = translations[translations.locale || "en"][key];

        if (typeof placeholders === "undefined") {
            return result;
        }

        Object.keys( placeholders ).forEach( function( index ) {
            var value = placeholders[index];
            if (!placeholders.escaped) {
                value = escape(value);
            }
            result = result.replace( new RegExp( "\{\{" + index + "\}\}", "g"), value);
        });
        return result;
    };
};