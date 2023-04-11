import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

const NewVacationInput = (props) => {

    const [data,setData] = useState({
        from: "",
        to: "",
        daysOff: ""
    });

    const defaultData = ()=>{
        setData({
            from: "",
            to: "",
            daysOff: ""
        });
    }

    const onChangeHandler = (e, variable)=>{
        setData({...data,[variable]: e.target.value});
    }

    return ( <tr>
        <th><input type="date" value={data.from} onChange={(e)=>{onChangeHandler(e,"from")}}/></th>
        <th><input type="date" value={data.to} onChange={(e)=>{onChangeHandler(e,"to")}}/></th>
        <th><input type="text" value={data.daysOff} onChange={(e)=>{onChangeHandler(e,"daysOff")}}/></th>
        <th className='addExperience redOrYellowButton' onClick={()=>{
                defaultData();
                props.addNewVacation(data);
            }}><div><FontAwesomeIcon className='fa-l' icon={faAdd}/></div></th>
    </tr> );
}
 
export default NewVacationInput;