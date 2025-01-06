import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import sendIcon from "./assets/sendicon.png";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null); // Reference for the last message
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
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

  useEffect(() => {
    // Scroll to the bottom of the message thread
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (msg: string) => {
    if (msg.trim()) {
      setMessages([...messages, { user: "US", text: msg }]);
      setMessage("");
      setShowPrompts(false);

      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "AI", text: "loading.." },
      ]);

      try {
        const response = await fetch("https://supermind-assignment-frontend.onrender.com/api/getresponse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: msg }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { user: "AI", text: data.response },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { user: "AI", text: "Error fetching response" },
        ]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(message);
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
            <br />
            Select one of the below prompts to get started!
          </p>
        </div>
      ) : null}
      {showPrompts ? (
         <div className="prompts flex flex-col items-center gap-5 mt-10">
         <button
           className="btn btn-ghost border-white rounded-lg"
           onClick={() => handleSendMessage("What should be the preferred post type to gain maximum reach")}
         >
           What should be the preferred post type to gain maximum reach
         </button>
         <button
           className="btn btn-ghost border-white rounded-lg"
           onClick={() => handleSendMessage("What is the distribution of post types (carousel vs. reels) among the actors?")}
         >
           What is the distribution of post types (carousel vs. reels) among the actors?
         </button>
         <button
           className="btn btn-ghost border-white rounded-lg"
           onClick={() => handleSendMessage("Who is the most famous influencer based on engagements")}
         >
           Who is the most famous influencer based on engagements
         </button>
       </div>
      ) : null}
      <div className="chat-container flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="message-thread flex flex-col gap-4 items-start mt-10 text-left max-h-[500px] overflow-y-scroll scrollbar-hide">
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
                  {msg.text === "" ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} /> {/* Scroll target */}
          </div>

          <div className="w-full flex flex-col items-center gap-2 fixed bottom-0 left-0 p-4">
            <div className="w-full max-w-2xl">
              <div className="flex items-center relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full rounded-lg p-2 resize-none pr-12 bg-[#282828] border-none outline-none focus:ring-0"
                />
                <div className="flex items-center absolute right-2 top-0 h-full pr-2">
                  <button
                    className="flex items-center justify-center"
                    onClick={() => handleSendMessage(message)}
                  >
                    <img src={sendIcon} alt="Send" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="prompt-caution text-center text-xs mt-2 mb-4">
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
