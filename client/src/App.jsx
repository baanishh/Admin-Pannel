import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserTable from './components/userTable';
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <Router>
        <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<UserTable />} />
        <Route path="/" element={<Register />} /> {/* Redirect to register */}
      </Routes>
    </Router>
  );
};

export default App;
