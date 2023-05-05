import React, { useState } from 'react'
import { db, storage } from '../../config/fireabase'
import { DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, setDoc, where } from 'firebase/firestore'
import "./Admin.css"
import useLocalStorage from '../../hooks/useLocalStorage'
import { deleteObject, getDownloadURL, listAll, ref } from 'firebase/storage'
import ImageUploader from './imageUploader'
import { relative } from 'path'

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
    const [form, setForm] = useState<any>([])
    const [initForm, setInitForm] = useState<any>([])
    const [showForm, setShowForm] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [position, setMousePos] = useState({});
    const handleMouseMove = (event:any) => {
        setMousePos({ x: event.clientX, y: event.clientY });
      };

    const extractDocs = ()=>{
        getDocs(collection(db,props.url.join("/"))).then((snapshot)=>{
            setData(snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})).filter(i=>!("type" in i)))
        })
        getDocs(query(collection(db,props.url.join("/")), where("type", "==", 'form'),limit(1)))
        .then(s=>{
            const e :string[]= s.docs[0].data()['form']
            const r :any= {}
            for (let i in e){
                r[e[i]]=""
            }
            setForm(r)
            setInitForm(r)
        })
    }
    React.useEffect(()=>{
        extractDocs()
    },[props.url])
    return (
        <div onMouseMove={handleMouseMove}>
            {
                data.map((item: any,index:any)=>(
                    <div key={index} className='admin-table-row-container'>
                    <div className='center' style={{width:30}}><span className="material-icons-outlined touchable">delete</span></div>
                    <div key={index} className='admin-table-row' onClick={()=>props.addurl(item.id,item.row_name)}>{item.row_name}</div>
                    </div>
                    ))
            }
            <div>
                {!showForm&&<div className='center'>
                    <span className="touchable add" onClick={()=>{console.log("show form",form);setShowForm(true)}}>
                        add</span>
                </div>}
                <div style={{paddingLeft:80}} >
                    {showForm&&(
                        <div>
                            {Object.keys(form).map((item,index)=>(
                                <div key={index}>
                                    <div style={{margin:7}}>{item}</div>
                                    <div>
                                    {
                                        item==="imgsrc"?
                                        <div  style={{position:'relative'}}>
                                            {showImage&&<ImageEdit update={(value:any)=>{
                                                setForm((f:any)=>({...f,[item]:value}))
                                                setShowImage(false)
                                                }}
                                                position={position}
                                                setShowImageEdit={setShowImage}
                                            />}
                                            <div className='submit' style={{width:"max-content"}}
                                            onClick={(e)=>{
                                                setShowImage(true)
                                                }}>
                                                {form[item]===""?"select from gallery":"change image"}
                                            </div>

                                        </div>:
                                        item==="details"?
                                        <div>
                                            <textarea value={form[item]} onChange={e=>{
                                            setForm((f:any)=>({...f,[item]:e.target.value}))
                                        }}/>
                                        </div>:
                                        <input value={form[item]} onChange={e=>{
                                            setForm((f:any)=>({...f,[item]:e.target.value}))
                                        }}/>
                                    }
                                    </div>
                                </div>
                            ))}
                            <button className='submit' onClick={()=>{
                                setLoading(true)
                                addDoc(collection(db,props.url.join("/")),form)
                                .then(()=>{
                                    setForm(initForm);
                                    setLoading(false)
                                    extractDocs()
                                    setShowForm(false)

                                })
                            }}>{loading?"Loading":"Submit"}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}









function FireDoc(props: any) {
    const [data, setData] = useState<DocumentData>({})
    const [showEdit, setShowEdit] = useState(false)
    const [showImageEdit, setShowImageEdit] = useState(false)
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
            setShowImageEdit(false)
            extractDoc()
        })
    }
    const edit=(e:any,item:any)=>{
        if (item[0]==="imgsrc") setShowImageEdit(true)
        else {console.log("show edit");setShowEdit(true)}
        setKey(item[0])
        setValue(item[1])
        setPosition({x:e.clientX,y:e.clientY})
    }
    return (
        <div style={{padding:'10px'}}>

            {data.has_collection&&<div className='admin-table-row' onClick={()=>(props.addurl('collection',data.row_name))}>details</div>}
            {
                convert(data)
                .filter(i=>!['row_name','id','has_collection'].includes(i[0]))
                .map((item: any,index:any)=>(
                <div key={index} className='admin-table-row-info' >
                    <div>
                        <span className="material-icons-outlined touchable" onClick={(e)=>edit(e,item)}>edit</span>
                    </div>
                    <div className='key'>{item[0]}</div>
                    <div className='value'>{item[1]}</div>
                </div>
                ))
            }
            {showEdit&&<Edit 
                value={value} 
                key_={key} 
                position={position} 
                update={update}
                setShowEdit={setShowEdit}
                />}
            {showImageEdit&&<ImageEdit 
                value={value} 
                key_={key}
                setKey={setKey} 
                position={position} 
                update={update}
                setShowImageEdit={setShowImageEdit}
                />}

        </div>
    )
}


function Edit(props:any){
    const [value, setValue] = useState(props.value)
    const update=()=>{
        props.update(value)
    }
    React.useEffect(()=>{
        console.log("edit")

    },[])
    return (
        <div style={{position:'relative'}}>
        <div className='edit-div' >
            <div style={{margin:"7px"}}>{props.key_}</div>
            <input type='text' value={value} onChange={e=>setValue(e.target.value)} style={{padding:"5px",minWidth:"300px",borderRadius:3}}/>
            <div className='admin-btns-group'> 
                <button onClick={update}> Mettre à jour</button>
                <button onClick={()=>props.setShowEdit(false)}> Annuler</button>
            </div>

        </div>
        </div>
    )
}


function ImageEdit(props:any){
    const [value, setValue] = useState("")
    const [imgUrls, setImgUrls] = useState<any[]>([])
    const [nbr, setNbr] = useState(0)
    const update=()=>{
        props.update(value)
        setValue("")

    } 
    const extract=()=>{
        setImgUrls([])
        const listRef = ref(storage, '/images');
        console.log(value);
        listAll(listRef).then((res)=>{
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                    setImgUrls(prev=>[...prev,{url:url,name:itemRef.name,ref:itemRef}])
                })
              });
        })
    }
    const deleteImage=(ref_:any)=>{
        console.log("delete")
        deleteObject(ref_)
        .then(()=>{
            extract()
        })
    }



    React.useEffect(()=>{
        extract()
    },[nbr]) 
    return (
        <div style={{position:'relative'}}>
        
        <div className='edit-div'>
            <div >
                <div style={{margin:"7px"}}>Select an image :</div>
                <div className='admin-imgs'>
                    {
                    imgUrls.sort((a:any,b:any)=>a.name.localeCompare(b.name)).map((item,index)=>(
                        <div key={index} className='admin-img-container' style={{backgroundColor:item.url===value?"#ddd":"white",position:'relative'}} onClick={()=>{
                            setValue(item.url)
                        }}>
                            <div>
                                {/* //add delete icon */}
                                <div className='delete-icon'>
                                    <span className="material-icons-outlined touchable" onClick={()=>deleteImage(item.ref)}>delete</span>
                                </div>
                            </div>
                            <img src={item.url} alt="" height="100px" width="100px"/>
                            <div >{item.name}</div>
                        </div>
                    ))
                    }
                    <div>
                        <ImageUploader 
                            setNbr={setNbr}
                        />
                    </div>
                </div>
                <div className='admin-btns-group'> 
                    <button onClick={update}> Mettre à jour</button>
                    <button onClick={()=>{props.setShowImageEdit(false);setValue("")}}> Annuler</button>
                </div>
            </div>

        </div>
        </div>
    )
}