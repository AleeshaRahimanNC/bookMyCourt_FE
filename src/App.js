import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/loginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddNewCourt from "./pages/NewCourt/AddNewCourt";
import CourtDetails from "./pages/CourtDetails/CourtDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/addNewCourt' element={<AddNewCourt/>}/>
        <Route path='/courtDetails/:id' element={<CourtDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
