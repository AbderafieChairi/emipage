import React, { useState } from 'react'
import "./Achievements.css"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/fireabase'
export default function Achievements() {
    const [data, setData] = useState<any[]>([])
    React.useEffect(()=>{
        getDocs(collection(db,'/project'))
        .then((snapshot)=>{
            setData(snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})).filter(i=>!("type" in i)))
        })
    },[])
  return (
    <div>
        <h1 style={{textAlign:'center',margin:60}}>Achievements</h1>

    <div className="ach-container">
    <div>
    </div>
        <div className="achs">
            {
                data.map((item, index) => (
                    <div className="ach" key={index}>
                        <div className="ach-side">
                            <div className="ach-row">
                                <div>{item.date}</div>
                                <div className="timeline">
                                    <div className="cercle"></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                        <div className="ach-cont">
                            <div className="ach-h">
                                {item.title}
                            </div>
                            <div className="ach-txt">
                                {item.details}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
</div>
</div>

  )
}
