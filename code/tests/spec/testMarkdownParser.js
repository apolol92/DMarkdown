describe("MarkdownParser", function() {
    it("Should split markdown into 2 lines..\\n", function() {
        var dParser = new MarkdownParser();
        var result = dParser.splitMarkdownIntoLines("Test\nLol");
        var expected = ["Test","Lol"];
        expect(result).toEqual(expected);
    });
    it("Should split markdown into 2 lines.. (\\r\\n)", function() {
        var dParser = new MarkdownParser();
        var result = dParser.splitMarkdownIntoLines("Test\r\nLol");
        var expected = ["Test","Lol"];
        expect(result).toEqual(expected);
    });
    it("Should parse '<h1>Hallo</h1>\\n'..", function() {
        var dParser = new MarkdownParser();
        var result = dParser.toHtml("# Hallo");
        var expected = "<h1>Hallo</h1>\n";
        expect(result).toEqual(expected);
    });
    it("Should parse '<h2>Hallo</h2>\\n'..", function() {
        var dParser = new MarkdownParser();
        var result = dParser.toHtml("## Hallo");
        var expected = "<h2>Hallo</h2>\n";
        expect(result).toEqual(expected);
    });
   

});