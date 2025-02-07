import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BaseLayout from "@/layouts/BaseLayout";
import axios from "axios";
import { Send } from "lucide-react";
import { Toaster, toast } from "sonner";
import RepliesModal from "@/components/ui/RepliesModal";

export default function MessageDetail() {
  const { id } = useParams();

  interface Message {
    message: string;
    name: string;
    receiver: string;
    replies: { _id: string; name: string; reply: string }[];
  }

  const [message, setMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  const handlePostReplies = async () => {
    if (!replyText.trim()) return;

    try {
      const data = { reply: replyText };
      const response = await axios.post(
        `http://localhost:3000/api/messages/${id}/reply`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 201) throw new Error("Failed to send reply");

      setReplyText("");
      fetchMessage(); // Refresh replies
      toast("Reply berhasil dikirim!");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessage = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/${id}/replies`
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

  if (!message) return <p className="text-center mt-10">Loading...</p>;

  return (
    <BaseLayout>
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
            onClick={() => document.getElementById("my_modal_5")?.showModal()}
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

        <RepliesModal onSubmit={handlePostReplies} />
      </div>
    </BaseLayout>
  );
}
