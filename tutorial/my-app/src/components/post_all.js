
import React , {useState,useEffect} from "react";
import {Link} from 'react-router-dom';
//import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
//props and map fucntion
function posts(post){
return <div>
  <h5>
    <Link to={`/posts/${post._id}`}>{post.title}</Link>  
    </h5>
</div>
}


function Items() {
  const [loaded , setload] = useState([]);
  const [isloading , setisloading] = useState(false);
  useEffect(() => {
  const fetchposts = async () => {
    setisloading(true);
    const response = await fetch('http://localhost:4000');
    const responseData = await response.json();
    
    
    setload(responseData.posts);
    
    setisloading(false);

  };
  fetchposts();
},[])
console.log(loaded[0])
 
return (
    <div className="App">
    {loaded.map(posts)}
    </div>
  );
}

export default Items;
