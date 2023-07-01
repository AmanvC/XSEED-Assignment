import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", height: "100dvh" }}
    >
      <Toaster />
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
