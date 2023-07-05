import React, { useState } from 'react'

function ChatFooter({socket}) {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '' && localStorage.getItem('username')) {
      socket.emit('send_message', {
        text: message,
        id: socket.id,
        name: localStorage.getItem('username')
      });
      setMessage('');
    }
  };

  return (
    <div className='chat-footer'>
      <div className='form'>
        <input 
          type="text"
          className="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage()
          }}
          placeholder="Your Message..."
        />
        <button className="sendBtn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatFooter