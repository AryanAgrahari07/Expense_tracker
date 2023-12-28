import './App.css';
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
        <Route path='/' element={<><Home/></>}/>
        <Route path='/login' element={<><Login/></>}/>
        <Route path='/register' element={<><Register/></>}/>
        <Route path='*' element={<><Login/></>}/>
      </Routes>
    </div>
    </Router>
  );
}


// export function ProtectedRoute(props){

//   if(localStorage.getItem('expense-tracker-user'))
//   {
//     return props.children
//   }else{
//    return <Navigate to='/login'/>
//   }

// }

export default App;
