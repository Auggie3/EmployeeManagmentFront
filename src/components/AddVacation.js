import "../css/AddVacation.scss"
import {Button} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddVacation = (props)=>{

    const [state, setState] = useState({
        from: new Date(),
        to: "",
        daysOff:0.5
    });

    const navigate = useNavigate();


    const onChangeHandler = (e,variable) =>{
        let newState = {...state, [variable]: e.target.value};
        setState({...state,[variable]: e.target.value});

        if(variable==="to"){
            const date1 = new Date(state.from);
            const date2 = new Date(e.target.value);
            const diffTime = Math.abs(date2 - date1);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");

            if(diffDays == 0) diffDays = 0.5;
            setState({...newState, daysOff: diffDays});
            console.log(diffDays);
        }

    }

    const onClickHandler = ()=>{
        let data = {
            employeeId: props.global.id,
            from: state.from,
            to: state.to,
            daysOff: state.daysOff
        }

        axios.post("/api/employee/vacation/request",data)
            .then(res=>{
                if(props.global.admin)
                    navigate(`/${props.global.id}`);
                else{
                    navigate('/details/me');
                }
            })
            .catch(err=>{
                console.log(err);
                window.alert("error");
            });
    }

    return <div className={"addVacationComponent"}>

        <div>
            <span>From:</span>
            <input
                type={"date"}
                value={state.from}
                onChange={(e)=>onChangeHandler(e,"from")}
            />
        </div>
        <div>
            <span>To:</span>
            <input
                type={"date"}
                value={state.to}
                onChange={(e)=>onChangeHandler(e,"to")}
            />
        </div>
        <div>
            <span>Number of days:</span>
            <input
                className={"avcDays"}
                type={"number"}
                value={state.daysOff}
                onChange={(e)=>onChangeHandler(e,"daysOff")}
            />
        </div>

        <Button onClick={onClickHandler} className={"avcButton btn btn-primary"}>Submit</Button>

    </div>
}

export default AddVacation;