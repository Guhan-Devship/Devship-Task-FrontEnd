import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import Mobile from "./Pages/Mobile";
import Search from "./Pages/Search";
import CartItem from "./Pages/CartItem";
import Profile from "./Pages/Profile/Profile";
import NewAddress from "./Pages/Address/NewAddress";
import NewShipAddress from "./Pages/Address/NewShipAddress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<Mobile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<NewAddress />} />
        <Route path="/shipaddress" element={<NewShipAddress />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
