import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./components/home";


import "./style.css"
const App = () => {
  return (
    
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
         
       
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
