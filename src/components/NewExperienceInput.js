import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

const NewExperienceInput = (props) => {

    const [data,setData] = useState({
        companyName: "",
        startDate: "",
        endDate: ""
    });

    const defaultData = ()=>{
        setData({
            companyName: "",
            startDate: "",
            endDate: ""
        });
    }

    const onChangeHandler = (e, variable)=>{
        setData({...data,[variable]: e.target.value});
    }

    return ( <tr>
        <th><input type="text" value={data.companyName} onChange={(e)=>{onChangeHandler(e,"companyName")}}/></th>
        <th><input type="date" value={data.startDate} onChange={(e)=>{onChangeHandler(e,"startDate")}}/></th>
        <th><input type="date" value={data.endDate} onChange={(e)=>{onChangeHandler(e,"endDate")}}/></th>
        <th className='addExperience redOrYellowButton' onClick={()=>{
                defaultData();
                props.addNewExperience(data);
            }}><div><FontAwesomeIcon className='fa-l' icon={faAdd}/></div></th>
    </tr> );
}
 
export default NewExperienceInput;