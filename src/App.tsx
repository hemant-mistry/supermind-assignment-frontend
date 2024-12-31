import { useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import sendIcon from "./assets/sendicon.png";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
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
      <div className="w-full flex flex-col items-center gap-2 mt-[550px]">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-lg p-2 resize-none pr-12" // Add padding-right to make space for the button
            />
            <div className="flex items-center absolute right-2 top-0 h-full">
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
            className="link link-primary"
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
