'use client';
 
import React, { useState } from 'react';
import { useChat } from 'ai/react';
 
export default function Chat() {
  // Assuming useChat hooks for both models are available
  
  const { messages: messages35, input: input35, handleInputChange: handleInputChange35, handleSubmit: handleSubmit35 } = useChat({
    body: { model: 'gpt-3.5-turbo'}
  });
  const { messages: messages4, input: input4, handleInputChange: handleInputChange4, handleSubmit: handleSubmit4 } = useChat({
    body: { model: 'gpt-4-0125-preview'}
  });

  // Shared state for the input to send to both models
  const [sharedInput, setSharedInput] = useState('');

  // Function to handle input changes for the shared input field
  const handleSharedInputChange = (event) => {
    setSharedInput(event.target.value);
  };

  // Function to handle sending the shared message to both models
  const handleSendToBoth = (event) => {
    // Prevent the default form submit behavior
    event.preventDefault();
    // Set the input for both models
    handleInputChange35({ target: { value: sharedInput } });
    handleInputChange4({ target: { value: sharedInput } });
    // Submit to both models
    handleSubmit35(event);
    handleSubmit4(event);
    // Clear the shared input field after sending
    setSharedInput('');
  };

  return (
    <div className="flex flex-row w-full max-w-2xl py-24 mx-auto">
      <div className="flex flex-col w-1/2">
        {/* Chat block for gpt-3.5-turbo */}
        {messages35.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
        <form onSubmit={handleSubmit35}>
          <input
            className="w-full p-2 mb-8 border border-gray-300 rounded shadow-xl"
            style={{ color: 'black' }} // Added style attribute
            value={input35}
            placeholder="Say something to GPT-3.5..."
            onChange={handleInputChange35}
          />
        </form>
      </div>
      <div className="flex flex-col w-1/2">
        {/* Chat block for gpt-4 */}
        {messages4.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
        <form onSubmit={handleSubmit4}>
          <input
            className="w-full p-2 mb-8 border border-gray-300 rounded shadow-xl"
            style={{ color: 'black' }} // Added style attribute
            value={input4}
            placeholder="Say something to GPT-4..."
            onChange={handleInputChange4}
          />
        </form>
      </div>
      {/* Block to send message to both models */}
      <div className="w-full">
      <form onSubmit={handleSendToBoth}>
          <input
            type="text"
            className="w-full p-2 mb-8 border border-gray-300 rounded shadow-xl"
            style={{ color: 'black' }} // Added style attribute
            value={sharedInput}
            placeholder="Say something to both GPT-3.5 and GPT-4..."
            onChange={handleSharedInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default behavior of the Enter key
                handleSendToBoth(event);
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}