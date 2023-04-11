import "../css/VacationRequest.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import axios from "axios";


const VacationRequest = (props)=>{
    const {employeeId, from, to, daysOff,employeeName} = props.vacationRequest;

    const allowVacationRequest = ()=>{
        let data = {
            employeeId:employeeId,
            from: from
        }

        axios.post("/api/employee/vacation/request/allowed", data)
            .then(res=>{
                props.getData();
            })
            .catch(err=>{
                console.log(err);
            });
    }

    const denyVacationRequest = ()=>{
        let data = {
            employeeId:employeeId,
            from: from
        }

        axios.delete("/api/employee/vacation/request/denied", {data:data})
            .then(res=>{
                props.getData();
            })
            .catch(err=>{
                console.log(err);
            });
    }

    return <div className={"vacationRequest"}>
        <div>{employeeId}</div>
        <div>{employeeName}</div>
        <div>{from}</div>
        <div>{to}</div>
        <div>{daysOff}</div>
        <div onClick={allowVacationRequest}><FontAwesomeIcon icon={faCheck}/></div>
        <div onClick={denyVacationRequest}><FontAwesomeIcon icon={faX}/></div>
    </div>;
}

export default VacationRequest;