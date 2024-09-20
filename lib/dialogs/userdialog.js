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
exports.UserdetailDialog = void 0;
//import { TimexProperty } from '@microsoft/recognizers-text-data-types-timex-expression';
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const CONFIRM_PROMPT = 'confirmPrompt';
const DATE_RESOLVER_DIALOG = 'dateResolverDialog';
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';
class UserdetailDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('userdetailDialog');
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))
            .addDialog(new botbuilder_dialogs_1.ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [
            this.Step1.bind(this),
            this.Step2.bind(this),
            this.Step3.bind(this),
            this.Step4.bind(this),
            this.Step5.bind(this)
        ]));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    Step1(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageText = 'May i know your name?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield stepContext.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Step2(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = stepContext.options;
            userDetails.name = stepContext.result;
            const messageText = 'where are you from?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield stepContext.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Step3(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = stepContext.options;
            userDetails.region = stepContext.result;
            const messageText = 'what is your age?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield stepContext.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Step4(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = stepContext.options;
            userDetails.age = stepContext.result;
            const messageText = 'what is your hobby!';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield stepContext.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Step5(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = stepContext.options;
            userDetails.hobby = stepContext.result;
            const messageText = `Greetings ${userDetails.name}, we acknowledge that you are ${userDetails.age} years old and are based in ${userDetails.region}. We also noted that your girl friend name is rathi chan. We appreciate your presence and look forward to further interactions. Have a productive day ahead!`;
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            yield stepContext.prompt(TEXT_PROMPT, { prompt: msg });
            return yield stepContext.endDialog();
        });
    }
}
exports.UserdetailDialog = UserdetailDialog;
//# sourceMappingURL=userdialog.js.map