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
exports.QuizDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const botbuilder_1 = require("botbuilder");
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';
class QuizDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('quizDialog');
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))
            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [
            this.Question1.bind(this),
            this.Question2.bind(this),
            this.Question3.bind(this),
            this.Question4.bind(this),
            this.Question5.bind(this),
            this.FinalStep.bind(this)
        ]));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    Question1(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageText = 'Who is the father of indian constitution?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield step.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Question2(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizDetails = step.options;
            quizDetails.ques1 = step.result;
            const messageText = 'Name the deepest ocean in the world?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield step.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Question3(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizDetails = step.options;
            quizDetails.ques2 = step.result;
            const messageText = 'Name the smallest bone in the body?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield step.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Question4(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizDetails = step.options;
            quizDetails.ques3 = step.result;
            const messageText = 'Name the country which has no capital?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield step.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    Question5(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizDetails = step.options;
            quizDetails.ques4 = step.result;
            const messageText = 'Name the place where the deadbodies are kept?';
            const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield step.prompt(TEXT_PROMPT, { prompt: msg });
        });
    }
    FinalStep(step) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizDetails = step.options;
            quizDetails.ques5 = step.result;
            const wrong_answer = [];
            let i = 0;
            let c = 0;
            if ((quizDetails.ques1).toLowerCase() == 'ambedkar') {
                c += 1;
            }
            else {
                wrong_answer[i] = 'The father of indian constitution is Dr.Ambedkar';
                i += 1;
            }
            if ((quizDetails.ques2).toLowerCase() == 'pacafic ocean') {
                c += 1;
            }
            else {
                wrong_answer[i] = 'The deepest ocean in the world is pacafic ocean';
                i += 1;
            }
            if ((quizDetails.ques3).toLowerCase() == 'stapes') {
                c += 1;
            }
            else {
                wrong_answer[i] = 'The smallest bone in the body is stapes';
                i += 1;
            }
            if ((quizDetails.ques4).toLowerCase() == 'nauru') {
                c += 1;
            }
            else {
                wrong_answer[i] = 'The country which has no capital is nauru';
                i += 1;
            }
            if ((quizDetails.ques5).toLowerCase() == 'mortuary') {
                c += 1;
            }
            else {
                wrong_answer[i] = 'The place where the deadbodies are kept is mortuary';
                i += 1;
            }
            if (i == 0) {
                const messageText = `you have scored ${c} out of 5, Well Try`;
                const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
                yield step.prompt(TEXT_PROMPT, { prompt: msg });
            }
            else {
                let messageText = `you have scored ${c} out of 5, Well Try \n Here are the Correct answers for your worng answers\n`;
                let m = 0;
                while (m < i) {
                    messageText += ` ${wrong_answer[m]}\n`;
                    m += 1;
                }
                const msg = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
                yield step.prompt(TEXT_PROMPT, { prompt: msg });
            }
            return yield step.endDialog();
        });
    }
}
exports.QuizDialog = QuizDialog;
//# sourceMappingURL=quizbot.js.map