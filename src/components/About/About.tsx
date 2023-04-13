import React from 'react'
import './About.css'
import img from '../../3d.png'
export default function About() {
  return (
    <div>
    <h1 style={{textAlign:'center'}}>About Us</h1>
    <div className="about-row" style={{padding:20}}>
        <div  style={{padding:20,flex:2}}>
            <p  style={{fontSize: "larger",color: "rgb(90, 88, 88)"}}
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aliquam distinctio, possimus consequuntur, mollitia sapiente error veritatis temporibus quidem illo ex non. Nam culpa nulla, sed natus placeat ullam. Voluptate.</p>
            <div className='styl'>
                <div className="row">
                    <span className="material-icons mi">done</span>
                    <div>Valeurs</div>
                </div>
                <div className="row">
                    <span className="material-icons mi">done</span>
                    <div>Valeurs</div>
                </div>
                <div className="row">
                    <span className="material-icons mi">done</span>
                    <div>Valeurs</div>
                </div>
                <div className="row">
                    <span className="material-icons mi">done</span>
                    <div>Valeurs</div>
                </div>
            </div>
        </div>
        <div style={{flex:1}}>
            <img src={img} style={{
              width: "100%",
              margin: "10px",
              minWidth: "400px",
              }}/>
        </div>
    </div> 
    </div>
  )
}
