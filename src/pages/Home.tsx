import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout";
import MenfessModal from "../components/ui/MenfessModal";

function Home() {
  const [dataMenfess, setDataMenfess] = useState<any[]>([]);
  //   const [nama, setNama] = useState("");
  //   const [receiver, setReceiver] = useState("");
  //   const [message, setMessage] = useState("");
  //   const [stage, setStage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [increment, setIncrement] = useState(1);
  const [isOver, setIsOver] = useState(false);
  //   const theme = localStorage.getItem("theme") || "light";
  const [isScrolled, setIsScrolled] = useState(false);

  const fetchAndFormatData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/messages`, {
        headers: {},
      });
      console.log(response.data);

      //wait 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setDataMenfess(response.data);

      if (response.data.length < increment * 5) {
        setIsOver(true);
      }
      setIncrement(increment + 1);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("Data fetched and formatted");
    }
  };

  const handlePostMenfess = async (data) => {
    try {
        console.log(data);
      const response = await axios.post("http://localhost:3000/api/messages", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 201) throw new Error("Failed to send message");
      alert("Menfess sent successfully!");
      fetchAndFormatData();
    } catch (error) {
      console.error(error);
      alert("Error sending menfess.");
    }
  };

  useEffect(() => {
    fetchAndFormatData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <BaseLayout>
      <div className="mx-6">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Menfess Rakyat Tembalang Raya</h1>
          <button
            onClick={() => {
              const modal = document.getElementById("my_modal_5");
              if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
            }}
            className="mt-2 bg-black text-white border rounded-3xl px-8 py-2"
          >
            Kirim Menfess
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6 justify-center">
          {dataMenfess.map((item) => (
            <Link
              key={item.id}
              to={`/message/${item._id}`}
              className="bg-white w-full max-w-sm p-4 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-gray-500 text-sm">From: {item.name}</p>
              <p className="text-gray-500 text-sm">To: {item.receiver}</p>
              <h1 className="mt-3 text-4xl font-reenie text-gray-900">
                {item.message}
              </h1>
            </Link>
          ))}
        </div>
        <MenfessModal onSubmit={handlePostMenfess} />
      </div>
    </BaseLayout>
  );
}

export default Home;
