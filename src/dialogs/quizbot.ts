import { ComponentDialog, TextPrompt, WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';  
import { InputHints, MessageFactory } from 'botbuilder';
import { QuizDetails } from './quixdetails';

const TEXT_PROMPT = 'textPrompt';  
const WATERFALL_DIALOG = 'waterfallDialog';  
  
export class QuizDialog extends ComponentDialog {  
    constructor() {  
        super('quizDialog');  
  
        this.addDialog(new TextPrompt(TEXT_PROMPT))  
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [  
                this.Question1.bind(this),  
                this.Question2.bind(this),  
                this.Question3.bind(this),  
                this.Question4.bind(this),  
                this.Question5.bind(this),  
                this.FinalStep.bind(this)  
            ]));  
  
        this.initialDialogId = WATERFALL_DIALOG;  
    }  
    private async Question1(step: WaterfallStepContext) {  

        const messageText = 'Who is the father of indian constitution?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await step.prompt(TEXT_PROMPT, { prompt: msg });
       
    }  
  
    private async Question2(step: WaterfallStepContext) {
        const quizDetails = step.options as QuizDetails;
        quizDetails.ques1 = step.result

        const messageText = 'Name the deepest ocean in the world?';
        const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        return await step.prompt(TEXT_PROMPT, { prompt: msg });
      
    }  
  
    private async Question3(step: WaterfallStepContext) {  
        const quizDetails = step.options as QuizDetails;
        quizDetails.ques2 = step.result

        const messageText = 'Name the smallest bone in the body?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await step.prompt(TEXT_PROMPT, { prompt: msg });
      
    }  
  
    private async Question4(step: WaterfallStepContext) {  
        const quizDetails = step.options as QuizDetails;
        quizDetails.ques3 = step.result

        const messageText = 'Name the country which has no capital?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await step.prompt(TEXT_PROMPT, { prompt: msg });
       
    }  
  
    private async Question5(step: WaterfallStepContext) {  
        const quizDetails = step.options as QuizDetails;
        quizDetails.ques4 = step.result

        const messageText = 'Name the place where the deadbodies are kept?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await step.prompt(TEXT_PROMPT, { prompt: msg });
      
    }  
  
    private async FinalStep(step: WaterfallStepContext) {        
        const quizDetails = step.options as QuizDetails;
        quizDetails.ques5 = step.result
        const wrong_answer = [];
        let i = 0;
        let c = 0;
        if((quizDetails.ques1).toLowerCase() == 'ambedkar'){
            c += 1;
        }
        else{
            wrong_answer[i] = 'The father of indian constitution is Dr.Ambedkar';
            i += 1;
        }
        if((quizDetails.ques2).toLowerCase() == 'pacafic ocean'){
            c += 1;
        }
        else{
            wrong_answer[i] = 'The deepest ocean in the world is pacafic ocean';
            i += 1;
        }
        if((quizDetails.ques3).toLowerCase() == 'stapes'){
            c += 1;
        }
        else{
            wrong_answer[i] = 'The smallest bone in the body is stapes';
            i += 1;
        }
        if((quizDetails.ques4).toLowerCase() == 'nauru'){
            c += 1;
        }
        else{
            wrong_answer[i] = 'The country which has no capital is nauru';
            i += 1;
        }
        if((quizDetails.ques5).toLowerCase() == 'mortuary'){
            c += 1;
        } 
        else{
            wrong_answer[i] = 'The place where the deadbodies are kept is mortuary';
            i += 1;
        }
        if(i == 0){
        const messageText = `you have scored ${c} out of 5, Well Try`;
        const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        await step.prompt(TEXT_PROMPT, { prompt: msg });
        }

        else{
        let messageText = `you have scored ${c} out of 5, Well Try \n Here are the Correct answers for your worng answers\n` ;
        let m = 0;
        while(m < i){
            messageText += ` ${wrong_answer[m]}\n` ;
            m += 1;
        }
        const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        await step.prompt(TEXT_PROMPT, { prompt: msg });
        }
        return await step.endDialog();
    }  
}