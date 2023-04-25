import axios from "axios";
import { useNavigate } from "react-router-dom";

const setupInterceptors = () => {
    axios.interceptors.response.use(res=>{
        return res;
    }, err=>{
        console.log(err);
        if(
            err.response.data != null
            && (typeof err.response.data === "string" || err.response.data instanceof String)
            && err.response.data.startsWith("JWT expired")
        ){
            window.location.replace("/expired");
        }
        else if(err.response.data && err.response.data.errors){
            window.alert(err.response.data.errors[0].message);
        }else{
            window.alert("Error");
        }
        return Promise.reject(err);
    });
    
//-------------------------------------------------------------------------
    axios.interceptors.request.use(req =>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        
        if(refreshToken != null){
            req.headers.Authorization = "Bearer " + refreshToken;
        }
        else if(accessToken != null){
            req.headers.Authorization = "Bearer " + accessToken;
        }

        console.log(req);

        return req;
    }, err => {
        //console.log(err);
        return Promise.reject(err);
    });
//---------------------------------------------------------------------
}
 
export default setupInterceptors;