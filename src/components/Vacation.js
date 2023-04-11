import React from 'react'

const Vacation = (props) => {
    const {employeeId, from, to, daysOff} = props.vacation;

    return ( <>
        <th>{from}</th>
        <th>{to}</th>
        <th>{daysOff}</th>
    </> );
}
 
export default Vacation;