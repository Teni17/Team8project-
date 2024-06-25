//Baiscally MAIN offically the root component
//roots are building blocks this where the castle gets built
import { Outlet } from "react-router-dom";
import Donation from "./components/Donations.jsx"
import {Route, Routes} from "react-router-dom";
const App = () =>{
    return(
        <div className="w-full p-6">
            <Routes>
                <Route path="/DonationForm" element={<Donation />} />
            </Routes>
            <Outlet/>
        </div>
    );
};

export default App