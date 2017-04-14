class Internationalizer {
    constructor(language, jsonDictionary) {
        this.language = language;
        this.jsonDictionary = JSON.parse(jsonDictionary);
    }

    print(label_name) {
        return this.jsonDictionary[label_name][this.language];
    }
}

module.exports.Internationalizer = Internationalizer;