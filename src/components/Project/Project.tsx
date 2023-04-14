import React, { useState } from 'react'
import "./Project.css"


interface project{
    id:string,
    title:string,
    img:string,
    tag:string,
    details:string,
    date:string
} 
export default function Projects() {
    const [data] = useState<project[]>([
        {
            id: "1",
            title: "Web Design",
            img: "https://www.digitaltrends.com/wp-content/uploads/2017/04/arduino_with_breadboard.jpg?fit=2365%2C1774&p=1",
            tag:"Web Design",
            date:'01/07/2022',
            details:"Lorem ipsum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. sLorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consecteum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. sLorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consecteum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. sLorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consecteum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. sLorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. "
        },
        {
            id: "2",
            title: "Web Design",
            img: "https://www.digitaltrends.com/wp-content/uploads/2017/04/arduino_with_breadboard.jpg?fit=2365%2C1774&p=1",
            tag:"Web Design",
            date:'03/07/2022',
            details:"sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. porro cupiditate enim quibusdam."
            
        }
    ])
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
        <div className="prj-tag">
        {props.data.title}
        </div>
        <div className="prj-img">
            <img src={props.data.img} alt={props.data.title} />
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
            <div>
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
