import React,{ useState } from "react";
import Json from "./test"
function Sub(){
    const [title, setTitle] = useState([""]);
    const [content, setContent] = useState([""]);
    function Change(event){

        setTitle(event.target.value);
    }
    function ChangeContent(event){

        setContent(event.target.value);
    }
function data(event){
    console.log(title);
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    fetch('http://localhost:4000/compose', {
        method: 'POST',
        body: data,
      });
}
    return(
       <form onSubmit={data}>
           <div>
               <label>title</label>
               <input type="text"  name="postTitle" value={title} onChange={Change}/>
               <br></br>
               <label>Content</label>
               <input type="text" name="postBody" value={content} onChange={ChangeContent}/>
               <br></br>
               <label >File</label>
               <input type="file" name="image" />
               <button type="submit">Submit</button>
           </div>
       </form> 
    )
}

export default Sub;