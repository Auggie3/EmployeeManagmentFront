import {Button} from "react-bootstrap";
import "../css/Expired.scss"

const Expired = (props)=>{

    const onClickHandler = ()=>{
        props.global.logout();
    }

    return <div className={"expired"}>
        <h1>Session expired. Login again!!!</h1>
        <Button className={"btn btn-secondary"} onClick={onClickHandler}>Go to login</Button>
    </div>
}

export default Expired;
