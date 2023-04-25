import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../css/FullEmployee.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Vacation from './Vacation';
import {Button} from "react-bootstrap";

const FullEmployee = (props) => {
    
    const {employeeId} = useParams();
    
    const [data, setData] = useState([]);

    useEffect(() => {
        if(employeeId){
            axios.get(`/api/employee/details/${employeeId}`)
            .then(response => {
                setData(response.data);

            })
            .catch(error => {
                console.log(error);
            });
        }
        else{
            axios.get("/api/employee/details/me")
            .then(response =>{
                setData(response.data)
            })
            .catch(error => {
                console.log(error);
                if(error.response.data.startsWith("JWT expired")){
                    navigate("/expired");
                }
            });
        }

    }, [employeeId]);

    const {
        id,
        name,
        startDate,
        endDate,
        position,
        pastEmployments,
        vacations,
        roles,
        vacationDaysPerYear,
        vacationDaysAvailable,
        username
    } = data;

//------------------------------------------------------------------------------
let navigate = useNavigate();

const onClickHandler = ()=>{
    navigate(`/edit/${id}`);
}



//------------------------------------------------
    return ( <div className='fullEmployee'>
        <h3>Employee info:</h3>
        
        <div className='editInfo'>       
            <table>
                <tr>
                    <th>id:</th>
                    <th>{id}</th>
                </tr>
                <tr>
                    <th>Name:</th>
                    <th>{name}</th>
                </tr>
                <tr>
                    <th>Start date:</th>
                    <th>{startDate}</th>
                </tr>
                <tr>
                    <th>End date:</th>
                    <th>{endDate}</th>
                </tr>
                <tr>
                    <th>Position:</th>
                    <th>{position}</th>
                </tr>
                <tr>
                    <th>Username:</th>
                    <th>{username}</th>
                </tr>
                <tr>
                    <th>Vacation days available:</th>
                    <th>{vacationDaysAvailable}</th>
                </tr>
                <tr>
                    <th>Vacation days per year:</th>
                    <th>{vacationDaysPerYear}</th>
                </tr>
            </table>

            {props.global.admin?
                <div className='iconHolder' onClick={onClickHandler}><FontAwesomeIcon icon={faEdit} className='fa-2xl'/></div>
                :
                <></>
            }
            <div className={"rolesContainer"}>
                <h2>Roles:</h2>
                <Roles roles = {roles}/>
            </div>
        </div>

        <PastExperiencesExist pastExperiences = {pastEmployments}></PastExperiencesExist>
        <Vacations vacations = {vacations}/>

        <Button onClick={()=>{
            props.global.setId(id);
            navigate("/vacation");
        }} className={"blueButton btn btn-primary"}>Add vacation</Button>
    </div> );
}
 


const PastExperiencesExist = (props)=>{

    if(props.pastExperiences && props.pastExperiences.length>0){
        return(<>
                <h3 style={{marginTop: "20px"}}>Past experiences:</h3>
                <table className='pastExperiences'>
                    <tr>
                        <th>
                            Company
                        </th>
                        <th>
                            Start date
                        </th>
                        <th>
                            End date
                        </th>
                    </tr>
                    {props.pastExperiences
                        .sort((a,b) => new Date(a.from) - new Date(b.from))
                        .map((pe,index)=>{
                        return <tr>
                            <th>
                                {pe.companyName}
                            </th>
                            <th>
                                {pe.from}
                            </th>
                            <th>
                                {pe.to}
                            </th>
                        </tr>

                    })}
                </table>
        </>);
    }else{
        return <h2 style={{marginTop: "20px"}}>No past experiences.</h2>
    }
}

const Vacations = (props) =>{
    if(props.vacations && props.vacations.length > 0){
        return (<>
            <h3 style={{marginTop: "20px"}}>Vacations:</h3>
            <table className='pastExperiences'>
                <tr>
                    <th>
                        From
                    </th>
                    <th>
                        To
                    </th>
                    <th>
                        Days off
                    </th>
                </tr>
                {props.vacations.map(v=>{
                    return <tr><Vacation vacation = {v}/></tr>     
                })}
            </table>
    </>);
    }
    else{
        return <h2 style={{marginTop: "20px"}}>No vacations taken yet.</h2>
    }
}

const Roles = (props) =>{
    if(props.roles && props.roles.length>0)
    return <table style={{marginBottom:"20px"}}>
        {props.roles.map(role => <tr><th>{role.name}</th></tr>)}
    </table>

    return <></>
}

export default FullEmployee;