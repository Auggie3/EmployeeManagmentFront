import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../css/Roles.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

const Roles = () => {

    const [roles, setRoles] = useState([]);
    const [state,setState] = useState({
        roleName:"",
        roleDescription:""
    });

    const navigate = useNavigate();

    const getRoles = ()=>{
        axios.get("/api/role")
        .then(res =>{
            setRoles(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
    }

    useEffect(()=>{
        getRoles();
    },[]);
    

    const deleteRole = (roleId)=>{
        axios.delete("/api/role/"+roleId)
        .then(res=>{
            getRoles();
        })
        .catch(err=>{
            console.log(err);
        });
    }

    const onChangeHandler = (e,variable)=>{
        setState({...state,[variable]:e.target.value});
    }

    const addRole = ()=>{
        let data = {
            name: state.roleName,
            description: state.roleDescription
        }
        axios.post("/api/role", data)
        .then(res=>{
            getRoles();
        })
        .catch(err=>{
            window.alert(err.response.data.errors[0].message);
        });
    }

    return ( <div className='rolesPage'>
        <h2>Roles:</h2>
        <table className='roles'>
            <tr>
                <th>Role name</th>
                <th>Description</th>
                <th>Id</th>
                <th></th>
            </tr>
            {roles.length>0?
            roles.sort((role1,role2)=>{
                if(role1.id<role2.id) return -1;
                else return 1;
            }).map(role => <tr key={role.id}>
                    <th>{role.name}</th>
                    <th>{role.description}</th>
                    <th>{role.id}</th>
                    {role.id!=1? <th className='cellDeleteRole' onClick={()=>{deleteRole(role.id)}}><FontAwesomeIcon icon={faDeleteLeft}/></th>:<></>}
                </tr>)
            :
            <></>}
            <tr>
                <th><input type="text" value={state.roleName} placeholder='Name' onChange={(e)=>{onChangeHandler(e,"roleName")}}/></th>
                <th><input type="text" value={state.roleDescription} placeholder='Description' onChange={(e)=>{onChangeHandler(e,"roleDescription")}}/></th>
                <th></th>
                <th className='cellAddRole' onClick={addRole}><FontAwesomeIcon icon={faAdd}/></th>
            </tr>
        </table>
    </div> );
}
 
export default Roles;