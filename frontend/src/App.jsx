import WeddingPhotoApp from './components/WeddingPhotoApp'
import './style.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/wedding-photos" element={<WeddingPhotoApp />} />
      </Routes>
    </Router>
  );
}

export default App;

