import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Component/Login";
import Post from "./Component/Create";
import './App.css';
import './index.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/posts" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;