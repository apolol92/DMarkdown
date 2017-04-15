var Inter = require("../js/Internationalizer.js");
describe("Internationalizer", function () {
    it("language should equal 'de'", function () {
        var json = '{"preview_label":{"de":"Vorschau","en":"Preview","fr-FR": "Avant-Première"}}';
        var DInternationalizer = new Inter.Internationalizer("de", json);
        var result = DInternationalizer.getLanguage();
        expect(result).toEqual("de");
    });
    it("should print 'Vorschau'", function () {
        var json = '{"preview_label":{"de":"Vorschau","en":"Preview","fr-FR": "Avant-Première"}}';
        var DInternationalizer = new Inter.Internationalizer("de", json);
        var result = DInternationalizer.print("preview_label");
        expect(result).toEqual("Vorschau");
    });
    it("should print 'Preview'", function () {
        var json = '{"preview_label":{"de":"Vorschau","en":"Preview","fr-FR": "Avant-Première"}}';
        var DInternationalizer = new Inter.Internationalizer("en", json);
        var result = DInternationalizer.print("preview_label");
        expect(result).toEqual("Preview");
    });
    it("should print 'Avant-Première'", function () {
        var json = '{"preview_label":{"de":"Vorschau","en":"Preview","fr-FR": "Avant-Première"}}';
        var DInternationalizer = new Inter.Internationalizer("fr-FR", json);
        var result = DInternationalizer.print("preview_label");
        expect(result).toEqual("Avant-Première");
    });
    it("should print 'WRONG_LABEL'", function () {
        var json = '{"preview_label":{"de":"Vorschau","en":"Preview","fr-FR": "Avant-Première"}}';
        var DInternationalizer = new Inter.Internationalizer("fr-FR", json);
        var result = DInternationalizer.print("preview_labasfel");
        expect(result).toEqual("WRONG_LABEL");
    });
    it("should print 'LANGUAGE_NOT_SUPPORTED'", function () {
        var json = '{"preview_label":{"de":"Vorschau","en":"Preview","fr-FR": "Avant-Première"}}';
        var DInternationalizer = new Inter.Internationalizer("fr-FFR", json);
        var result = DInternationalizer.print("preview_label");
        expect(result).toEqual("LANGUAGE_NOT_SUPPORTED");
    });

});