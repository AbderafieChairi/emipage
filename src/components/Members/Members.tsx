import React, { useState } from 'react'
import "./Members.css"
import portrait from '../../portrait.png'
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/fireabase';
export default function Members() {
    const [members, setMembers] = useState<DocumentData[]>([]);
    React.useEffect(()=>{
        getDocs(collection(db,'/users'))
        .then((snapshot)=>{
            setMembers(snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})).filter(i=>!("type" in i)))
        })
    },[])
    return (
      <div>
        <h1 style={{ textAlign: 'center', margin:60 }}>
          Our Community
        </h1>
        <div className="mem-list">
          {members.map((member, index) => (
            <Member key={index}  data={member}/>
          ))}
        </div>
      </div>
    );
  }
  

  const Member = ({ data, any }: any) => {
    return (
      <div className="mem-cont">
        <div className="mem-h">
          <div className="mem-img">
            <img src={data.imgsrc} height="80" width="80" alt="portrait" />
          </div>
          <div style={{ padding: 10 }}>
            <div style={{ fontWeight: "bold", color: "#091E3E" }}>{data.name}</div>
            <div className="job">{data.profession}</div>
          </div>
        </div>
        <div className="hr" color="black"></div>
      </div>
    );
  };
