const DUMMY_MESSAGE = 'loading...'
let emailID = '';

export const setEmail = (email) => {
    emailID = email;
};

class ActionProvider {
    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;
    }

    greet(botMessage, removeLoading = false) {
        const message = this.createChatBotMessage(botMessage);
        this.addMessageToState(message, removeLoading);
    }

    async clientMessage(clientMessage) {
        this.addMessageToState(clientMessage);
        const apiUrl = 'https://iqscvy83t7.execute-api.ap-south-1.amazonaws.com/shik/shikhar';
        const apiKey = 'EQrUArymZI6dEugG2aIkw8Zc9PbZvoet6A7VePxA';
        const email = emailID.toLowerCase();
        console.log(email);
        const requestData = {
            query: clientMessage,
            email: email,
            source: 'Frontend',
        };
        console.log(requestData);

        const apiRequestPromise = fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('API request timed out'));
            }, 45000);
        });

        try {
            console.log('might work')
            this.greet({ message: DUMMY_MESSAGE });

            const response = await Promise.race([apiRequestPromise, timeoutPromise]);

            if (response instanceof Response) {
                try {
                    const responseText = await response.text();

                    const sanitizedResponse = responseText.replace(/NaN/g, 'null')
                    console.log(responseText)
                    const responseData = JSON.parse(sanitizedResponse);
                    console.log(typeof responseData)
                    console.log(responseData);
                    const botResponse = (<div>
                        {responseData.map((i, key) => {
                            return (
                                <div key={key}>
                                    {key !== 0 && <br />} {/* Conditionally add a line break except for the first item */}
                                    {Object.keys(i).map((j, innerKey) => {
                                        // If key is 'Answer' then show only the value
                                        if (j === 'Answer') {
                                            // Replace all \n characters with <br/> tag, \t chars with &nbsp;&nbsp; tags
                                            i[j] = i[j].replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;');
                                            return <div key={innerKey} dangerouslySetInnerHTML={{ __html: i[j] }} />;
                                        } else if (i[j] === null) {
                                            //replace the value with 'N/A' if it is null
                                            return <div key={innerKey}><b>{j}</b> : &nbsp;&nbsp;N/A</div>;
                                        }
                                        else {
                                            return <div key={innerKey}><b>{j}</b> : &nbsp;&nbsp;{i[j]}</div>;
                                        }
                                    })}
                                </div>
                            );
                        })}
                    </div>);
                    console.log(botResponse)
                    this.greet({ message: botResponse }, true)
                } catch (error) {
                    console.error('Error formatting and displaying responses:', error);
                    this.greet({ message: 'Oops! Something went wrong. Please try again with a simpler query.' }, true);
                }
            }
        } catch (error) {
            console.error('API request error:', error);
            this.greet({ message: 'Time out error, server failed! Please try again with a simpler query.' }, true);
        }
    }

    removeLoadingMessage(prevStateArray, removeLoading) {
        if (removeLoading) {
            prevStateArray?.messages?.splice(
                prevStateArray?.messages?.findIndex(
                    (a) => a?.message?.message === DUMMY_MESSAGE
                ),
                1
            );
            return prevStateArray;
        } else {
            return prevStateArray;
        }
    }

    addMessageToState(message, removeLoading = false) {
        this.setState((prevState) => ({
            ...this.removeLoadingMessage(prevState, removeLoading),
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;