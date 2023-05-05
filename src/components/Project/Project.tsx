import React, { useState } from 'react'
import "./Project.css"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/fireabase'


interface project{
    id:string,
    title:string,
    imgsrc:string,
    tag:string,
    details:string,
    date:string
} 
export default function Projects() {
    const [data,setData] = useState<any[]>([])
    React.useEffect(()=>{
        getDocs(collection(db,'/project'))
        .then((snapshot)=>{
            setData(snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})).filter(i=>!("type" in i)) )
        })
    },[])
  return (
    <div>
        <h1 style={{textAlign:'center',margin:60}}>Our Projects</h1>
        
        <div className="prj-list">
            {data.map((item, index) => (
                <Project key={index} data={item} />
            ))}
        </div> 
    </div>

  )
}




function Project(props: { data: project}) {
    const [hasDetails, setHasDetails] = useState(false)
  return (
    <div className="prj-container">
       {hasDetails?
       <div className="prj-detail-container">
            <div className="">{props.data.details}</div>
            <div className="prj-more prj-touchable"  onClick={()=>setHasDetails(false)}>
                Read Less ...
            </div>
       </div>:
        <div className="">
 
        <div className="prj-img">
            <img src={props.data.imgsrc} alt={props.data.title} />
        </div>
        <div className="prj-detail">
            <div>
                <span className="material-icons" style={{color:"#06A3DA"}}>
                    event
                </span>
                <div>{props.data.date}</div>
            </div>
        </div>
        <div className="prj-info">
            <div className="prj-title">
                {props.data.title}
            </div>
            <div style={{height:100}}>
                <p>{props.data.details.slice(0,100)}...</p>
            </div>
            <div className="prj-more prj-touchable" onClick={()=>setHasDetails(true)}>
                Read More ...
            </div>
        </div>            
        </div>
       }

</div>
  )
}
