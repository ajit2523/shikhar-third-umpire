import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import { createChatBotMessage } from 'react-chatbot-kit';

const History = () => {
    const showHistory = () => {
        const apiUrl = 'http://127.0.0.1:5000/hist'
        const email = 'Parag.bajaj@piramal.com'

        const requestData = {
            user: email,
            time_stamp: Date.now(),
        };

        try {
            const response = fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response) {
                const chatHistory = response.json();
                
                chatHistory.forEach((item) => {
                    const userMessage = createChatBotMessage(item.USER_PROMPT);
                    const botMessage = createChatBotMessage(item.BOT_RESPONSE);

                });
            }
        } catch (error) {
            console.error('API request error:', error);
        }
    }
    return (
        <div>
            <Button 
                className="history-button"
                variant="contained" 
                color="primary"
                onClick={showHistory}
            >
                History
            </Button>
        </div>
    )
}

export default History;