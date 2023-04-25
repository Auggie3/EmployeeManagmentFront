import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../css/FullEmployee.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAdd, faDeleteLeft} from "@fortawesome/free-solid-svg-icons";
import NewExperienceInput from './NewExperienceInput';
import Vacation from './Vacation';
import NewVacationInput from './NewVacationInput';
import {Form} from "react-bootstrap";

const EditEmployee = (props) => {
    
    const {employeeId} = useParams();
    
    const [data, setData] = useState([]);
    const [newRoles, setNewRoles] = useState([]);
    let allRoles = [];
    let employeeRoles = [];
    const [selectedRole, setSelectedRole] = useState("Give role to employee");


    const removeRoleFromEmployeeHandler = (roleName) => {
        let employeeRoleDTO = {
            employeeId: id,
            roleName: roleName
        }
        axios.delete("/api/employee/role",{data: employeeRoleDTO})
            .then(res=>{
                getData();
            })
            .catch(err=>{
                console.log(err);
            });
    }

    const giveRoleToEmployeeHandler = ()=>{
        if(selectedRole!=="Give role to employee"){
            let employeeRoleDTO = {
                employeeId: id,
                roleName: selectedRole
            };
            axios.put("/api/employee/role", employeeRoleDTO)
                .then(res=>{
                    getData();
                })
                .catch(err=>{
                    console.log(err);
                });
        }
    }

    const getData = ()=>{
        axios.get(`/api/employee/details/${employeeId}`)
        .then(response => {
            setData(response.data);
            employeeRoles = response.data.roles.map(role => role.name);
            getAllRoles();
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getAllRoles = ()=>{
        axios.get("/api/role")
            .then(res =>{
                allRoles = res.data;
                let possibleRoles = allRoles.filter(role => !employeeRoles.includes(role.name));
                setNewRoles(possibleRoles);
            })
            .catch(err=>{
                console.log(err);
            });
    }

    useEffect(() => {
        getData();
    }, [employeeId]);


    const onChangeHandler = (e, variable)=>{
        setData({...data,[variable]: e.target.value});
    }

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

    const navigate = useNavigate();
//---------------------------------------------------------DELETE EXPERIENCE

    const deleteExperience = (experience)=>{
        const pastEmployment = {
            employeeId: experience.employeeId,
            companyName: experience.companyName,
            from: experience.from,
            to: experience.to
        };


        axios.delete(`/api/employee/past`,{data:pastEmployment})
        .then(res => {
            console.log("success");
            getData();
        })
        .catch(err => {
            console.log(err);
        });

    }

//-------------------------------------------------------------------------------------
    

    const addNewExperience = (experience)=>{
        let newExperience = {
            employeeId: employeeId,
            companyName: experience.companyName,
            from: experience.startDate,
            to: experience.endDate
        }
        axios.post("/api/employee/past", newExperience)
        .then( res=>{
            console.log("New experience added");
            getData();
        })
        .catch(err=>{
            console.log("Error while adding experience");
        });
    }

//-----------------------------------------------------------------------------------------------
    
    const submitHandler = ()=>{
        let updatedEmployee = {
            id: id,
            name:name,
            startDate: startDate,
            endDate: endDate,
            position: position,
            username: username
        }

        

        axios.put("/api/employee",updatedEmployee)
        .then(res =>{
            window.alert("Update employee success");
            getData();
        })
        .catch(err =>{
            console.log(err);
        });
    }


//----------------------------------------------------------------------------------------------

    const removeEmployee = ()=>{
        if(window.confirm("Remove employee?")){
            axios.delete(`/api/employee/${id}`)
            .then(res => {
                console.log("Success removing employee");
                navigate("/employees");
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

//--------------------------------------DELETE VACATION

    const deleteVacation = (vacation)=>{
        axios.delete("/api/employee/vacation",{data: vacation})
        .then(res => {
            getData();
        })
        .catch(err =>{
            console.log(err);
        })
    }


//---------------------------------------ADD VACATION

    const addNewVacation = (vacation, defaultData) => {
        let newVacation = {
            employeeId: id,
            from: vacation.from,
            to: vacation.to,
            daysOff: vacation.daysOff
        }
        axios.post("/api/employee/vacation", newVacation)
        .then(res => {
            getData();
            defaultData(1);
        })
        .catch(err=>{
            console.log(err);
        })
    }




    //------------------------------------------------------------------------
    return ( <div className='fullEmployee'>
        <h3>Employee info:</h3>
        
        <div className='editInfo'>       
            <table>
                <tr>
                    <th>id:</th>
                    {/* <th><input type="text" value={id} onChange={(e)=>{onChangeHandler(e,"id")}}/></th> */}
                    <th>{id}</th>
                </tr>
                <tr>
                    <th>Name:</th>
                    <th><input type="text" value={name} onChange={(e)=>{onChangeHandler(e,"name")}}/></th>
                </tr>
                <tr>
                    <th>Start date:</th>
                    <th><input type="date" value={startDate} onChange={(e)=>{onChangeHandler(e,"startDate")}}/></th>
                </tr>
                <tr>
                    <th>End date:</th>
                    <th><input type="date" value={endDate} onChange={(e)=>{onChangeHandler(e,"endDate")}}/></th>
                </tr>
                <tr>
                    <th>Position:</th>
                    <th><input type="text" value={position} onChange={(e)=>{onChangeHandler(e,"position")}}/></th>
                </tr>
                <tr>
                    <th>Username:</th>
                    <th><input type="text" value={username} onChange={(e)=>{onChangeHandler(e,"username")}}/></th>
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

            <div className="su">
                <div className='submit' onClick={submitHandler}>Submit</div>
                <div className='undo' onClick={getData}>Undo changes</div>
            </div>

            <div className={"rolesContainer"}>
                <h2>Roles:</h2>
                <Roles roles = {roles}
                       newRoles = {newRoles}
                       selectedRole = {selectedRole}
                       setSelectedRole={setSelectedRole}
                       giveRoleToEmployeeHandler={giveRoleToEmployeeHandler}
                       removeRoleFromEmployeeHandler={removeRoleFromEmployeeHandler}
                />
            </div>
        </div>

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
        <PastExperiencesExist pastEmployments = {pastEmployments} deleteExperience={deleteExperience}></PastExperiencesExist>
        
        <NewExperienceInput addNewExperience={addNewExperience}/>
        </table>

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
            <Vacations vacations = {vacations} deleteVacation = {deleteVacation}/>
            <NewVacationInput addNewVacation = {addNewVacation}/>
        </table>

        <div className='delete' onClick={removeEmployee}>Remove employee</div>
    </div> );
}
 


const PastExperiencesExist = (props)=>{

    useEffect(()=>{

        }
        ,[props.pastEmployments]);

    if(props.pastEmployments && props.pastEmployments.length>0){
        return(<>
                    {props.pastEmployments
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
                            <th className='deleteExperience redOrYellowButton'
                            onClick={()=>{
                                    const {deleteExperience} = props;
                                    deleteExperience(pe);
                             }
                            }><FontAwesomeIcon icon={faDeleteLeft}/></th>
                        </tr>
                        
                    })}
        </>);
    }else{
        return <></>
    }

}


const Vacations = (props) =>{
    if(props.vacations && props.vacations.length > 0){
        return (<>
                {props.vacations.map(v=>{
                    return(
                     <tr>
                        <Vacation vacation = {v}/>
                        <th className='deleteExperience redOrYellowButton'
                        onClick={()=>{
                                const {deleteVacation} = props;
                                deleteVacation(v);
                         }
                        }><FontAwesomeIcon icon={faDeleteLeft}/>
                    </th>
                    </tr>);     
                })}
    </>);
    }
    else{
        return <></>
    }
}

const Roles = (props) =>{
    const {newRoles, selectedRole, setSelectedRole, giveRoleToEmployeeHandler, removeRoleFromEmployeeHandler} = props;
    if(props.roles && props.roles.length>0)
        return <table style={{marginBottom:"20px"}}>
            {props.roles.map(role => <tr><th>{role.name}</th>{
                role.name!=="ROLE_ADMIN"?<th onClick={()=>removeRoleFromEmployeeHandler(role.name)} className={"cellDeleteRole employeeDeleteRole"}><FontAwesomeIcon icon={faDeleteLeft}/></th>:<th></th>
            }</tr>)}
            <tr>
                <th><Form.Select aria-label="Default select example" value={selectedRole} onChange={(e)=>{
                        setSelectedRole(e.target.value)
                    }
                }>
                    <option>Give role to employee</option>
                    {newRoles?newRoles.map(role => <option value={role.name}>{role.name}</option>):<></>}
                </Form.Select></th>
                <th onClick={giveRoleToEmployeeHandler} className={"addRoleEmployee employeeDeleteRole"}><FontAwesomeIcon icon={faAdd}/></th>
            </tr>
        </table>

    return <></>
}


export default EditEmployee;