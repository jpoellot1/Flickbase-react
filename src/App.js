import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home.jsx";
import Results from "./pages/Results/Results.jsx";
import Movie from "./pages/Movie/Movie.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/results" element={<Results />}></Route>
          <Route path="/movie" element={<Movie />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
