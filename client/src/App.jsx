import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import InventoryDisplay from './pages/InventoryDisplay';

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
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App