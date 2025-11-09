import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import ChatHome from "./pages/ChatHome";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext";
import { ProfileProvider } from "./context/profileContext";
import axios from "axios";
import { baseUrl } from "../apiConfig";

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id/verify/:token" element={<VerifyEmail />} />
            <Route path="/chathome" element={<ChatHome />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Toaster />
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;


// import React from "react";

// function TestTailwind() {
//   return (
//     <div className="bg-blue-500 text-white p-4 rounded">
//       If this box is blue, Tailwind CSS is working!
//     </div>
//   );
// }
// export default TestTailwind
