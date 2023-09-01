import { createChatBotMessage } from 'react-chatbot-kit';
import axios from 'axios';
import { useState } from 'react';

let emailID = '';

export const setEmail = (email) => {
    emailID = email;
};

class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    async sendUserInputToAPI(userInput) {
        const apiUrl = 'https://iqscvy83t7.execute-api.ap-south-1.amazonaws.com/shik/shikhar';
        const apiKey = 'EQrUArymZI6dEugG2aIkw8Zc9PbZvoet6A7VePxA';
        const email = emailID.toLowerCase();
        console.log(email);
        const requestData = {
            query: userInput,
            email: email,
        };
        console.log(requestData);

        const thinkingBotResponse = createChatBotMessage('Please wait while I fetch the results...');
        this.actionProvider.setChatbotResponse(thinkingBotResponse);

        const controller = new AbortController();
        const timeout = 30000;

        setTimeout(() => {
            controller.abort();
        }, timeout);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
                signal: controller.signal,
            });

            clearTimeout(timeout);

            //     if (response) {
            //         try {
            //             const responseData = await response.json();
            //             const responseText = JSON.parse(responseData);
            //             console.log(responseData)
            //             console.log(responseText);

            //             // const responseArray = responseData.Response;
            //             const botResponse = createChatBotMessage(
            //                 <div>
            //                     {/* {responseArray.map((i, key) => {
            //                         return (
            //                             <div key={key}>
            //                                 {Object.keys(i).map((j, key) => {
            //                                     // if key is 'answer' then show only the value
            //                                     if (j === 'Answer') {
            //                                         return <div key={key}>{i[j]}</div>;
            //                                     } else {
            //                                         return <div key={key}>{j} : {i[j]}</div>;
            //                                     }
            //                                 })}
            //                                 <br />
            //                             </div>
            //                         );
            //                     })} */}
            //                     {/* Print the Answer keys's value which is one of the keys present inside the 'response' key responseData object */}
            //                     {/* {"response":[{"Answer":"I'm sorry, I do not understand your question. Please reword your query appropriately so I can help you","Param":{"cluster":[],"geo":[],"zone":[]}}]} */}
            //                     {/* I want to print 'I'm sorry, I do not understand your question. Please reword your query appropriately so I can help you' */}
            //                     {responseText.response[0].Answer}
            //                 </div>
            //             );
            //             console.log(responseData.response[0].Answer);
            //             this.actionProvider.setChatbotResponse(botResponse);
            //         } catch (error) {
            //             console.error('Error formatting and displaying responses:', error);
            //         }
            //     }
            // } catch (error) {
            //     console.error('API request error:', error);
            // }

            if (response) {
                try {
                    const responseText = await response.json();
                    // find '\n' in this json string and eliminate it

                    const responseData = JSON.parse(responseText);
                    // console log type of responseText
                    console.log(typeof responseData)

                    console.log(responseData);
                    console.log(responseData.response);
                    console.log(responseData.response[0]);
                    console.log(responseData.response[0].Answer);

                    const responseAns = responseData.response[0].Answer;
                    const botResponse = createChatBotMessage(
                        <div>
                            {responseAns}
                        </div>
                    );
                    this.actionProvider.setChatbotResponse(botResponse);

                } catch (error) {
                    console.error('Error formatting and displaying responses:', error);
                }
            }
        } catch (error) {
            console.error('API request error:', error);
        }
    }

    parse(message) {
        const query = message.toLowerCase();

        const greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "hi there", "what's up?", "yo", "hiya", "wassup?", "hey there", "how's it going?", "sup?", "how are you?", "how's everything?", "how's your day?", "how do you do?", "what's new?", "hi, friend", "namaste", "salaam", "g'day", "what's happening?"];

        const goodbyes = ["bye", "goodbye", "farewell", "see you later", "see you soon", "catch you later", "later", "take care", "have a nice day", "have a great day", "have a good one", "see you around", "adios", "ciao", "ta-ta", "peace out", "i'm out", "so long", "until we meet again", "fare thee well", "goodnight", "night", "sleep well", "sweet dreams", "take it easy", "be safe", "bon voyage", "godspeed", "adieu", "bye-bye", "later gator", "hasta la vista", "smell you later", "peace and love", "to infinity and beyond", "keep in touch", "toodle-oo", "take good care of yourself", "see you on the flip side", "bonsoir", "goodbye for now", "it's been a pleasure"];

        if (greetings.includes(query)) {
            const botResponse = createChatBotMessage('Hello! How can I assist you today?');
            this.actionProvider.setChatbotResponse(botResponse);
        } else if (goodbyes.includes(query)) {
            const botResponse = createChatBotMessage('Thank you for using the chatbot. Have a nice day!');
            this.actionProvider.setChatbotResponse(botResponse);
        } else if (query.trim() === '') {
            const botResponse = createChatBotMessage('Please enter a valid query!');
            this.actionProvider.setChatbotResponse(botResponse);
        } else {
            // const botResponse = createChatBotMessage('Please wait while I fetch the results...')
            this.actionProvider.setChatbotResponse(this.sendUserInputToAPI(query))
        }
    }
}

export default MessageParser;