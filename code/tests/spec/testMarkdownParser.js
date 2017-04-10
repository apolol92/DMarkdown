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
    it("Should parse '<ul>\\n<li>test1</li>\\n<li>test2</li>\\n</ul>\\n'..", function() {
        var dParser = new MarkdownParser();
        var result = dParser.toHtml("* test1\n* test2");
        var expected = "<ul>\n<li>test1</li>\n<li>test2</li>\n</ul>\n";
        expect(result).toEqual(expected);
    });
   

});