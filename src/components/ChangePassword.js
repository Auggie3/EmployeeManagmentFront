import {useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/ChangePassword.scss"


const ChangePassword = ()=>{

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");

    const navigate = useNavigate();

    const changePassword = ()=>{
        if(newPassword!==newPasswordCheck) window.alert("passwords must be same");
        else{
            let data = {
                newPassword: newPassword,
                oldPassword: oldPassword
            }
            axios.put("/api/employee/password",data)
                .then(res=>{
                    navigate("/details/me");
                })
                .catch(err=>{
                    console.log(err);
                    window.alert("Bad request!!! (Check your current password)")
                });
        }
    }

    return <div className="changePassword">
        <div>
            Old password: <input type={"password"} value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
        </div>
        <div>
            New password: <input type={"password"} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
        </div>
        <div>
            Confirm new password: <input type={"password"} value={newPasswordCheck} onChange={(e)=>setNewPasswordCheck(e.target.value)}/>
        </div>
        <Button className={"btn btn-primary"} onClick={changePassword}>Change password</Button>
    </div>
}

export default ChangePassword;