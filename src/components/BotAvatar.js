import React from "react";


const BotAvatar = () => {
    return <div className="chatbot-avatar"> <img className="bot-avatar" src={require("./bot-pic.jpg")} style={{marginRight:'5px', height:'40px', width:'40px'}} alt="Genie" /> </div>;
}

export default BotAvatar; 