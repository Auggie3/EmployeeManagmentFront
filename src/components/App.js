import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import '../css/App.scss';
import EditEmployee from './EditEmployee';
import Employee from './Employee';
import FullEmployee from './FullEmployee';
import Home from './Home';
import Login from './Login';
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown } from 'react-bootstrap';
import Roles from './Roles';
import Expired from "./Expired";
import AddVacation from "./AddVacation";
import AddEmployee from "./AddEmployee";
import VacationRequests from "./VacationRequests";
import ChangePassword from "./ChangePassword";

function App() {

    //TODO: maybe filters and pagination

  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [id, setId] = useState(0);


  const navigate = useNavigate();

  const logoutHandler = ()=>{
    logout();
  }

  const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
    setLogin(false);
    setAdmin(false);
    navigate("/login");
  }

  const global = {
      login,
      setLogin,
      admin,
      setAdmin,
      logout,
      id,
      setId
  }



  useEffect(()=>{
    if(localStorage.getItem("accessToken") != null
    || localStorage.getItem("refreshToken") != null)
        setLogin(true);

    if(localStorage.getItem("admin")==="true") setAdmin(true);
  
  });


  const LinkContainer = () => {
      let arr = [];
      if(admin === true){
        arr.push(<Link to="/employees">All employees</Link>);
        arr.push(<Link to="/roles">Roles</Link>);
        arr.push(<Link to="/vacation/requests">Vacation requests</Link>);
      } 
      if(login === true) {
          arr.push(<Link to={"/details/me"}>My details</Link>);
          arr.push(<Link to={"/change/password"}>Change password</Link>);
      }
      if(arr.length>0){
        return (<NavDropdown
          id="nav-dropdown-dark-example"
          title="Menu"
          menuVariant="dark"
          style={{fontSize: "1.4em"}}
          className='menu'
          >
          {
            arr.map((l, index)=>
              <NavDropdown.Item key={index}>{l}</NavDropdown.Item>   
            )
          }
        </NavDropdown>
        )
      }

      return <></>
      
  };

  return (
    <div className="App">
      <div className='header headerAndFooter'>
          <h1>Employee Management</h1>
          {login? 
          (<button className='btn btn-danger logout' onClick={logoutHandler}>Logout</button>)
          :
          (<></>)}
          
          <LinkContainer/>
      </div>
       
      <div className='middle'>
      <Routes>
          <Route path="/employees" index element={<Home global = {global}/>} />
          <Route path="/:employeeId" element={<FullEmployee global = {global}/>} />
          <Route path='/edit/:employeeId' element={<EditEmployee global = {global}/>} />
          <Route default path='/' element={<Login global = {global}/>}/>
          <Route path='/login' element={<Login global = {global}/>}/>
          <Route path='/details/me' element={<FullEmployee global = {global}/>}/>
          <Route path='/roles' element = {<Roles global = {global}/>} />
          <Route path='/expired' element = {<Expired global = {global}/>} />
          <Route path='/vacation' element = {<AddVacation global = {global} />} />
          <Route path='/add' element = {<AddEmployee global = {global}/>} />
          <Route path='/vacation/requests' element = {<VacationRequests global = {global}/>} />
          <Route path='/change/password' element = {<ChangePassword global ={global}/>} />
          <Route path="*" element={<NoMatch/>} />
      </Routes>
      </div>


      <div className='footer headerAndFooter'>
          <h2>Made by Auggie</h2>
      </div>
        
    </div>
  );
}


function NoMatch(){
  return <div><h1>ERROR</h1></div>
}

export default App;
