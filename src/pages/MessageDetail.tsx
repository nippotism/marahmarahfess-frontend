import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import RepliesModal from "../components/ui/RepliesModal";
import { PulseLoader } from "react-spinners";

interface Message {
  message: string;
  name: string;
  receiver: string;
  replies: { _id: string; name: string; reply: string }[];
}

function MessageDetail() {
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };  
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 


  const handlePostReplies = async (data: { name: string; reply: string }) => {
    try {
      const response = await axios.post(
        `https://marahmarahfess-backend-production.up.railway.app/api/messages/${id}/reply`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 201) throw new Error("Failed to send reply");

      toast("Reply berhasil dikirim!");
      fetchMessage(); // Refresh replies
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessage = async () => {
    try {
      const response = await fetch(
        `https://marahmarahfess-backend-production.up.railway.app/api/messages/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch message");

      const data = await response.json();

      setMessage(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Top Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md border-b" : "bg-transparent"
        }`}
      >
        <Link
          to="/"
          className="flex flex-col font-bold font-rock-salt items-center text-gray-600 hover:text-black"
        >
          DipoFess
        </Link>
      </nav>

      {/* Content */}
      {message ? 
      (
        <div className="w-full pt-16 pb-16 font-jakarta-sans">
        <Toaster position="bottom-right" />
        <div className="flex flex-col items-center p-4">
          {/* Message (Like Instagram Post) */}
          <div className="bg-white w-full max-w-md rounded-lg shadow-md border border-gray-200">
            {/* Sender Info */}
            <div className="flex items-center p-4 border-b">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <p className="ml-3 font-semibold text-gray-800">{message.name}</p>
            </div>

            {/* Message Content (Like Image in Instagram) */}
            <div className="p-5 min-h-[300px] flex items-center justify-center">
              <h1 className="text-3xl text-center font-reenie text-gray-900">
                {message.message}
              </h1>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t">
              <p className="text-gray-600 text-sm">To: {message.receiver}</p>
            </div>
          </div>

          {/* Replies (Better Instagram Comments Style) */}
          <div className="w-full max-w-md mt-4">
            <h2 className="text-lg font-semibold mb-2">Replies</h2>
            {message.replies.length > 0 ? (
              <ul className="space-y-3">
                {message.replies.map((item) => (
                  <li key={item._id} className="flex items-start space-x-3">
                    {/* Small Profile Pic */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

                    {/* Reply Content */}
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-700">{item.reply}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No replies yet.</p>
            )}
            <button
              className="flex items-center mt-4 gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 active:scale-95"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Reply
            </button>
          </div>

          <RepliesModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handlePostReplies}
          />
        </div>
      </div>
        ):(
          <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
            <PulseLoader color="black" size={15} />
          </div>
        )
        }
    </div>
  );
}

export default MessageDetail;
