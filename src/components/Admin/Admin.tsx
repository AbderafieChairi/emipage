import React, { useState } from 'react'
import { db } from '../../config/fireabase'
import { DocumentData, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import "./Admin.css"
import useLocalStorage from '../../hooks/useLocalStorage'

export default function Admin() {
    const [url, setUrl] = useLocalStorage('url',[])
    const [displayUrl, setDisplayUrl] = useLocalStorage('display-url',[])
    const [list, setList] = useState<string[]>(['project','users','Achievements','sponsor'])

    const addurl=(id:string,name:string)=>{
        setUrl([...url,id])
        setDisplayUrl([...displayUrl,name])
    }
    const backurl=()=>{
        setUrl(url.filter((i:any,k:any)=>k!=url.length-1))
        setDisplayUrl(url.filter((i:any,k:any)=>k!=url.length-1))
    }

    return (
        <div>
            <h1  style={{ textAlign: 'center', margin:60 }}>Admin</h1>

            <div className='admin-table'>
                {url.length>0&&<div className='admin-table-header'> {displayUrl.join(' / ')}</div>}
                {url.length===0&&<div className='admin-table-header'> Admin Table</div>}
                <div className='admin-table-main'>
                    <div className='admin-table-row' onClick={backurl}>..</div>
                    {url.length%2===1&&url.length>0?
                        <FireCollection url={url} addurl={addurl}/>:

                        <FireDoc url={url} addurl={addurl}/>
                    }
                    {url.length===0&&
                    <div>
                        {list.map((item, index) => (
                            <div className='admin-table-row' key={index} onClick={() => {addurl(item,item)}}>{item}</div>
                        ))}
                    </div>
                    }
                </div>
            </div>


        </div>
    )
}
function FireCollection(props:any){
    const [data, setData] = useState<DocumentData[]>([])
    const extractDocs = ()=>{
        getDocs(collection(db,props.url.join("/"))).then((snapshot)=>{
            setData(snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})))
        })
    }
    React.useEffect(()=>{
        
        extractDocs()
    },[props.url])
    return <div>
        {
            data.map((item: any,index:any)=>(
                <div key={index} className='admin-table-row' onClick={()=>props.addurl(item.id,item.row_name)}>{item.row_name}</div>))
        }
    </div>
}




function FireDoc(props: any) {
    const [data, setData] = useState<DocumentData>({})
    const [showEdit, setShowEdit] = useState(false)
    const [key, setKey] = useState("")
    const [value, setValue] = useState(null)
    const [position, setPosition] = useState({x:0,y:0})
    const extractDoc = ()=>{
        getDoc(doc(db,"/"+props.url.join("/"))).then((snapshot)=>{
            setData(({id:snapshot.id,...snapshot.data()}))
        })
    }  
    const convert =(a : DocumentData)=>{
        const b=[]
        for (let i in a){
            b.push([i,a[i]])
        }
        return b
    }
    React.useEffect(()=>{
        extractDoc()
    },[props.url])
    const update=(value:any)=>{
        const d= data
        delete data.id
        setDoc(doc(db,"/"+props.url.join("/")),
        {...data,[key]:value}
        )
        .then(()=>{
            setShowEdit(false)
            extractDoc()
        })
    }
    return (
        <div style={{padding:'10px'}}>
            {data.has_collection&&<div className='admin-table-row' onClick={()=>(props.addurl('collection',data.row_name))}>details</div>}
            {
                convert(data)
                .filter(i=>!['row_name','id','has_collection'].includes(i[0]))
                .map((item: any,index:any)=>(
                <div key={index} className='admin-table-row-info' ><b> {item[0]} :</b>{item[1]} <b className='edit'
                    onClick={e=>{
                        setShowEdit(true)
                        setKey(item[0])
                        setValue(item[1])
                        setPosition({x:e.clientX,y:e.clientY})
                    }}
                >edit</b></div>
                ))
            }
            {showEdit&&<Edit 
                value={value} 
                key_={key} 
                position={position} 
                setValue={setValue} 
                setShowEdit={setShowEdit}
                update={update}

                />}
        </div>
    )
}


function Edit(props:any){
    const [value, setValue] = useState(props.value)
    const update=()=>{
        props.update(value)
    }
    return (
        <div className='edit-div' style={{top:props.position.y,left:props.position.x}}>
            <div style={{margin:"7px"}}>{props.key_}</div>
            <input type='text' value={value} onChange={e=>setValue(e.target.value)} style={{padding:"5px",minWidth:"300px",borderRadius:3}}/>
            <div className='admin-btns-group'> 
                <button onClick={update}> Mettre à jour</button>
                <button onClick={()=>props.setShowEdit(false)}> Annuler</button>
            </div>

        </div>
    )
}
