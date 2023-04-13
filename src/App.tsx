import React from "react";
import "./App.css";
import logo from "./logo.png"
export default function App() {
  return (
<div>
<div id="particle-canvas">


            <div 
            style={{zIndex: 30}}
            >
                <div className="mytest">
                    <div
                    style={{zIndex: 30,display: "flex",flexDirection: "row",gap: "15px",flexWrap: "wrap"
                    }}
                    >
                        <div className="link-head" >About Us</div>
                        <div className="link-head" >Achievements</div>
                        <div className="link-head" >Our Comunity</div>
                        <div className="link-head" >Skills</div>
                        <div className="link-head" >Club Projects</div>
                    </div>
                    <img src={logo} height="300" width="300" alt="logo"/>
                    <div>
                        <div className="Emicatronic">
                            EMICATR
                        </div>
                        <span className="material-icons settings">
                            settings
                            </span>
                        <div className="Emicatronic">
                            NIC
                        </div>                
                    </div>
                </div>
            </div>
    </div>
</div>
  );
}
