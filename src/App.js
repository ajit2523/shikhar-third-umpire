import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css';
import './App.css';
import { msalConfig } from './auth/authConfig';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config, { setEmailID } from './config';
import { setEmail } from './MessageParser'; 

function App() {
  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function toggleLoading(isLoading) {
    setIsLoading(isLoading);
  }
  
  function Render() {

    const { accounts } = useMsal();

    try {
      const username = accounts[0].username;
      setm_strUser(username);
    }
    catch (e) {
    }
  }

  if (m_strUser !== "") {
    setEmailID(m_strUser);
    setEmail(m_strUser);
    return (
      <div className="App">

        <header className="App-header">
          {/* <Navbar /> */}
          <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
        </header>
      </div>
    );
  }
  else {
    return <>{Render()}<div style={{ textAlign:'center'}}>Please wait...</div></>
  }

  // return (
  //   <div className="App">

  //     <header className="App-header">
  //       {/* <Navbar /> */}
  //       <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
  //     </header>
  //   </div>
  // );
}

export default App;