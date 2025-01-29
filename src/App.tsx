import { useState, useEffect } from 'react'
import './App.css'
import { InfiniteMovingCards } from "./components/ui/infinite-moving-cards";
import { PlaceholdersAndVanishInput } from './components/ui/placeholders-and-vanish-input';
// import { HoverBorderGradient } from './components/ui/hover-border-gradient';
import { Boxes } from './components/ui/background-boxes';
import { CardBody, CardContainer, CardItem } from './components/ui/3d-card';
import InfiniteScroll from "react-infinite-scroll-component";
import { Toaster, toast } from 'sonner';
import axios from 'axios';

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Message
        </CardItem>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            From : John Doe
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            To : Jane Doe
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}



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

const dataloading = [
  {
    id : '1',
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Doe #1",
    title: "Lorem Ipsum",
  },
  {
    id : '2',
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Doe #2",
    title: "Lorem Ipsum",
  },
  {
    id : '3',
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Doe #3",
    title: "Lorem Ipsum",
  },
  {
    id : '4',
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Doe #4",
    title: "Lorem Ipsum",
  },
  {
    id : '5',
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Doe #5",
    title: "Lorem Ipsum",
  },

]


function App() {

  const [dataMenfess, setDataMenfess] = useState<any[]>([])

  const [nama, setNama] = useState('')
  const [receiver, setReceiver] = useState('')
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState(0)
  const [increment, setIncrement] = useState(1)
  const [isOver, setIsOver] = useState(false)

  const fetchAndFormatData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/messages?limit=${increment*5}`,
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
        axios.post('https://a55d-103-47-133-163.ngrok-free.app/api/messages?limit=5', {
          name: nama,
          receiver: receiver,
          message: message
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          toast('Menfess berhasil terkirim')
          // fetchAndFormatData();
        })
      } catch (err){
        console.error(err);
      }
    }
  }, [stage])


 




  return (
    <>
      <div className="min-h-screen relative w-full overflow-hidden bg-[#060606] flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-[#060606] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
  
        <Boxes className='fixed'/>

        <div className=" items-center relative flex flex-col justify-center z-20">
              <div>
              <Toaster 
                position="top-left"
                toastOptions={{
                  className: 'text-white bg-slate-800 border-gray-700',
                }} 
              />
                <div className="mt-8 fixed w-[35%] z-40 justify-center items-center">
                    <PlaceholdersAndVanishInput
                          placeholders={stage === 0 ? placeholder1 : stage === 1 ? placeholder2 : placeholder3}
                          onChange={handleChange}
                          onSubmit={onSubmit}
                    />
                </div>
              {dataMenfess  && 
                ( 
                  <InfiniteScroll
                    dataLength={dataMenfess.length}
                    next={fetchAndFormatData}
                    hasMore={!isOver}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                    className='overflow-y-scroll no-scrollbar'
                  >
                  {dataMenfess.map((item) => (
                  <CardContainer key={item.id} className="inter-var -mb-36 z-50 mx-6">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:bg-zinc-950 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        Pesan :
                      </CardItem>
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
