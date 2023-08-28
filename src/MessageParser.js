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
        const email = emailID.toLowerCase();
        console.log(email)
        const requestData = {
            query: userInput,
            user: email,
        };
        console.log(requestData)

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
                                    //if key is 'answer' then show only the value
                                    if (j === 'Answer') {
                                        return <div key={key}>{i[j]}</div>;
                                    }
                                    else { return <div key={key}>{j} : {i[j]}</div>; }
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

        const greetings = ["Hello",
            "Hi",
            "Hey",
            "Greetings",
            "Good morning",
            "Good afternoon",
            "Good evening",
            "Hi there",
            "What's up?",
            "Yo",
            "Hiya",
            "Wassup?",
            "Hey there",
            "How's it going?",
            "Sup?",
            "How are you?",
            "How's everything?",
            "How's your day?",
            "How do you do?",
            "What's new?",
            "Hi, friend",
            "Namaste",
            "Salaam",
            "G'day",
            "What's happening?"];

        const goodbyes = ["Bye",
        "Goodbye",
        "Farewell",
        "See you later",
        "See you soon",
        "Catch you later",
        "Later",
        "Take care",
        "Have a nice day",
        "Have a great day",
        "Have a good one",
        "See you around",
        "Adios",
        "Ciao",
        "Ta-ta",
        "Peace out",
        "I'm out",
        "So long",
        "Until we meet again",
        "Fare thee well",
        "Goodnight",
        "Night",
        "Sleep well",
        "Sweet dreams",
        "Take it easy",
        "Be safe",
        "Bon voyage",
        "Godspeed",
        "Adieu",
        "Bye-bye",
        "Later gator",
        "Hasta la vista",
        "Smell you later",
        "Peace and love",
        "To infinity and beyond",
        "Keep in touch",
        "Toodle-oo",
        "Take good care of yourself",
        "See you on the flip side",
        "Bonsoir",
        "Goodbye for now",
        "It's been a pleasure"];

        //change all the elements of the array to lowercase
        greetings.forEach(function (element, index, array) {
            array[index] = element.toLowerCase();
        });

        goodbyes.forEach(function (element, index, array) {
            array[index] = element.toLowerCase();
        });

        if (greetings.some(greeting => query.includes(greeting))) {
            const botResponse = createChatBotMessage('Hello! How can I assist you today?');
            this.actionProvider.setChatbotResponse(botResponse);
        } else if (goodbyes.some(goodbye => query.includes(goodbye))) {
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