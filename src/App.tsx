import { useState, useEffect } from 'react'
import './App.css'
import { InfiniteMovingCards } from "./components/ui/infinite-moving-cards";
import { PlaceholdersAndVanishInput } from './components/ui/placeholders-and-vanish-input';
// import { HoverBorderGradient } from './components/ui/hover-border-gradient';
// import { Boxes } from './components/ui/background-boxes';
import { Toaster, toast } from 'sonner';
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

  const [dataMenfess, setDataMenfess] = useState(null)

  const [nama, setNama] = useState('')
  const [receiver, setReceiver] = useState('')
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState(0)

  const fetchAndFormatData = async () => {
    try {
      const response = await axios.get("https://a55d-103-47-133-163.ngrok-free.app/api/messages",
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      console.log(response.data);

      // Format the data
      const formattedData = response.data.map((item) => ({
        quote: item.message,
        name: `Dari ${item.name}`,
        title: `Untuk ${item.receiver}`,
        id: item.id,
      }));

      setDataMenfess(formattedData);
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
        axios.post('https://a55d-103-47-133-163.ngrok-free.app/api/messages', {
          name: nama,
          receiver: receiver,
          message: message
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          toast('Menfess berhasil terkirim')
          fetchAndFormatData();
        })
      } catch (err){
        console.error(err);
      }
    }
  }, [stage])




  return (
    <>
    <div className=" bg-black items-center flex flex-col justify-center min-h-screen">
        <div>
        <Toaster 
          position="top-left"
          toastOptions={{
            className: 'text-white bg-slate-800 border-gray-700',
          }} 
        />
          <InfiniteMovingCards
            items={dataloading}
            direction="right"
            speed="fast"
            pauseOnHover={false}
            className='opacity-25 z-0 mb-3'
           />
           {/* <HoverBorderGradient
           as="form"
           className='ite'
           > */}
            <PlaceholdersAndVanishInput
                placeholders={stage === 0 ? placeholder1 : stage === 1 ? placeholder2 : placeholder3}
                onChange={handleChange}
                onSubmit={onSubmit}
                />
            {/* </HoverBorderGradient> */}
          {dataMenfess && (
            <InfiniteMovingCards 
            items={dataMenfess} 
            direction='left' 
            speed="slow" 
            className='mt-2'
          />
            )}
          <InfiniteMovingCards
            items={dataloading}
            direction="right"
            speed="fast" 
            pauseOnHover={false}
            className='opacity-25 z-0 mt-3'
           />
        </div>
        
    </div>
    </>
  )
}

export default App
