import FriendsList from "./components/FriendsList";
import ChatWindow from "./components/ChatWindow";
import ChatProvider from "./context/ChatContext";

const App = () => {
  return (
    <ChatProvider>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-[80%] h-[80%] flex shadow-lg rounded-md bg-white">
          <FriendsList />
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
