import React from 'react';
import { StageSpinner } from 'react-spinners-kit';
const DUMMY_MESSAGE = 'loading...';

const CustomChatMessage = (props) => {
  if (props.message.message === DUMMY_MESSAGE) {
    return (
      <div className="custom-chat-message custom-chat-message-spinner">
        <StageSpinner size={20} color="#686769" loading={true} />
      </div>
    )
  } else {
    return (
      <div className="custom-chat-message">
        {props.message.message}
      </div>
    )
  }
}

export default CustomChatMessage;
