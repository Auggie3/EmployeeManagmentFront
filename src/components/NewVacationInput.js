import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

export function getBusinessDatesCount(start, end) {
    let count = 0;
    const curDate = new Date(start);
    const endDate = new Date(end);
    while (curDate < endDate) {
        const dayOfWeek = curDate.getDay();
        if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }

    return count;
}

const NewVacationInput = (props) => {

    const [data,setData] = useState({
        from: "",
        to: ""
    });

    const defaultData = (reset)=>{
        if(reset){
            setData({
                from: "",
                to: ""
            });
        }
    }

    const onChangeHandler = (e, variable)=>{
        setData({...data,[variable]: e.target.value});
    }



    return ( <tr>
        <th><input type="date" value={data.from} onChange={(e)=>{onChangeHandler(e,"from")}}/></th>
        <th><input type="date" value={data.to} onChange={(e)=>{onChangeHandler(e,"to")}}/></th>
        <th>{
            data.from && data.to?(getBusinessDatesCount(data.from, data.to)):<></>
        }</th>
        <th className='addExperience redOrYellowButton' onClick={()=>{
                props.addNewVacation(data, defaultData);
            }}><div><FontAwesomeIcon className='fa-l' icon={faAdd}/></div></th>
    </tr> );
}
 
export default NewVacationInput;