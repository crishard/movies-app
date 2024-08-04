import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Details, Home, WatchLater } from "./pages";


function App() {

  return (
    <main className="sm:px-[8%] px-[4%]">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Details />} />
          <Route path="/watch-later" element={<WatchLater/>} />
        </Routes>
      </Router>
      <Footer />
    </main>
  )
}

export default App
