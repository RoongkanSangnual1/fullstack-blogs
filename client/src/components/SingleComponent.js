import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import Parser from  "html-react-parser";
const SingleComponent = () => {
  const { slug } = useParams(); // เข้าถึงค่า slug จาก URL

  const [blog, setBlog] = useState({
    title: '',
    content: '',
    author: '',
    createdAt: ''
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((response) => {
        setBlog(response.data);
        
      })
      .catch((err) => {
        alert(err);
      });
      // eslint-disable-next-line 
  },[]);
   

  return (
        <div className='container p-5'>
            <NavbarComponent/>
          <h1>{blog.title}</h1>
          <div>{Parser(blog.content)}</div>
          <p className='text-muted'>ผู้แต่ง:{blog.author} เวลา: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
      ) 
  }

export default SingleComponent;
