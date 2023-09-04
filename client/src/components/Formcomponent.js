import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2"
import { getUser } from "./services/authorize";
const FormComponent =()=>
{
    
    const [state,setState] = useState({
        title:``,
        author:getUser()
    })
    const {title,author} = state
    const [content,setContent] = useState(``)


    const inputValue=name=>event=>{                     
        setState({...state,[name]:event.target.value})
    }
    const subContent =(event)=>{
        setContent(event)
    }


    const submitForm=(e)=>{
        e.preventDefault();
        console.log(process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/create`,{title,content,author})
        .then(response=>{
            Swal.fire(
                'Save!',
                'Save!',
                'success'
              )
              setState({...state,title:'',content:'',author:''})
        })
        .catch(err=>{
            Swal.fire(
            'ERROR!',
            err.response.data.error,
            'error'
          )

        }
        )
    }
    return(
        <div className ="container p-5" >
            <NavbarComponent/>
            <h1 >
                เขียนบทความ
            </h1>
            <form onSubmit={submitForm}> 
                <div className="form-group">
                    <label>ชือบทความ</label>
                     <input type="text" className="form-control" value={title} onChange={inputValue(`title`)}></input>
                     <div className="form-group">
                     <label>รายละเอียด</label>
                    <ReactQuill theme="snow"  value={content} onChange={subContent} />
                    </div>   
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue(`author`)}></input>
                    </div>
                    <br/>
                    <input type="submit" value="บันทึก" className="btn btn-primary"></input>

                </div>
            </form>
        </div>
    )
}
export default FormComponent;