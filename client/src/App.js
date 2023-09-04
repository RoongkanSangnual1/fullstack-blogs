import axios from 'axios';
import './App.css';
import NavbarComponent from './components/NavbarComponent';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Parser from  "html-react-parser";
import { getUser } from './components/services/authorize';

function App() {
  const [blog,setBlog] = useState([])

  const fetchdata=()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then((response=>{
      setBlog(response.data)
    })).catch(err=>{alert((err)) })
  }

  useEffect(()=>{
    fetchdata()
  },[])

  const DeleteOk =(slug)=>{
    Swal.fire({
      title:`Delete ?`,
      icon:`warning`,
      showCancelButton:true
    }).then(result=>{
      if(result.isConfirmed){

        DeleteBlog(slug)
      }

    })
  }

  const DeleteBlog =(slug)=>{
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`).then(response=>{
      Swal.fire(`Delete Ok`,response.data.message,`success`)
      fetchdata()
    }).catch(err=>console.log(err))
  }


  return (
    <div className ="container p-5">
      <NavbarComponent/>
      {blog.map((blogg,index)=>(
        <div className='row' key={index}>
          <div className='col pt-3 pb-2' style={{borderBottom:'1px solid silver'}}>
            <Link to={`/blog/${blogg.slug}`}>
            <h2>{blogg.title}</h2>
            </Link>
            <div>{Parser(blogg.content.substring(0,180))}</div>
            <p className='text-muted'>ผู้แต่ง:{blogg.author} เวลา: {new Date(blogg.createdAt).toLocaleString()}</p>
            {getUser()&& (
              <div>
            <Link to={`/blog/edit/${blogg.slug}`} className='btn btn-outline-success'>edit</Link>  &nbsp;
            <button className='btn btn-outline-danger' onClick={()=>DeleteOk(blogg.slug)}>Delete</button>
            </div>)
            }
            </div>
 
        </div>
      ))}
      

    </div>
  );
}

export default App;
