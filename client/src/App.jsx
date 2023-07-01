import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Navbar from "./components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return;
  }

  const LoggedInProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to={"/"} />;
    }
    return children;
  };

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", height: "100dvh" }}
    >
      <Toaster />
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/register"}
          element={
            <LoggedInProtectedRoute>
              <Register />
            </LoggedInProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
