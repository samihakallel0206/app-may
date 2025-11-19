import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Forfaits from "./pages/Forfaits";
import Boutique from "./pages/Boutique";
import SmartDev from "./pages/SmartDev";
import UpdateCV from "./pages/UpdateCV";
import CartSidebar from "./components/Cart/CartSidebar";
import Notification from "./components/UI/Notification";
import "./styles/App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forfaits"
            element={
              <ProtectedRoute>
                <Forfaits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/boutique"
            element={
              <ProtectedRoute>
                <Boutique />
              </ProtectedRoute>
            }
          />
          <Route
            path="/smartdev"
            element={
              <ProtectedRoute>
                <SmartDev />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatecv"
            element={
              <ProtectedRoute>
                <UpdateCV />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <CartSidebar />
      <Notification />
    </div>
  );
}

export default App;
