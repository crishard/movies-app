import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/UI";
import { Details, Favorites, Home, WatchLater } from "./pages";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<Details />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
