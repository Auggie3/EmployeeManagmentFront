import "../css/Employee.scss"
import { useNavigate } from "react-router-dom";


const Employee = (props) => {

    let navigate = useNavigate();

    const onClickHandler = ()=>{
        navigate(`/${id}`);
    }

    const {id, name, startDate, position, username} = props.e;
    return ( 
        <div className="employee" onClick={onClickHandler}>
            <div className={"employeeId"}>
                {id}
            </div>
            <div className={"employeeName employeeBigField"}>
                {name}
            </div>
            <div className={"employeeStartDate employeeBigField"}>
                {startDate}
            </div>
            <div className={"employeePosition employeeBigField"}>
                {position}
            </div>
            <div className={"employeeUsername employeeBigField"}>
                {username}
            </div>

        </div>
     );
}


 
export default Employee;