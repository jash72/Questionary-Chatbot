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
exports.WelcomeDialog = void 0;
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
// import { BookingDetails } from './bookin/gDetails';
const weatherbot_1 = require("./weatherbot");
const quizbot_1 = require("./quizbot");
const userdialog_1 = require("./userdialog");
const CONFIRM_PROMPT = 'confirmPrompt';
const WEATHER_DIALOG = 'weatheringDialog';
const QUIZ_DIALOG = 'quizDialog';
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';
const WelcomeCard = require('../../resources/welcoming.json');
class WelcomeDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('welcomeDialog');
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))
            .addDialog(new botbuilder_dialogs_1.ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new userdialog_1.UserdetailDialog())
            .addDialog(new weatherbot_1.WeatheringDialog())
            .addDialog(new quizbot_1.QuizDialog())
            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [
            this.Step1.bind(this),
            this.Step2.bind(this),
        ]));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    Step1(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // let cardmsg =await Language_card()
            // await stepContext.context.sendActivity({
            //   attachments: [
            //     {
            //       contentType: 'application/vnd.microsoft.card.adaptive',
            //       content: cardmsg,
            //     },
            //   ],
            //  });
            const welcomeCard = botbuilder_1.CardFactory.adaptiveCard(WelcomeCard);
            yield stepContext.context.sendActivity({ attachments: [welcomeCard] });
            return botbuilder_dialogs_1.Dialog.EndOfTurn;
        });
    }
    Step2(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("checking for the result", stepContext.context.activity.text);
            let result = stepContext.context.activity.text;
            console.log("reuting", result);
            if (result == "Weather") {
                console.log("inseide if");
                return yield stepContext.replaceDialog('weatheringDialog');
            }
            else if (result == "user") {
                return yield stepContext.replaceDialog('userdetailDialog');
            }
            else if (result == "common") {
                return yield stepContext.replaceDialog('quizDialog');
            }
            //    const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
            //     return await stepContext.context.sendActivity({ attachments: [welcomeCard] });
        });
    }
}
exports.WelcomeDialog = WelcomeDialog;
//# sourceMappingURL=welcomepage.js.map