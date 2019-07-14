import * as textConfig from "./text"

export default class TextService {
    static text = textConfig.pl;

    static isPL = () => {
        return TextService.text === textConfig.pl;
    }
}