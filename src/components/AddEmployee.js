import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/AddEmployee.scss"
import {Button} from "react-bootstrap";

const AddEmployee = (props)=>{

    const [state, setState] = useState({
        name:"",
        startDate: "",
        position: "",
        vacationDaysPerYear: 22,
        vacationDaysAvailable: 22,
        username: ""
    });

    const onChangeHandler = (e, variable)=>{
        setState({...state,[variable]: e.target.value});
    }

    const {name, startDate, position, vacationDaysPerYear, vacationDaysAvailable, username} = state;

    const navigate = useNavigate();


    const addEmployee = ()=>{

        axios.post("/api/employee", state)
            .then(res => {
                navigate(`/employees`);
            })
            .catch(err => {
                console.log(err)

            });
    }


    return <div className='employeeInputContainer'>
        <table>
            <tr>
                <th>Name:</th>
                <th><input type="text" value={name} onChange={(e)=>{onChangeHandler(e,"name")}}/></th>
            </tr>
            <tr>
                <th>Start date:</th>
                <th><input type="date" value={startDate} onChange={(e)=>{onChangeHandler(e,"startDate")}}/></th>
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
                <th><input type="text" value={vacationDaysAvailable} onChange={(e)=>{onChangeHandler(e,"vacationDaysAvailable")}}/></th>
            </tr>
            <tr>
                <th>Vacation days per year:</th>
                <th><input type="text" value={vacationDaysPerYear} onChange={(e)=>{onChangeHandler(e,"vacationDaysPerYear")}}/></th>
            </tr>
        </table>
        <Button onClick={addEmployee} className={"btn btn-primary"}>Add employee</Button>
    </div>
}

export default AddEmployee;