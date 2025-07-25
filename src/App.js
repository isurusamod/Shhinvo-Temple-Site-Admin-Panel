import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Homarequests from "./pages/Homarequests";
import Seasonalrequests from "./pages/Seasonalrequests";
import Prayerrequests from "./pages/Prayerrequests";
import Requestsp from "./pages/Requestsp";
import Requestslandscape from "./pages/Requestslandscape";
import Forms from "./pages/Forms";
import Address from "./pages/Address";

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/homarequests" element={<Homarequests />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/seasonalrequests" element={<Seasonalrequests />} />
        <Route path="/address"element={<Address/>}/>
        <Route path="/prayerrequests" element={<Prayerrequests />} />
        <Route path="/requestsp" element={<Requestsp />} />
        <Route path="/requestslandscape" element={<Requestslandscape />} />
      </Routes>
    </Router>
  );
}

export default App;
