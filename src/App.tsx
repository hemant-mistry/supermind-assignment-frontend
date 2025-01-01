import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import sendIcon from "./assets/sendicon.png";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        5 * 24
      )}px`; // 24px is the approximate height of one row
    }
  }, [message]);

  //const messagesEndRef = useRef<HTMLDivElement>(null);

  //const [messages, setMessages] = useState([]);
  //const [loading, setLoading] = useState(false);

  /*useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  };
*/
  return (
    <>
      <Navbar />
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
      <div className="prompts flex flex-col items-center gap-5 mt-10">
      <button className="btn btn-ghost border-white rounded-lg">What is the best time to post for achieving maximum reach?</button>
      <button className="btn btn-ghost border-white rounded-lg">Give me a comparison between reels, carousels and static posts.</button>
      <button className="btn btn-ghost border-white rounded-lg">Give me the top 5 posts with highest reach</button>
      </div>
      <div className="w-full flex flex-col items-center gap-2 mt-[400px]">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-lg p-2 resize-none pr-12 bg-[#282828] border-none outline-none focus:ring-0 "
            />
            <div className="flex items-center absolute right-2 top-0 h-full pr-2">
              <button className="flex items-center justify-center">
                <img src={sendIcon} alt="Send" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="prompt-caution text-center text-xs mt-2">
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
    </>
  );
}

export default App;
