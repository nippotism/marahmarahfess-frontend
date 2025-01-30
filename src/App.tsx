import { useState, useEffect } from 'react'
import './App.css'
import { PlaceholdersAndVanishInput } from './components/ui/placeholders-and-vanish-input';
import ThemeToggle from './components/ui/theme-toggle';
import { Boxes } from './components/ui/background-boxes';
import { CardBody, CardContainer, CardItem } from './components/ui/3d-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip"
import InfiniteScroll from "react-infinite-scroll-component";
import { Toaster, toast } from 'sonner';
import { PropagateLoader } from 'react-spinners';
import axios from 'axios';  



const placeholder1 = [
  "Mau kirim pesan? tulis nama lo sini" ,
  "Who r u?",
  "What's your name?",
  "tulis nama lo",
];

const placeholder2 = [
  "mau bikin pesan buat siapa?",
  "Lagi kesel sama siapa?",
  "siapa nama sianjing itu?",
];

const placeholder3 = [
  "apa pesanmu?",
  "ngapain dia?",
  "apa yang bikin kamu kesel?",
  "pesen apa buat dia?",
]




function App() {

  const [dataMenfess, setDataMenfess] = useState<any[]>([])

  const [nama, setNama] = useState('')
  const [receiver, setReceiver] = useState('')
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState(0)
  const [increment, setIncrement] = useState(1)
  const [isOver, setIsOver] = useState(false)
  const theme = localStorage.getItem("theme") || "light";



  const fetchAndFormatData = async () => {
    try {
      const response = await axios.get(`https://marahmarahfess-backend-production.up.railway.app/api/messages?limit=${increment*5}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      console.log(response.data);

      //wait 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      setDataMenfess(response.data);

      if(response.data.length < increment*5){
        setIsOver(true)
      }
      setIncrement(increment + 1);

    } catch (err) {
      console.error(err);
    } finally {
      console.log("Data fetched and formatted");
    }
  };

  useEffect(() => {
    fetchAndFormatData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    if(stage === 0){
      setNama(e.target.value)
    } else if (stage === 1){
      setReceiver(e.target.value)
    } else if (stage === 2){
      setMessage(e.target.value)
    }
  };


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStage(stage + 1);
  };

  useEffect(() => {
    console.log('stage sekarang'+stage);
    console.log(nama);
    console.log(receiver);
    console.log(message);

    if(stage === 3){
      try{
        axios.post('https://marahmarahfess-backend-production.up.railway.app/api/messages', {
          name: nama,
          receiver: receiver,
          message: message
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          toast('Menfess berhasil terkirim');
          setStage(0);
          setNama('');
          setReceiver('');
          setMessage('');
          fetchAndFormatData();
        })
      } catch (err){
        console.error(err);
      }
    }
  }, [stage])


 




  return (
    <>
      <div className="min-h-screen relative w-full overflow-hidden bg-white dark:bg-[#181818] flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-gray-300 dark:bg-[#0f0f0f] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
  
        <Boxes className='fixed opacity-50 dark:opacity-100'/>

        <div className=" items-center relative flex flex-col justify-center z-20">
              <div>
              <Toaster 
                position="top-left"
                toastOptions={{
                  className: 'text-white bg-black border-gray-700',
                }} 
              />
                <div className='fixed bottom-0 left-0 ml-6 mb-6 z-50'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-white dark:text-black bg-black dark:bg-white rounded-full px-2 py-2 text-xl font-bold cursor-pointer">
                      <svg className="w-6 h-6 dark:text-black text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"    width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>


                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sampaikan kemarahanmu ke orang lain<br/> isi namamu,<br/>isi nama orang yang kamu marahin,<br/>dan tulis pesanmu.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                </div>
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] z-50 flex justify-center items-center mt-4">
                  <PlaceholdersAndVanishInput
                    placeholders={stage === 0 ? placeholder1 : stage === 1 ? placeholder2 : placeholder3}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                  />
                  <ThemeToggle />
                </div>
              {dataMenfess  && 
                ( 
                  <InfiniteScroll
                    dataLength={dataMenfess.length}
                    next={fetchAndFormatData}
                    hasMore={!isOver}
                    loader={<div className='fixed bottom-1/2 left-1/2 z-50 '>
                                <PropagateLoader color={theme === 'light' ? 'black' : 'white'} loading={true} />
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
                  <CardContainer key={item.id} className="inter-var -mb-36 z-50 min-w-[40vh]">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:bg-zinc-950 dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border">
                      <div className='flex justify-between items-center'>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        Pesan :
                      </CardItem>
                      <CardItem
                          translateZ={20}
                          translateX={40}
                          className=" dark:text-white text-black text-xs font-extralight"
                        >
                          {item.created_at}
                      </CardItem>

                      </div>
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                      >
                        {item.message}
                      </CardItem>
                      <div className="flex justify-between items-center mt-10">
                        <CardItem
                          translateZ={20}
                          translateX={-40}
                          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                          Dari : {item.name}
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          translateX={40}
                          className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        >
                          Untuk : {item.receiver}
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                  ))}
                  </InfiniteScroll>
                )
              }
              </div>    
        </div>

      </div>
    </>
  )
}

export default App
