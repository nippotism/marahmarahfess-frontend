import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MessageDetail from "./pages/MessageDetail";
// import Explore from "./pages/Explore";
// import AddMenfess from "./pages/AddMenfess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message/:id" element={<MessageDetail />} />
        {/* <Route path="/explore" element={<Explore />} />
        <Route path="/add-menfess" element={<AddMenfess />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
