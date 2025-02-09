import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import RepliesModal from "../components/ui/RepliesModal";
import { PulseLoader } from "react-spinners";

export const LoveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M18.8 9.91c-1.13 0-2.14.55-2.77 1.39a3.466 3.466 0 0 0-2.77-1.39c-1.91 0-3.46 1.56-3.46 3.48 0 .74.12 1.43.32 2.06.98 3.11 4.02 4.98 5.52 5.49.21.07.56.07.77 0 1.5-.51 4.54-2.37 5.52-5.49.21-.64.32-1.32.32-2.06a3.457 3.457 0 0 0-3.45-3.48Z" fill="#f972db"></path><path d="M20.75 8.342c0 .23-.23.38-.45.32a4.81 4.81 0 0 0-3.95.74c-.22.16-.52.16-.73 0a4.65 4.65 0 0 0-2.76-.9c-2.58 0-4.68 2.11-4.68 4.71 0 2.82 1.35 4.93 2.71 6.34.07.07.01.19-.08.15C8.08 18.772 2 14.912 2 8.342c0-2.9 2.33-5.24 5.21-5.24 1.71 0 3.22.82 4.17 2.09a5.218 5.218 0 0 1 4.17-2.09c2.87 0 5.2 2.34 5.2 5.24Z" fill="#ff48ce"></path></svg>
);

export const DefaultIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M16 2H8C4 2 2 4 2 8v13c0 .55.45 1 1 1h13c4 0 6-2 6-6V8c0-4-2-6-6-6Zm-2 13.25H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75Zm3-5H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="#2a4365"></path></svg>
);


export const AngryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M21.76 15.92 15.36 4.4C14.5 2.85 13.31 2 12 2s-2.5.85-3.36 2.4l-6.4 11.52c-.81 1.47-.9 2.88-.25 3.99.65 1.11 1.93 1.72 3.61 1.72h12.8c1.68 0 2.96-.61 3.61-1.72.65-1.11.56-2.53-.25-3.99ZM11.25 9c0-.41.34-.75.75-.75s.75.34.75.75v5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V9Zm1.46 8.71-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.19.06-.06.01-.13.02-.19.02s-.13-.01-.2-.02a.636.636 0 0 1-.18-.06.757.757 0 0 1-.18-.09l-.15-.12c-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71l.15-.12c.06-.04.12-.07.18-.09.06-.03.12-.05.18-.06.13-.03.27-.03.39 0 .07.01.13.03.19.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71Z" fill="#ee0d0d"></path></svg>
);

interface Message {
  message: string;
  name: string;
  receiver: string;
  type: string;
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
              <div >
                {message.type === 'lovfess' ? <LoveIcon /> : message.type === 'marahfess' ? <AngryIcon /> : <DefaultIcon />}
              </div>
              <p className="ml-3 font-semibold text-gray-800">{message.name}</p>
            </div>

            {/* Message Content (Like Image in Instagram) */}
            <div className="p-5 min-h-[300px] flex items-center justify-center">
              <h1 className={`${message.type === 'lovfess' ? 'font-homemade-apple text-4xl italic my-1': message.type === 'marahfess' ? 'font-rock-salt text-3xl font-bold' : 'text-5xl font-reenie'} text-gray-900 text-center `}>
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
