class Internationalizer {

    constructor(language, fallbackLanguage, jsonDictionary) {
        this.LANGUAGE_NOT_SUPPORTED = "LANGUAGE_NOT_SUPPORTED";
        this.WRONG_LABEL = "WRONG_LABEL";
        this._language = language;
        this._fallbackLanguage = fallbackLanguage;
        this.jsonDictionary = JSON.parse(jsonDictionary);
    }

    print(label_name) {
        if (this.jsonDictionary[label_name] === undefined) {
            return this.WRONG_LABEL;
        }
        else if (this.jsonDictionary[label_name][this._language] === undefined) {
            if(this.jsonDictionary[label_name][this._fallbackLanguage]===undefined) {
                return this.LANGUAGE_NOT_SUPPORTED;
            }
            return this.jsonDictionary[label_name][this._fallbackLanguage];
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