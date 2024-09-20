"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatheringDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const axios_1 = require("axios");
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';
class WeatheringDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('weatheringDialog');
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))
            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [
            this.AskForCity.bind(this),
            this.ShowWeather.bind(this)
        ]));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    AskForCity(step) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield step.prompt(TEXT_PROMPT, 'Please enter the name of the city you want to know the weather for.');
        });
    }
    ShowWeather(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = step.result;
            let url = 'http://api.openweathermap.org/data/2.5/weather';
            let baseurl = `${url}?q=${city}&appid=252e7db9b21e707da1d1ddda1052a81b&units=imperial`;
            //unit = metric(*C) ---> unit = imperial(*F)
            const response = yield axios_1.default.get(baseurl);
            console.log("response", response);
            if (response.status === 200) {
                const weather = response.data;
                yield step.context.sendActivity(`The current temperature in ${city} is ${weather.main.temp} and the weather is ${weather.weather[0].main}.`);
            }
            else {
                yield step.context.sendActivity('Sorry, I was unable to get the weather information for that city.');
            }
            return yield step.endDialog();
        });
    }
}
exports.WeatheringDialog = WeatheringDialog;
//# sourceMappingURL=weatherbot.js.map