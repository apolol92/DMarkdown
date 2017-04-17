/**
 * @author Dennis Groß
 * @date 15.04.2017
 * This class translates the text in other languages.
 */
class Internationalizer {
    /**
     * 
     * @param {which languages? (de,en,fr.. (see electron app.getLocale()))} language
     * @param {Which languages should be used if the current language not available?} fallbackLanguage 
     * @param {Dictionary in JSON-Format} jsonDictionary 
     */
    constructor(language, fallbackLanguage, jsonDictionary) {
        this.LANGUAGE_NOT_SUPPORTED = "LANGUAGE_NOT_SUPPORTED";
        this.WRONG_LABEL = "WRONG_LABEL";
        this._language = language;
        this._fallbackLanguage = fallbackLanguage;
        this.jsonDictionary = JSON.parse(jsonDictionary);
    }
    /**
     * Prints the label in the current language
     * @param {which label should be printed..=} label_name 
     * @return translated label
     */
    print(label_name) {
        if (this.jsonDictionary[label_name] === undefined) {
            return this.WRONG_LABEL;
        }
        else if (this.jsonDictionary[label_name][this._language] === undefined) {
            if (this.jsonDictionary[label_name][this._fallbackLanguage] === undefined) {
                return this.LANGUAGE_NOT_SUPPORTED;
            }
            return this.jsonDictionary[label_name][this._fallbackLanguage];
        }
        else {
            return this.jsonDictionary[label_name][this._language];
        }
    }

    /**
     * Get current language..
     * @return the current language
     */
    getLanguage() {
        return this._language;
    }
}
//Export Intenationlizer..
module.exports.Internationalizer = Internationalizer;