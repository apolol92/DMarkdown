var Inter = require("../js/Internationalizer.js");
describe("Internationalizer", function () {
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

});