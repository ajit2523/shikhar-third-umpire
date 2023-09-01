import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./components/BotAvatar";
import History from "./components/History";
import UserAvatar from "./components/UserAvatar";


const botName = "Shikhar Third Umpire";
let emailID = ''

export const setEmailID = (userEmail) => {
  emailID = userEmail;
};

const config = {
  emailID: emailID,
  initialMessages: [
    <History />,
    createChatBotMessage(<div>
      Hi! This is {botName}
      <br />
      How can I help you?
    </div>)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#dfdfdf',
    },

    chatButton: {
      backgroundColor: '#ed4022',
    },

  },
  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: '#efefef',
          padding: '5px',
          borderRadius: '5px',
          height: '40px',
          display: 'flex', // Use flex display
          alignItems: 'center', // Vertically center elements
          justifyContent: 'space-between', // Horizontally center elements
          fontSize: '30px',
          fontWeight: 'bold',
          marginBottom: '3px',
        }}
      >
        <img
          src={require('./Piramal-Finance-Logo-removebg-preview.png')}
          alt="Piramal Finance"
          style={{ height: '40px', paddingLeft: '20px' }} // Add margin to separate the logo from text
        />
        <div>
          <img
            src={require('./shikhar_logo-removebg-preview.png')}
            alt="Shikhar"
            style={{ height: '40px', paddingRight: '20px' }} // Add margin to separate the logo from text
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center', // Vertically center elements within this container
          }}
        >
          <div style={{ paddingRight: '10px', fontSize: '0.75rem', color: '#1e3446' }}>
            {emailID}
          </div>
          <div style={{ paddingRight: '10px', fontSize: '15px' }}>
            <UserAvatar emailID={emailID} />
          </div>
        </div>
      </div>
    ),
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: (props) => <UserAvatar emailID={emailID} />,
  },
  state: {
    history: [],
  },
  widgets: [
    {
      widgetName: "history",
      widgetFunc: (props) => <History {...props} />,
      mapStateToProps: ["history"],
    },
  ],
};

export default config