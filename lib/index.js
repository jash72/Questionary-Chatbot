"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
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
const path = require("path");
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const botbuilder_1 = require("botbuilder");
// The bot and its main dialog.
const dialogAndWelcomeBot_1 = require("./bots/dialogAndWelcomeBot");
const dotenv_1 = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const rootDialog_1 = require("./dialogs/rootDialog");
// Note: Ensure you have a .env file and include LuisAppId, LuisAPIKey and LuisAPIHostName.
const ENV_FILE = path.join(__dirname, "..", ".env");
(0, dotenv_1.config)({ path: ENV_FILE });
const botFrameworkAuthentication = new botbuilder_1.ConfigurationBotFrameworkAuthentication(process.env);
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new botbuilder_1.CloudAdapter(botFrameworkAuthentication);
// Catch-all for errors.
const onTurnErrorHandler = (context, error) => __awaiter(void 0, void 0, void 0, function* () {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    // Send a trace activity, which will be displayed in Bot Framework Emulator
    yield context.sendTraceActivity("OnTurnError Trace", `${error}`, "https://www.botframework.com/schemas/error", "TurnError");
    // Send a message to the user
    yield context.sendActivity("The bot encountered an error or bug.");
    yield context.sendActivity("To continue to run this bot, please fix the bot source code.");
    // Clear out state
    yield conversationState.delete(context);
});
// Set the onTurnError for the singleton CloudAdapter.
adapter.onTurnError = onTurnErrorHandler;
// Define a state store for your bot. See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
// A bot requires a state store to persist the dialog and user state between messages.
let conversationState;
let userState;
// For local development, in-memory storage is used.
// CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
// is restarted, anything stored in memory will be gone.
const memoryStorage = new botbuilder_1.MemoryStorage();
conversationState = new botbuilder_1.ConversationState(memoryStorage);
userState = new botbuilder_1.UserState(memoryStorage);
// Create the main dialog.
const dialog = new rootDialog_1.RootDialog();
const bot = new dialogAndWelcomeBot_1.DialogAndWelcomeBot(conversationState, userState, dialog);
// Create HTTP server
// Create HTTP server.
const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
//app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${app.name} listening to ${app.url}`);
    console.log("\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator");
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});
// Listen for incoming activities and route them to your bot main dialog.
app.post("/api/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Route received a request to adapter for processing
    yield adapter.process(req, res, (context) => bot.run(context));
}));
//# sourceMappingURL=index.js.map