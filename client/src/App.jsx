import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import InventoryDisplay from './pages/InventoryDisplay';
import GenerateReport from './pages/GenerateReport'
import Donation from './components/Donations.jsx'

const App = () =>{
    return(
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
                        <Route
                            path="/home"
                            element={<Home />}
                        />
                        <Route
                            path="/inventory-display"
                            element={<InventoryDisplay />}
                        />
                        <Route
                            path="/generate-report"
                            element={<GenerateReport />}
                        />
                        <Route 
                            path="/DonationForm" 
                            element={<Donation />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App