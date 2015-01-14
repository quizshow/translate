var assert = require("chai").assert;
var translate = require("../index");
describe(".create", function() {
    var translations;

    beforeEach(function() {
        translations = {
        };
    });

    it("should return a function", function() {
        var t = translate.create(translations);
        assert.equal(typeof t, "function");
    });

    describe(".translate", function() {
        beforeEach(function() {
            translations = {
                "en": {
                    "hello": "hello"
                }
            };
        });

        it("should use default locale 'en'", function() {
            var t = translate.create(translations);
            assert.equal(t("hello"), "hello");
        });

        it("should use given locale 'de'", function() {
            translations.de = {
                "hello": "hallo"
            };
            translations.locale = "de";
            var t = translate.create(translations);
            assert.equal(t("hello"), "hallo");
        });

        it("should output empty string for missing key", function() {
            var t = translate.create(translations);
            assert.equal(t("missing"), undefined);
        });

        describe("placeholders", function() {
            beforeEach(function() {
                translations = {
                    "en": {
                        "hello_name": "Hello {{name}}!",
                        "hello_name2": "{{name}}, Hello {{name}}!",
                        "greeting_name": "{{greeting}} {{name}}!"
                    }
                };
            });

            it("should replace placeholder name", function() {
                var t = translate.create(translations);
                assert.equal(t("hello_name", {name: "Horst"}), "Hello Horst!");
            });

            it("should leave missing placeholder untouched", function() {
                var t = translate.create(translations);
                assert.equal(t("hello_name", {}), "Hello {{name}}!");
            });

            it("should escape placeholder values", function() {
                var t = translate.create(translations);
                assert.equal(t("hello_name", {name: "<Horst>"}), "Hello &lt;Horst&gt;!");
            });

            it("should not escape placeholder values when escaped: true is set", function() {
                var t = translate.create(translations);
                assert.equal(t("hello_name", {name: "<Horst>", escaped: true}), "Hello <Horst>!");
            });

            it("should replace multiple placeholders", function() {
                var t = translate.create(translations);
                assert.equal(t("greeting_name", {greeting: "Hi", name: "Horst"}), "Hi Horst!");
            });

            it("should replace all occurances of one placeholder-key", function() {
                var t = translate.create(translations);
                assert.equal(t("hello_name2", {name: "Horst"}), "Horst, Hello Horst!");
            });

        });
    });
});