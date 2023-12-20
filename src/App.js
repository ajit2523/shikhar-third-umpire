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
import { setEmail } from './ActionProvider';
import { createContext } from 'react';

export const ThemeContext = createContext('dark');

const generateSessionID = () => {
  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const timestamp = new Date().getTime();
  const sessionID = `${randomString}_${timestamp}`;
  return sessionID;
}

export const currentSessionID = generateSessionID();

function App() {
  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState("");
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="App" id={theme}>

          <header className="App-header">
            {/* <Navbar /> */}

            <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} placeholderText='Type your message here'/>
          </header>
        </div>
      </ThemeContext.Provider>
    );
  }
  else {
    return <>{Render()}<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '15px' }}>Please wait...</div></>
  }

  // return (
  //   <ThemeContext.Provider value={{theme, toggleTheme}}>
  //   <div className="App" id={theme}>

  //     <header className="App-header">
  //       {/* <Navbar /> */}
  //       <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} placeholderText="Type your message here"/>
  //     </header>
  //   </div>
  //   </ThemeContext.Provider>
  // );
}

export default App;