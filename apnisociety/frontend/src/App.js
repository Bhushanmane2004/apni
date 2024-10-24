// App.js or your main routing file
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home'
import Startup from './pages/Startup';
import Dashboard from './pages/Dashboard';
import UserDetailsForm from './pages/UserDetailForm';
import GuestInOut from './pages/GuestInOut';
import AboutUs from './pages/Home-page-feat/aboutus';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Maintainess from './pages/maintainess';
import KiranaStore from './pages/KiranaStore';

const App = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Startup" element={<Startup />} />
                <Route path="/dashboard" element={
                    user ? <Dashboard /> : <Navigate to="/login" />
                } />
                <Route path="/detailform" element={
                    user ? <UserDetailsForm /> : <Navigate to="/login" />
                } />
                <Route path="/kirana-store" element={<KiranaStore />} />
                <Route path="/GuestInOut" element={<GuestInOut />}></Route>
                <Route path="/Maintainess" element={<Maintainess />}></Route>
                <Route path="/aboutus" element={<AboutUs />}
                 />
                 
            </Routes>
        </Router>
    );
};

export default App;
