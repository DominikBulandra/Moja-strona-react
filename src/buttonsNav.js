import React, { useState } from "react";
import { useSelector} from 'react-redux'
export const ButtonsComponent=()=>{
  
    const count2 = useSelector(state => state.allposts.statPostState)
    var div;
    console.log(count2);
    div =count2.map(function(item, i){
        
        //console.log({item});
        //console.log(this.props.images);
        // return <li className="list-group-item list-group-item-action" key={i}><div className="row"><div className="col-md"></div><div className="col-md">{item.title}</div><div className="col-md">{item.text}</div></div></li>
        return <button id={item.id}  title={item.title} text={item.text} color={item.color}>{item.title}</button>
      
      }, this)
    return (
       <div> {div}</div>
         
    )
} 
