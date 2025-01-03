import React from 'react'; 
import { createContext, useContext, useReducer } from "react";
import { friends, initialMessages } from "../utils/dummyData";

export const ChatContext = createContext();

const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_FRIEND":
      return { ...state, selectedFriend: action.payload };
    case "ADD_MESSAGE":
      const { friend, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [friend]: [...(state.messages[friend] || []), message],
        },
      };
    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const initialState = {
    selectedFriend: null,
    friends,
    messages: initialMessages,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export default ChatProvider;
