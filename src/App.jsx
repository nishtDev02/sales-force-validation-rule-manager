import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import Callback from "./pages/Callback";
import ValidationList from "./components/ValidationList";
import Navbar from "./components/Navbar";

const isLoggedIn = () => {
  return localStorage.getItem("sf_access_token") !== null;
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <ValidationList />
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
          <span className="text-white text-2xl font-bold">SF</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">
          Salesforce Rules Manager
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md">
          Connect to your Salesforce org and manage validation rules with ease
        </p>
        <LoginButton />
        <p className="text-gray-600 text-xs mt-6">Secured with OAuth 2.0</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth/callback" element={<Callback />} />
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to={"/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
