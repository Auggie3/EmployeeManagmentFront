import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const {global} = props;

    const [state, setState] = useState({
        username: "",
        password: "",
        rememberMe: false
    });

    const onChangeHandler = (e, variable)=>{
        setState({...state,[variable]: e.target.value});
    }

    const navigate = useNavigate();


    const onClickHandler = ()=>{
        let loginDTO = {
            username: state.username,
            password: state.password,
            rememberMe: state.rememberMe
        };


        axios.post("/api/authenticate/login",loginDTO)
        .then(res=>{

            console.log(res.data);
            if(res.data.accessToken != null){
                localStorage.setItem("accessToken",res.data.accessToken);
                
                if(res.data.refreshToken != null)
                    localStorage.setItem("refreshToken",res.data.accessToken);
                
                if(res.data.admin === true){
                    global.setAdmin(true);
                    localStorage.setItem("admin","true");
                }

                global.setLogin(true);
                navigate("/details/me");
            }
        })
        .catch(err=>{
            window.alert(err.response.data.message);
        });
    }

    return (
    <div className='loginContainer'>
        <input className='logChild' type="text" value={state.username} placeholder="Input your username" onChange={(e)=>{
            onChangeHandler(e,"username")
        }}/>

        <div className='passAndRemember logChild'>
            <input type="password" value={state.password} placeholder="Input your password" onChange={(e)=>{
                onChangeHandler(e,"password")
            }}/>

            <div><input type="checkbox" checked={state.rememberMe} onChange={()=>{
                setState({...state, rememberMe: !state.rememberMe});
            }}/> Remember me </div>
        </div>
        <button type='submit' className='btn btn-primary' onClick={onClickHandler}>Login</button>
    </div>  
    
    );
}
 
export default Login;