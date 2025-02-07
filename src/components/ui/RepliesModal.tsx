import { useState } from "react";

interface RepliesModalProps {
  onSubmit: (data: { name: string; reply: string }) => void;
}

export default function RepliesModal({ onSubmit }: RepliesModalProps) {
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name: name || "Anonim", reply });

    // Reset form
    setName("");
    setReply("");

    // Close modal
    (document.getElementById("my_modal_5") as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
        <h3 className="font-semibold text-xl text-center text-gray-800">
          Add Replied
        </h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          Fill the form below to send a replies
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
          />

          <textarea
            placeholder="Your Message (required)"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
            rows={4}
            required
          ></textarea>

          <div className="modal-action flex justify-between items-center">
            <button
              type="button"
              className="btn btn-ghost text-gray-600 hover:text-gray-800 border-none rounded-md focus:ring-2 focus:ring-gray-400"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_5"
                ) as HTMLDialogElement;
                if (modal) {
                  modal.close();
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary text-white bg-blue-500 hover:bg-blue-600 rounded-md px-6 py-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
