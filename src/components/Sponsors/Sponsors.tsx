import React from 'react'
import "./Sponsors.css"
import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/fireabase'
export default function Sponsors() {
    const [sponsors,setSponsors] = React.useState<DocumentData>([])
    React.useEffect(()=>{
        getDocs(collection(db,'/sponsor'))
        .then((snapshot)=>{
            setSponsors(snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})).filter(i=>!("type" in i)))
        })
    },[])
    return (
    <div>
        <h1 style={{textAlign:'center',margin:60}}>Our Sponsors</h1>
        <div className="spns-list">
            {sponsors.map((item:any, index:any) => (
                <Sponsor key={index} data={item} />
            ))}
        </div>
    </div>
    )
}

interface sponsor{
    id:string,
    name:string,
    imgsrc:string
}



function Sponsor({data: sponsor}: {data: sponsor}) {
    return(
        <div className='spns-container'>
            <img src={sponsor.imgsrc} alt={sponsor.name} />
            <div>{sponsor.name}</div>
        </div>
    )
}
 