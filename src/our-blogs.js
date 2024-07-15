import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Nav2 from "./nav2";
import Footer from "./footer";


export default function Blog2() {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('https://live-server-bh9y.onrender.com/api/posts'); 
        console.log('API response:', response.data); 
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };
  const baseURL = process.env.REACT_APP_BASE_URL;
  const showPosts = posts && posts
  .filter(post => post.active) 
    .map((ele, index) => {
      const url = ele.img;
      const slug = generateSlug(ele.title);
      return (
        <div key={index} className="col-sm-6 col-md-4 blog-box-main">
          <div className="blog-box">
            <div className="blog-box-img w-100">
            <img src={url} alt={ele.title} />
            </div>
            <div className="blog-box-con">
              <small>{ele.date.slice(0, 10)} | Blog</small>
              <h5>{ele.title}</h5>
              <p></p>
              <div className="viewmore">
              <Link to={`/blogs/${slug}`} style={{color: "red"}}>Read More</Link>
              </div>
            </div>
          </div>
        </div>
       
      );
    });

  return (
    <div className="AboutUs">
      <Navbar />
      <Nav2 />
      <div className="w-100 insiadebanner padding">
        <div className="heading">
          <h1 >Blogs</h1>
        </div>
      </div>
      <div className="w-100 float-left bg-inside padding">
        <div className="container">
          <div className="row no-gutters inside-blog">
            {showPosts}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
