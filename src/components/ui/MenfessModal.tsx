import { useState, useEffect } from "react";

interface MenfessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; receiver: string; message: string; type:string }) => void;
}

export default function MenfessModal({
  isOpen,
  onClose,
  onSubmit,
}: MenfessModalProps) {
  const [name, setName] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Type");

  useEffect(() => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, receiver, message, type });
    onClose();
  };

  return (
    <dialog id="my_modal_5" className="modal">
      <div className="modal-box bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto flex flex-col justify-center">
        <h3 className="font-semibold text-xl text-center text-gray-800">
          Add Menfess
        </h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          Fill the form below to send a menfess
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="text"
            placeholder="Receiver (required)"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <textarea
            placeholder="Your Message (required)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={4}
            required
          ></textarea>

          <details className="dropdown -mt-4">
            <summary className="btn m-1 bg-gray-300 hover:bg-gray-200 hover:border-none text-gray-900 border-white rounded-full">{type}</summary>
            <ul className="menu dropdown-content bg-white rounded-box z-[1] w-52 p-2 shadow">
                <li>
                <a onClick={() => setType("biasafess")}>Biasafess</a>
              </li>
              <li>
                <a onClick={() => setType("marahfess")}>Marahfess</a>
              </li>
              <li>
                <a onClick={() => setType("lovfess")}>Lovfess</a>
              </li>
            </ul>
          </details>

          <div className="modal-action flex justify-between items-center">
            <button
              type="button"
              className="btn btn-ghost text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary text-white bg-blue-900 hover:bg-blue-700 px-6 py-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
