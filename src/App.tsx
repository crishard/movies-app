import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Details, Favorites, Home, WatchLater } from "./pages";


function App() {

  return (
    <main className="text-[#EEEEEE] bg-gray-950">

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Details />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  )
}

export default App
