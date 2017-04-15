class Internationalizer {

    constructor(language, jsonDictionary) {
        this.LANGUAGE_NOT_SUPPORTED = "LANGUAGE_NOT_SUPPORTED";
        this.WRONG_LABEL = "WRONG_LABEL";
        this._language = language;
        this.jsonDictionary = JSON.parse(jsonDictionary);
    }

    print(label_name) {
        if (this.jsonDictionary[label_name] === undefined) {
            return this.WRONG_LABEL;
        }
        else if (this.jsonDictionary[label_name][this._language] == undefined) {
            return this.LANGUAGE_NOT_SUPPORTED;
        }
        else {
            return this.jsonDictionary[label_name][this._language];
        }
    }

    getLanguage() {
        return this._language;
    }
}

module.exports.Internationalizer = Internationalizer;