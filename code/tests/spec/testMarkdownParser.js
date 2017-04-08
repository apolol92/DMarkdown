describe("DataTyp1Extractor", function () {
    it("should extract 3 array elements A,B,C", function () {
        var confLine = "[A,B,C] => [D], 0.123213";
        var expected = ["A", "B", "C"];
        expect(DataTyp1Extractor.getConfParts1Elements(confLine)).toEqual(expected);
    })
    it("should extract 1 array element D", function () {
        var confLine = "[A,B,C] => [D], 0.123213";
        var expected = ["D"];
        expect(DataTyp1Extractor.getConfParts2Elements(confLine)).toEqual(expected);
    })
    it("should get confidence of 0.123213", function () {
        var confLine = "[A,B,C] => [D], 0.123213";
        var expected = 0.123213;
        expect(DataTyp1Extractor.getConfValue(confLine)).toBe(expected);
    })
    it("should get 3 array elements A,B,C", function () {
        var supportLine = "[A,B,C], 0.0032792718";
        var expected = ["A", "B", "C"];
        expect(DataTyp1Extractor.getSupportElements(supportLine)).toEqual(expected);
    });
    it("should get support of 0.0032792718", function () {
        var supportLine = "[A,B,C], 0.0032792718";
        var expected = 0.0032792718;
        expect(DataTyp1Extractor.getSupportValue(supportLine)).toEqual(expected);
    });
    it("should get an array with one element [A]", function () {
        var supportLine = "[A], 0.0028";
        var expected = ["A"];
        expect(DataTyp1Extractor.getSupportElements(supportLine)).toEqual(["A"]);
    });
    it("should get 1 rule (A)", function () {
        var data = "[A], 0.0028" + "\n" +
            "[A,B], 0.0010" + "\n" +
            "[B], 0.0019" + "\n" +
            "[A] => [B], 0.10";
        var expected = 1;
        //expect(data.split("\n").length).toBe(4);
        expect(DataTyp1Extractor.getDDatas(data).length).toBe(1);
    });
    it("should get 1 rule (B)", function () {
        var data = "[A,B], 0.0028" + "\n" +
            "[A,B,C], 0.0028" + "\n" +
            "[C], 0.0019" + "\n" +
            "[A,B] => [C], 0.10";
        var expected = 1;
        //expect(data.split("\n").length).toBe(4);
        expect(DataTyp1Extractor.getDDatas(data).length).toBe(1);
    });
    it("should get 2 rules", function () {
        var data = "[A], 0.0028" + "\n" +
            "[A,B], 0.0010" + "\n" +
            "[B], 0.0019" + "\n" +
            "[A] => [B], 0.10\n" +
            "[A,B], 0.0028" + "\n" +
            "[A,B,C], 0.0028" + "\n" +
            "[C], 0.0019" + "\n" +
            "[A,B] => [C], 0.10";
        var expected = 1;
        //expect(data.split("\n").length).toBe(4);
        expect(DataTyp1Extractor.getDDatas(data).length).toBe(2);
    });

});