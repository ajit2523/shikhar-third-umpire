import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./components/BotAvatar";
import UserAvatar from "./components/UserAvatar";
import ActionProvider from "./ActionProvider";
import CustomChatMessage from "./components/CustomChatMessage";
import { Info } from "@mui/icons-material";
import TransitionsModal from "./components/TipsPopup";
import { ThemeContext } from "./App";
import { Button } from "@mui/material";
import Brightness6Icon from '@mui/icons-material/Brightness6';

const actionProvider = new ActionProvider();

const botName = "Shikhar Third Umpire";
let emailID = ''

export const setEmailID = (userEmail) => {
  emailID = userEmail;
};


const config = {
  actionProvider: actionProvider,
  emailID: emailID,
  initialMessages: [
    createChatBotMessage({
      message: <div>
        Hi! I am {botName}
        <br />
        How can I assist you?
      </div>
    }),
    createChatBotMessage({
      message: <div>
        <b className="tips-heading">Best Practices</b><br /><br />
        <div>💡 <b>To find out the cluster/geo/zone leaderboard for any product for any week</b>
          <ul>Ex 1 - HL Cluster leaderboard for cohort disb &gt; 30 cr cohort for week 5 in august</ul>
          <ul>Ex 2 - MSME Cluster leaderboard for cohort disb between 18 to 24 cr <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>*(without mentioning week and month, it will assume the latest week of the current month)</i></ul>
          <ul>Ex 3 - UBL Cluster leaderboard <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>*(without mentioning cohort, it will give results for all cohorts)</i></ul>

          <ul>Ex 4 - Zone leaderboard for PL</ul>
          <ul>Ex 5 - Geo leaderboard for MSME</ul>
          <ul>Ex 6 - UCL Cluster leaderboard</ul>

          <p>💡 <b>To compare individual performance </b></p>
          <ul>Ex 1 - How many runs Rohit Sharma must score to rank above Prabir Paul</ul>
          <ul>Ex 2 - Show me the performance summary with rank for brahma.srivastva@piramal.com <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and deepakkumar.dubey@piramal.com</ul>
          <ul> Ex 3 - Rank of prabir.paul@piramal.com</ul>
          <ul><i>*(prefer using Email IDs over names for individual level queries)</i></ul>

          <p>💡 <b>My performance </b></p>
          <ul>Ex 1 - Show me my disb amount, disb target, runs, rank for each week</ul>

          <p>💡 <b>Cluster/Zone/Geo level queries</b></p>
          <ul>Ex 1 - What is bangalore cluster rank for HL</ul>
          <ul>Ex 2 - What is the current rank for south zone for MSME</ul>
          <ul>Ex 3 - What is the disb and booster amount done by north zone for HL</ul>

          <p>💡 <b>Branch queries of SMs and RMs</b></p>
          <ul>Ex 1 - Tell me Patna branch rankings for HL</ul>
          <ul>Ex 2 - Compare between SM arjun.kumar2@piramal.com and aniket.kumar@piramal.com</ul>

          <p className="tips-heading"><b><b className="warning">⚠</b> <i>This is an AI powered chat-bot, hence, if not satisfied with the answer, <br />&nbsp;&nbsp;&nbsp;&nbsp;please REWORD your query!</i></b></p>
        </div>
      </div>
    }, { withAvatar: true })],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#dfdfdf',
    },

    chatButton: {
      backgroundColor: '#ed4022',
    },

    userChatMessage: {
      backgroundColor: '#c2c1c1'
    }

  },
  customComponents: {
    header: () => (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div
            style={{
              backgroundColor: '#e24426',
              padding: '5px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '30px',
              fontWeight: 'bold',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={require('./Piramal-Finance-Logo-removebg-preview.png')}
                alt="Piramal Finance"
                style={{
                  height: '40px',
                  paddingRight: '5px',
                  color: 'white',
                  borderRight: '1px solid white',
                }}
              />
              <div style={{ paddingLeft: '5px', color: 'white', fontSize: '10px' }}>
                <img
                  src={require('./shikhar_logo-removebg-preview.png')}
                  alt="Piramal Finance"
                  style={{ height: '40px', paddingRight: '5px', color: 'white' }}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button onClick={toggleTheme} style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}><Brightness6Icon/></Button>
              <div><TransitionsModal /></div>
              <div style={{ paddingRight: '10px', fontSize: '1rem', color: 'white', }} className="email-id">
                {emailID}
              </div>
              <div style={{ paddingRight: '10px', fontSize: '15px' }}>
                <svg
                  className="svg-best-practices"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.4853 3.51473C18.2188 1.24823 15.2053 0 12 0C8.79469 0 5.78123 1.24823 3.51469 3.51473C1.24823 5.78123 0 8.79469 0 12C0 15.2053 1.24823 18.2188 3.51469 20.4853C5.78123 22.7518 8.79469 24 12 24C15.2053 24 18.2188 22.7518 20.4853 20.4853C22.7518 18.2188 24 15.2053 24 12C24 8.79469 22.7518 5.78123 20.4853 3.51473ZM12 22.5938C8.86552 22.5938 6.04514 21.2249 4.10381 19.0542C5.30733 15.8635 8.38819 13.5938 12 13.5938C9.67003 13.5938 7.78125 11.705 7.78125 9.375C7.78125 7.04503 9.67003 5.15625 12 5.15625C14.33 5.15625 16.2188 7.04503 16.2188 9.375C16.2188 11.705 14.33 13.5938 12 13.5938C15.6118 13.5938 18.6927 15.8635 19.8962 19.0542C17.9549 21.2249 15.1345 22.5938 12 22.5938Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    ),
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: (props) => <UserAvatar emailID={emailID} />,
    botChatMessage: (props) => <CustomChatMessage {...props} />,
  },
  state: {
    history: [],
  },
  widgets: [

  ],
};

export default config