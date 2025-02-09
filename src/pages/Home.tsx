import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Home, Send } from "lucide-react"; // Icons for navbar
import MenfessModal from "../components/ui/MenfessModal";
import Loader from "@/components/ui/Loader";
import Footer from "@/components/ui/Footer";
import { FlipWords } from "@/components/ui/flip-words";
import { Cover } from "@/components/ui/cover";
import { MessageCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion"; // Import motion for animation
import InfiniteScroll from "react-infinite-scroll-component";


export const LoveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M18.8 9.91c-1.13 0-2.14.55-2.77 1.39a3.466 3.466 0 0 0-2.77-1.39c-1.91 0-3.46 1.56-3.46 3.48 0 .74.12 1.43.32 2.06.98 3.11 4.02 4.98 5.52 5.49.21.07.56.07.77 0 1.5-.51 4.54-2.37 5.52-5.49.21-.64.32-1.32.32-2.06a3.457 3.457 0 0 0-3.45-3.48Z" fill="#f972db"></path><path d="M20.75 8.342c0 .23-.23.38-.45.32a4.81 4.81 0 0 0-3.95.74c-.22.16-.52.16-.73 0a4.65 4.65 0 0 0-2.76-.9c-2.58 0-4.68 2.11-4.68 4.71 0 2.82 1.35 4.93 2.71 6.34.07.07.01.19-.08.15C8.08 18.772 2 14.912 2 8.342c0-2.9 2.33-5.24 5.21-5.24 1.71 0 3.22.82 4.17 2.09a5.218 5.218 0 0 1 4.17-2.09c2.87 0 5.2 2.34 5.2 5.24Z" fill="#ff48ce"></path></svg>
);

export const DefaultIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M16 2H8C4 2 2 4 2 8v13c0 .55.45 1 1 1h13c4 0 6-2 6-6V8c0-4-2-6-6-6Zm-2 13.25H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75Zm3-5H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="#2a4365"></path></svg>
);


export const AngryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M21.76 15.92 15.36 4.4C14.5 2.85 13.31 2 12 2s-2.5.85-3.36 2.4l-6.4 11.52c-.81 1.47-.9 2.88-.25 3.99.65 1.11 1.93 1.72 3.61 1.72h12.8c1.68 0 2.96-.61 3.61-1.72.65-1.11.56-2.53-.25-3.99ZM11.25 9c0-.41.34-.75.75-.75s.75.34.75.75v5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V9Zm1.46 8.71-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.19.06-.06.01-.13.02-.19.02s-.13-.01-.2-.02a.636.636 0 0 1-.18-.06.757.757 0 0 1-.18-.09l-.15-.12c-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71l.15-.12c.06-.04.12-.07.18-.09.06-.03.12-.05.18-.06.13-.03.27-.03.39 0 .07.01.13.03.19.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71Z" fill="#ee0d0d"></path></svg>
);

export const kata = [
  'menfess',
  'lovfess',
  'marahfess',
  'biasafess',
]


function Index() {
  const [dataMenfess, setDataMenfess] = useState<any[]>([]);
  //if already loaded first, dont need to set true again
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false); // Track visibility for fade-in effect
  const [increment, setIncrement] = useState(1);
  const [isOver, setIsOver] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
  const hasLoaded = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchAndFormatData = async () => {
    try {
      const response = await axios.get(
        `https://marahmarahfess-backend-production.up.railway.app/api/messages?limit=${
          increment * 5
        }`
      );
      if (response.data.length < increment * 5) {
        setIsOver(true);
      }
      setIncrement(increment + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDataMenfess(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostMenfess = async (data: {
    name: string;
    message: string;
    receiver: string;
    type: string;
  }) => {
    try {
      const response = await axios.post(
        "https://marahmarahfess-backend-production.up.railway.app/api/messages",
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
    if (hasLoaded.current) {
      // If already loaded, skip loading
      setIsLoading(false);
      setIsVisible(true);
      return;
    }


    setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
      hasLoaded.current = true; // Mark as loaded
    }, 2000);
  }, []);

  if (isLoading) return <Loader />; // Show loader until `isLoading` is false

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
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="bg-[#2a4365] hidden md:block text-white px-3 py-3 rounded-full text-sm"
        >
          <motion.svg
            className="w-8 h-8 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            initial={{ rotate: 0 }}
            animate={{ rotate: isModalOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
          </motion.svg>
        </button>
      </nav>

      {/* Content */}
      <div className="w-full pt-16 font-jakarta-sans">
        <Toaster position="bottom-right" />
        <motion.div
          className="mx-auto px-4"
          initial={{ opacity: 0, y: 0 }} // Initial state: hidden and shifted down
          animate={{ opacity: 1, y: 0 }} // Final state: visible and in place
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ visibility: isVisible ? "visible" : "hidden" }} // Control visibility based on state
        >
          {/* Header */}
          <div className="text-center py-4  my-8 lg:my-24">
            <h1 className=" font-jakarta-sans font-bold text-3xl lg:text-7xl break-words tracking-wider">Menfess <Cover>Rakyat Undip</Cover> Raya.</h1>
            <p className="text-gray-600 text-lg lg:text-2xl mt-4">
              Kirim <FlipWords words={kata}/> kamu disini!    
            </p>
            
          </div>

          {/* Instagram-Style Post Feed */}
          <div className="mt-4 space-y-6 border-t border-gray-300">
            {dataMenfess && (
              <InfiniteScroll
                // scrollableTarget="scrollableDiv"
                dataLength={dataMenfess.length}
                next={fetchAndFormatData}
                hasMore={!isOver}
                loader={
                  <div className="relative flex justify-center items-center py-4">  
                  <p className="text-gray-600">Loading...</p>
                  </div>
                }
                endMessage={
                  <p className="relative flex justify-center items-center py-4">
                    <b>Dah Celece....</b>
                  </p>
                }
                className="overflow-y-scroll no-scrollbar pb-20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
                  {dataMenfess.map((item) => (
                    <Link to={`/message/${item._id}`}>
                    <motion.div
                      key={item._id}
                      className="bg-white my-4 rounded-lg shadow-md border border-gray-200"
                      whileHover={item.type === 'marahfess'? { x: [0, -2, 3, -2, 3, 0],y: [0, -1, 2, -1, 2, 0], color:"#ff0505" } : {}}
                        transition={item.type === 'marahfess' ? { duration: 0.2, repeat: Infinity, ease: "linear" } : {}}
                    >
                      {/* Post Header */}
                      <div className="flex items-center px-4 py-2">
                        <div >
                          {item.type === 'lovfess' ? <LoveIcon /> : item.type === 'marahfess' ? <AngryIcon /> : <DefaultIcon />}
                        </div>
                        {/* Placeholder Avatar */}
                        <div className="ml-3">
                          <p className="font-semibold">
                            {item.name || "Anonymous"}
                          </p>
                          <p className="text-sm text-gray-500">
                          To: {item.receiver}
                        </p>
                        </div>
                      </div>

                      {/* Post Content (Message as Image) */}
                      <div className="w-full aspect-square flex items-center justify-center bg-white p-4">
                        <motion.p 
                        className={`${item.type === 'lovfess' ? 'font-homemade-apple text-3xl italic my-1': item.type === 'marahfess' ? 'font-rock-salt text-4xl font-bold' : 'text-5xl font-reenie'} text-gray-900 text-center break-words line-clamp-6`}

                        whileHover={item.type === 'marahfess'? { x: [0, -5, 5, -5, 5, 0],y: [0, -5, 5, -5, 5, 0], color:"#ff0505" } : {}}
                        transition={item.type === 'marahfess' ? { duration: 0.2, repeat: Infinity, ease: "linear" } : {}}

                        
                        >
                          {item.message}
                        </motion.p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center px-4 py-2 border-t">
                        <Link
                          to={`/message/${item._id}`}
                          className="flex justify-end space-x-1 text-gray-600 hover:text-blue-500"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>Reply</span>
                        </Link>
                      </div>
                    </motion.div>
                    </Link>
                  ))} 
                </div>
              </InfiniteScroll>
            )}
          </div>

          {/* Menfess Modal */}
          <MenfessModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handlePostMenfess}
          />
        </motion.div>
      </div>
      <Footer />

      {/* Bottom Navigation Bar (Mobile) */}
      <div className="sticky bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 md:hidden">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center text-gray-600 hover:text-black"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center text-gray-600 hover:text-black"
        >
          <Send className="w-6 h-6" />
          <span className="text-xs">Kirim Menfess</span>
        </button>
      </div>
    </div>
  );
}

export default Index;
