import React, { useState } from 'react'
import "./Members.css"
import portrait from '../../portrait.png'
export default function Members() {
    const [members, setMembers] = useState([
        {
            name: "Chairi Ahmed",
            profession: "Developer"
        },
        {
            name: "Jane Doe",
            profession: "Designer"
        },
        {
            name: "John Doe",
            profession: "Developer"
        },
        {
            name: "Jane Doe",
            profession: "Designer"
        },
    ]);
    React.useEffect(()=>{
        setMembers(m=>m)
    },[])
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginTop: 70 }}>
          Our Community for test
        </h1>
        <div className="mem-list">
          {members.map((member, index) => (
            <Member key={index}  name={member.name} profession={member.profession}/>
          ))}
        </div>
      </div>
    );
  }
  

  const Member = ({ name, profession }: { name: string, profession: string }) => {
    return (
      <div className="mem-cont">
        <div className="mem-h">
          <div className="mem-img">
            <img src={portrait} height="80" width="80" alt="portrait" />
          </div>
          <div style={{ padding: 10 }}>
            <div style={{ fontWeight: "bold", color: "#091E3E" }}>{name}</div>
            <div className="job">{profession}</div>
          </div>
        </div>
        <div className="hr" color="black"></div>
      </div>
    );
  };
