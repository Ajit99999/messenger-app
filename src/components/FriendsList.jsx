import React from 'react'; 
import { useChatContext } from "../context/ChatContext";

const FriendsList = () => {
  const { state, dispatch } = useChatContext();

  const handleFriendClick = (friend) => {
    dispatch({ type: "SET_SELECTED_FRIEND", payload: friend });
  };

  return (
    <div className="w-1/4 bg-gray-50 border-r border-gray-200 flex flex-col">
      <h2 className="text-sm font-semibold text-gray-700 p-4 border-b">
        Friends
      </h2>
      <ul className="overflow-y-auto flex-1">
        {state.friends?.map((friend) => (
          <li
            key={friend}
            className={`p-4 text-sm  cursor-pointer transition-all ${
              state.selectedFriend === friend
                ? "bg-gray-300 text-gray-900 font-medium"
                : "hover:bg-gray-200 text-gray-600"
            }`}
            onClick={() => handleFriendClick(friend)}
          >
            {friend}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
