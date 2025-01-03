import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import sendIcon from "./assets/sendicon.png";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [showPrompts, setShowPrompts] = useState(true);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        5 * 24
      )}px`; // 24px is the approximate height of one row
    }
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: "US", text: message }]);
      setMessage("");
      setShowPrompts(false);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "AI", text: "loading.." },
        ]);

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { user: "AI", text: "Hey! How are you doing today?" },
          ]);
        }, 2000);
      }, 0);
    }
  };

  return (
    <>
      <Navbar />
      {showPrompts ? (
        <div className="welcome-content mt-10">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Social Glance
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Social Glance is a new AI chatbot that helps you gain insights about
            your social media metrics.
            <br></br>
            Select one of the below prompts to get started!
          </p>
        </div>
      ) : null}
      {showPrompts ? (
        <div className="prompts flex flex-col items-center gap-5 mt-10">
          <button className="btn btn-ghost border-white rounded-lg">
            What is the best time to post for achieving maximum reach?
          </button>
          <button className="btn btn-ghost border-white rounded-lg">
            Give me a comparison between reels, carousels and static posts.
          </button>
          <button className="btn btn-ghost border-white rounded-lg">
            Give me the top 5 posts with highest reach
          </button>
        </div>
      ) : null}
      <div className="chat-container flex flex-col items-center mt-[50px]">
        <div className="w-full max-w-2xl">
          <div className="message-thread flex flex-col gap-2 items-start">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.user === "US"
                    ? "user-message-container"
                    : "ai-message-container"
                } flex items-center`}
              >
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span>{msg.user}</span>
                  </div>
                </div>
                <div
                  className={`ml-5 ${
                    msg.user === "US" ? "user-message" : "ai-message"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col items-center gap-2 fixed bottom-0 left-0 p-4">
            <div className="w-full max-w-2xl">
              <div className="flex items-center relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full rounded-lg p-2 resize-none pr-12 border-none outline-none"
                />
                <div className="flex items-center absolute right-2 top-0 h-full pr-2">
                  <button
                    className="flex items-center justify-center"
                    onClick={handleSendMessage}
                  >
                    <img src={sendIcon} alt="Send" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="prompt-caution text-center text-xs mt-2 mb-5">
              Gemini may display inaccurate info, including about people, so
              double-check its responses.{" "}
              <a
                className="link link-primary text-gray-400"
                href="https://support.google.com/gemini?p=privacy_notice"
              >
                Your privacy and Gemini Apps
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
