import React from "react";


const BotAvatar = () => {
    return <div className="chatbot-avatar"> <img className="bot-avatar" src={require("./new-bot-avatar.png")} style={{marginRight:'10px', height:'40px', width:'40px'}} alt="Genie" /> </div>;
}

export default BotAvatar; 