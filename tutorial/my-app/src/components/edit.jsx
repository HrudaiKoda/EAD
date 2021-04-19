import React ,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
function Single(va){
    const [board, setItem] = useState([]);
    const [isloading , setisloading] = useState(false);
    const ty = va;
    useEffect(() => {
    const fetchItem = async () => {
        setisloading(true);
        const fetchItem = await fetch(`http://localhost:4000/view/${ty}`);
        const pre = await fetchItem.json()
        const temp = [];
        temp.push(pre.one);
        setItem(temp);
            
    setisloading(false);
       
    }
    fetchItem();
    
},[])

    return(board)
}

function Change(eve){
    const va = eve.match.params.id;
    const b = Single(va);
    var one = "";
    var two = "";
    var three = "";
    if(b.length !==0){
        one = b[0].title;
        two = b[0].content;
        var len = Object.keys(b[0]);
        if(len.length !== 4){
            three = b[0].img.path;
        }
    }
    const [title, setTitle] = useState([""]);
    const [content, setContent] = useState([""]);
    const [path, setpath] = useState([""]);
    useEffect(() => {
        setTitle(one);
        setContent(two);
        setpath(three);
    },[one,two])




    console.log(title);
    function test(event){
        setTitle(event.target.value);
    }
    function testp(event){
        setContent(event.target.value);
    }
    return(
        <form onSubmit={demo}>
        <div>
            <label>title</label>
            <input type="text"  name="postTitle" value={title} onChange={test}/>
            <br></br>
            <label>Content</label>
            <input type="text" name="postBody" value={content} onChange={testp}/>
            <br></br>
            <button type="submit">Submit</button>
        </div>
    </form> 
    )
    
}

function demo(event){
    const data = new FormData(event.target);
    console.log(data);
    event.preventDefault();
}


export default Change;