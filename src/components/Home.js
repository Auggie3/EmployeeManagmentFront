import { fa0, faAdd, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Employee from './Employee';
import "../css/Home.scss"


const Home = (props) => {

    const [data, setData] = useState([]);
    // const {customData, setCustomData} = useCustomHook();
    const [search, setSearch] = useState("");

    const getData = ()=>{
        axios.get("/api/employee")
        .then(response => {
            setData(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getSearchData = (search)=>{
        axios.get("/api/employee/search", {params: {
                search: search
            }})
            .then(res=>{
                setData(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
    }

    useEffect(() => {
        getData();
    }, []);



    const searchHandler = (e)=>{

        if(e.target.value.length>0){
            setSearch(e.target.value);
            getSearchData(e.target.value);
        }else{
            getData();
        }
    }
//------------------------------------------------------------------------------

    const navigate = useNavigate();

    const addEmployee = ()=>{
        navigate("/add");
    }


//------------------------------------------------------------------------------


    return ( 
    <div className='home'>

        <h2 className={"employeesHeading"}>Employees:</h2>

        {/* data */}
        <input className={"search"} type={"text"} placeholder={"search"} onChange={(e)=>searchHandler(e)}/>
        {data?
        (
            <>

                {data.map((e,index)=>{
                    return <Employee e={e} key = {index}></Employee>
                })}
            </>
        ):
        (
            <></>
        )}

        {/* data */}

        <div className='addEmployee' onClick={addEmployee}><FontAwesomeIcon icon={faAdd}/>Add Employee</div>

    </div> );
}
 
export default Home;