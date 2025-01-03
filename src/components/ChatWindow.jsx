import React from 'react'; 
import { useChatContext } from "../context/ChatContext";
import { useState } from "react";

const ChatWindow = () => {
  const { state, dispatch } = useChatContext();
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const message = { id: Date.now(), text: input, sender: "me" };
    dispatch({
      type: "ADD_MESSAGE",
      payload: { friend: state.selectedFriend, message },
    });
    setInput("");
  };

  if (!state.selectedFriend) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        Choose a friend to start the chat.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 text-sm font-medium text-gray-700 bg-gray-50 border-b">
        Chat with {state.selectedFriend}
      </div>
      {state.messages[state.selectedFriend]?.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2">
          {state.messages[state.selectedFriend]?.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`text-sm p-3 rounded-md max-w-xs shadow bg-green-100 text-green-900`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
          No messages found.
        </div>
      )}
      <div className="p-4 border-t bg-gray-50 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="px-12 py-2 text-sm bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
