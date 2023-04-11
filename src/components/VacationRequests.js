import {useEffect, useState} from "react";
import VacationRequest from "./VacationRequest";
import "../css/VacationRequests.scss"
import axios from "axios";


const VacationRequests = ()=>{

    const [data,setData] = useState([]);

    const getData = ()=>{
        axios.get("/api/employee/vacation/request")
            .then(res=>{
                if(res.data)
                    setData(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
    }

    useEffect(()=>{
        getData();
    },[]);

    let insideDiv = [];

    insideDiv.push(<h2>Vacation requests:</h2>);
    if(data.length==0) insideDiv.push(<h2>No vacation requests!</h2>)
    else{
        insideDiv.push(data.map(vacationRequest => {
            return <VacationRequest getData={getData} vacationRequest = {vacationRequest}/>;
        }));
    }

    return <div className={"vacationRequests"}>
        {insideDiv}
    </div>;
}

export default VacationRequests;