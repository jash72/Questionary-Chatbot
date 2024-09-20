"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language_card = void 0;
function Language_card() {
    let adaptive_card = {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.2",
        "body": [
            {
                "type": "TextBlock",
                "text": "Welcome to the bot.. can you please select one of the following",
                "wrap": true
            },
            {
                "type": "ActionSet",
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "Weather bot"
                    }
                ]
            },
            {
                "type": "ActionSet",
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "User Details bot"
                    }
                ]
            },
            {
                "type": "ActionSet",
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "common bot"
                    }
                ]
            }
        ]
    };
    //   console.log("=====================", adaptive_card);
    return adaptive_card;
}
exports.Language_card = Language_card;
//# sourceMappingURL=card.js.map