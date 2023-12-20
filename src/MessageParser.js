import { createClientMessage } from 'react-chatbot-kit';


class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        const query = message.toLowerCase();

        const greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "hi there", "what's up?", "yo", "hiya", "wassup?", "hey there", "how's it going?", "sup?", "how are you?", "how's everything?", "how's your day?", "how do you do?", "what's new?", "hi, friend", "namaste", "salaam", "g'day", "what's happening?"];

        const goodbyes = ["bye", "goodbye", "farewell", "see you later", "see you soon", "catch you later", "later", "take care", "have a nice day", "have a great day", "have a good one", "see you around", "adios", "ciao", "ta-ta", "peace out", "i'm out", "so long", "until we meet again", "fare thee well", "goodnight", "night", "sleep well", "sweet dreams", "take it easy", "be safe", "bon voyage", "godspeed", "adieu", "bye-bye", "later gator", "hasta la vista", "smell you later", "peace and love", "to infinity and beyond", "keep in touch", "toodle-oo", "take good care of yourself", "see you on the flip side", "bonsoir", "goodbye for now", "it's been a pleasure"];

        if (greetings.includes(query)) {
            const message = createClientMessage(query);
            this.actionProvider.addMessageToState(message);
            this.actionProvider.greet({ message: "Hello! How can I help you?" }, true)
        } else if (goodbyes.includes(query)) {
            const message = createClientMessage(query);
            this.actionProvider.addMessageToState(message);
            this.actionProvider.greet({ message: "Bye! Have a nice day!" }, true);
        } else if (query.trim() === '') {
            this.actionProvider.greet({ message: "Please enter a valid query" }, true);
        } else {
            this.actionProvider.clientMessage(query)
        }
    }
}

export default MessageParser;