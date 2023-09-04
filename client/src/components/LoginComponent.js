import NavbarComponent from "./NavbarComponent";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import { authenticate } from "./services/authorize";
import axios from "axios";
import { getUser } from "./services/authorize";
import { useNavigate } from "react-router-dom";

const LoginComponent =()=>{
    const [state,setState] = useState({
        username:``,
        password:``
    })
    const {username,password} = state
    const navigate = useNavigate();
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
    .then(response=>{
        authenticate(response,()=>navigate(`/create`))
    })
    .catch(err=>{
        Swal.fire(
        'ERROR!',
        err.response.data.error,
        'error'
      )

    }   )  }
    useEffect(()=>{
        getUser() && navigate(`/`)


    },[])
    return(
        <div className ="container p-5" >
        <NavbarComponent/>
        <h1 >
            Login
        </h1>
        <form onSubmit={submitForm}> 
            <div className="form-group">
                <label>Username</label>
                 <input type="text" className="form-control" value={username} onChange={inputValue(`username`)}></input>   
            <div className="form-group">
                <label>password</label>
                <input type="password" className="form-control" value={password} onChange={inputValue(`password`)}></input>
                </div>
                <br/>
                <input type="submit" value="บันทึก" className="btn btn-primary"></input>

            </div>
        </form>
    </div>
    )

}


export default (LoginComponent);