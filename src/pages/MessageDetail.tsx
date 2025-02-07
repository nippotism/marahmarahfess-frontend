import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BaseLayout from "@/layouts/BaseLayout";
import axios from "axios";
import RepliesModal from "@/components/ui/RepliesModal";

export default function MessageDetail() {
  const { id } = useParams();
  interface Message {
    message: string;
    name: string;
    receiver: string;
    replies: string[];
  }

  const [message, setMessage] = useState<Message | null>(null);

  const handlePostReplies = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `http://localhost:3000/api/messages/${id}/reply`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 201) throw new Error("Failed to send message");
      alert("Menfess sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Error sending replies.");
    }
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/messages/${id}/replies`
        );
        if (!response.ok) throw new Error("Failed to fetch message");
        const data = await response.json();
        setMessage(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessage();
  }, [id]);

  if (!message) return <p>Loading...</p>;

  return (
    <BaseLayout>
      <div className="p-6">
        <div className="bg-white justify-center w-full max-w-sm p-4 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-500 text-sm">From: {message.name}</p>
          <p className="text-gray-500 text-sm">To: {message.receiver}</p>
          <h1 className="mt-3 text-4xl font-reenie text-gray-900">
            {message.message}
          </h1>
        </div>
        {/* Replies */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Replies:</h2>
          {message.replies && message.replies.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {message.replies.map((item) => (
                <li key={item._id} className="bg-gray-100 p-2 rounded-md">
                  {item.name} <br />
                  {item.reply}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No replies yet.</p>
          )}
          <button
            onClick={() => {
              const modal = document.getElementById("my_modal_5");
              if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
            }}
            className="mt-2 bg-black text-white border rounded-3xl px-8 py-2"
          >
            Add Replies
          </button>
          <RepliesModal onSubmit={handlePostReplies} />
        </div>
      </div>
    </BaseLayout>
  );
}
