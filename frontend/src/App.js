import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<User />} />
            </Routes>
        </Router>
    );
}

export default App;
