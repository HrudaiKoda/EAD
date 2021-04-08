import React ,{useState,useEffect} from "react";


function Single(a){
    useEffect(() => {
        fetchItem();
        
    },[]);

    const [item, setItem] = useState([""]);
    var pre = "";
    var io = [];
    const fetchItem = async () => {
        const va = a.match.params.id;
        const fetchItem = await fetch(`http://localhost:4000/view/${va}`);
        pre = await fetchItem.json();
        setItem(pre.one);
    }
    return(

    <div className="App">

    </div>)
}

export default Single;
