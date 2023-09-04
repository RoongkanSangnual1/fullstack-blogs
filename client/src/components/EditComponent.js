import {useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const EditComponent =()=>
{
    
    const [state,setState] = useState({
        title:``,
        author:``,
    })
    const {title,author} = state
    const {slug} = useParams()
    const [content,setContent] = useState(``)

    
  useEffect(() => {

    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((response) => {
        const {title,content,author,slug} = response.data
        setState({...state,title,author,slug})
        setContent(content)
      })
      .catch((err) => {
        alert(err);
      });
      // eslint-disable-next-line 
  },[]);


   const showEditFrom=()=>(
    <form onSubmit={submitForm}> 
    <div className="form-group">
        <label>ชือบทความ</label>
         <input type="text" className="form-control" value={title} onChange={inputValue(`title`)}></input>
         <div className="form-group">
         <label>รายละเอียด</label>
        <ReactQuill className="form-control" value={content} onChange={subContent}></ReactQuill>
        </div>   
    <div className="form-group">
        <label>ผู้แต่ง</label>
        <input type="text" className="form-control" value={author} onChange={inputValue(`author`)}></input>
        </div>
        <br/>
        <input type="submit" value="update" className="btn btn-primary"></input>

    </div>
</form>


   )
    const inputValue=name=>event=>{                     
        setState({...state,[name]:event.target.value})
    }
    const subContent=(evevt)=>{
        setContent(evevt)
    }

    const submitForm=(e)=>{
        e.preventDefault();
        console.log(process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author})
        .then(response=>{
            Swal.fire(
                'Save!',
                'Save!',
                'success'
              )
              const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
    

              
        })
        .catch(err=>{

            alert(`${slug}`)
    
        }
        )
    }


    
    return(
        <div className ="container p-5" >
            <NavbarComponent/>
            <h1 >
                แก้ไขบทความ
            
            </h1>
           {showEditFrom()}
        </div>
    )
}
export default EditComponent;