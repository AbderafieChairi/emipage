import React from 'react'
import "./Members.css"
import portrait from '../../portrait.png'
export default function Members() {
  return (
    <div>
    <h1 style={{textAlign:'center',marginTop:70}}>Our Comunity for test</h1>
        <div className="mem-list">
            <Member/>
            <Member/>
            <Member/>
            <Member/>
            <Member/>
            <Member/>
            <Member/> 
            <Member/>
        </div>
    </div>
  )
}

const Member=(props:any)=>{
    return(
    <div className="mem-cont" >
        <div className="mem-h">
            <div className="mem-img">
                <img src={portrait} height="80" width="80" />
            </div>
            <div style={{padding:10}}>
                <div style={{fontWeight: "bold",color: "#091E3E"}}>
                    Abderafie
                </div>
                <div className="job">Profession
                </div>
            </div>
        </div>
        <div className="hr" color="black"></div>
    </div>
    )
}
