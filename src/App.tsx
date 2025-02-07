import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import MessageDetail from "./pages/MessageDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message/:id" element={<MessageDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
