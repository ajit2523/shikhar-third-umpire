import { createChatBotMessage } from 'react-chatbot-kit';
import axios from 'axios';
import { useState } from 'react';

let emailID = ''

export const setEmail = (email) => {
    emailID = email;
};

class MessageParser {
    constructor(actionProvider, state,) {
        this.actionProvider = actionProvider;
        this.state = state;
    }


    async sendUserInputToAPI(userInput) {
        const apiUrl = 'https://v864x25fk1.execute-api.ap-south-1.amazonaws.com/stage-dev/genie';
        const apiKey = 'RWnmy0wm5h53Ci79VayfB6lvv4H5av6i1uX5IS6r';
        const email = 'ajit.bhosale@piramal.com';

        const requestData = {
            query: userInput,
            user: email,
        };

        try {

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response) {
                try {
                    const responseData = await response.json()
                    console.log(responseData)

                    const responseArray = responseData.Response;
                    const botResponse = createChatBotMessage(
                        <div>
                            {responseArray.map((i, key) => {
                                return <div key={key}>{Object.keys(i).map((j, key) => {
                                    return <div key={key}>{j} : {i[j]}</div>;
                                })}
                                    <br />
                                </div>;
                            })}
                        </div>);
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


        if (query.includes('quit')) {
            const botResponse = createChatBotMessage('Thank you for using the chatbot. Have a nice day!');
            this.actionProvider.setChatbotResponse(botResponse);
        } else if (query.trim() === '') {
            const botResponse = createChatBotMessage('Please enter a valid query!');
            this.actionProvider.setChatbotResponse(botResponse);
        } else {
            this.sendUserInputToAPI(query)
        }
    }

}

export default MessageParser;