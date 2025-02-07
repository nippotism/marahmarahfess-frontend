import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout";
import MenfessModal from "../components/ui/MenfessModal";
import Loader from "@/components/ui/Loader";
import { MessageCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion"; // Import motion for animation
import InfiniteScroll from "react-infinite-scroll-component";
import { PropagateLoader } from 'react-spinners';

function Home() {
  const [dataMenfess, setDataMenfess] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Initial state is true to show loader
  const [isVisible, setIsVisible] = useState(false); // Track visibility for fade-in effect
  const [increment, setIncrement] = useState(1)
  const [isOver, setIsOver] = useState(false)

  const fetchAndFormatData = async () => {
    try {
      const response = await  axios.get(`http://localhost:3000/api/messages?limit=${increment*5}`);
      if(response.data.length < increment*5){
        setIsOver(true)
      }
      setIncrement(increment + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDataMenfess(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostMenfess = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/messages",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 201) throw new Error("Failed to send message");
      toast("Menfess berhasil terkirim!");
      fetchAndFormatData();
    } catch (error) {
      console.error(error);
      alert("Error sending menfess.");
    }
  };

  useEffect(() => {
    fetchAndFormatData();

    // Set the loader to disappear after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader
      setIsVisible(true); // Show content with fade-in effect
    }, 2000); // 2 second delay

    return () => clearTimeout(timer); // Clean up the timer when component unmounts
  }, []);

  if (isLoading) return <Loader />; // Show loader until `isLoading` is false

  return (
    <BaseLayout>
      <Toaster position="bottom-right" />
      <motion.div
        className="max-w-lg mx-auto px-4"
        initial={{ opacity: 0, y: 50 }} // Initial state: hidden and shifted down
        animate={{ opacity: 1, y: 0 }} // Final state: visible and in place
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ visibility: isVisible ? "visible" : "hidden" }} // Control visibility based on state
      >
        {/* Header */}
        <div className="text-center py-4 border-b">
          <h1 className="font-bold text-xl">Menfess Rakyat Undip Raya</h1>
        </div>

        {/* Instagram-Style Post Feed */}
        <div className="mt-4 space-y-6">
          {dataMenfess  && 
                          ( 
                            <InfiniteScroll
                              dataLength={dataMenfess.length}
                              next={fetchAndFormatData}
                              hasMore={!isOver}
                              loader={<div className='fixed bottom-1/2 left-1/2 z-50 '>
                                          <PropagateLoader color='black' loading={true} />
                                      </div>
                                }
                              endMessage={
                                <p style={{ textAlign: "center" }}>
                                  <b>Yay! You have seen it all</b>
                                </p>
                              }
                              className='overflow-y-scroll no-scrollbar pb-20'
                            >

                            
          {dataMenfess.map((item) => (
            <div
              key={item._id}
              className="bg-white my-4 rounded-lg shadow-md border border-gray-200"
            >
              {/* Post Header */}
              <div className="flex items-center px-4 py-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>{" "}
                {/* Placeholder Avatar */}
                <div className="ml-3">
                  <p className="font-semibold">{item.name || "Anonymous"}</p>
                </div>
              </div>

              {/* Post Content (Message as Image) */}
              <div className="w-full aspect-square flex items-center justify-center bg-gray-100 p-4">
                <p className="text-5xl font-reenie text-gray-900 text-center break-words">
                  {item.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center px-4 py-2 border-t">
                <p className="text-sm text-gray-500">To: {item.receiver}</p>
                <Link
                  to={`/message/${item._id}`}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Reply</span>
                </Link>
              </div>
            </div>
          ))}
          </InfiniteScroll>
          )}
        </div>

        {/* Menfess Modal */}
        <MenfessModal onSubmit={handlePostMenfess} />
      </motion.div>
    </BaseLayout>
  );
}

export default Home;
