import './App.css';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup.js';
import CartProvider from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';
import User from './components/User.js'; 
import RegDetails from './screens/RegDetails.js';
import AdServices from './components/Admin/AdServices.js';
import EditData from './components/Admin/EditData.js';
// import Front from './screens/Front.js';

function App() {
  return (
    <CartProvider>
       {/* <AdServices/> */}
    <Router>
    <div>
      <Routes>
        <Route exact path ="/" element={<Home/>}/>
        <Route exact path ="/login" element={<Login/>}/>
        <Route exact path ="/createuser" element={<Signup/>}/>
        <Route exact path ="/myOrder" element={<MyOrder/>}/>
        <Route exact path ="/submit" element={<User/>}/>
        <Route exact path ="/registrations" element={<RegDetails/>}/>
        <Route exact path = "/update-data" element={<EditData/>}/>

      </Routes>                                   
    </div>
    </Router>
    {/* <Front/> */}
    </CartProvider>
    
  );
}

export default App;
