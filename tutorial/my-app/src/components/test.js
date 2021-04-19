import React ,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
function Single(a){
    const [board, setItem] = useState([]);
    const [isloading , setisloading] = useState(false);
    const va = a.match.params.id;
    useEffect(() => {
    const fetchItem = async () => {
        setisloading(true);
        const fetchItem = await fetch(`http://localhost:4000/view/${va}`);
        const pre = await fetchItem.json();
        const temp = [];
        temp.push(pre.one);
        setItem(temp);
            
    setisloading(false);
    }
    fetchItem();
        
},[])
console.log(board);
    return(
    <div className="App">
    {board.length !==0 &&(
        <div>
        {board.map(Print)}
        </div>
        
    )}
    </div>)
}

function Print(num){
    var len = Object.keys(num);
    console.log(num);
    return <div>
    <h1>{num.title}</h1>
    <h5>
    <Link to={`/posts/edit/${num._id}`}>Edit this blog</Link>  
    </h5>
    <h1>{num.content}</h1>
      {len.length !==4 &&(
        <div> 
        this has imaage
     </div>
    )}

    </div>
}

function Json(data){
    var len = Object.keys(data);
    console.log(len.length)
    return(data);

}

export default Single;
