import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/fireabase";
import "./Admin.css"
function ImageUploader(props:any) {
    // State to store uploaded file
    const [file, setFile] = useState<any>();
    const [fileName, setFileName] = useState("");
    const [loading, setloading] = useState(false)
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handle file upload event and update state
    function handleChange(event:any) {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/images/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
        setloading(true)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                setloading(false);
                setFileName("")
                setPercent(0)
                props.setNbr((n:any)=>n+1)
                // // download url
                // getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                //     console.log(url);
                // });
            }
        );
    };
 
    return (
        <div className="admin-img-add">
            {loading?
            <div>
                loading ...
            </div>:<>
                {percent===0&&<label htmlFor="inp">{fileName===""?"Select...":fileName}</label>}
                <input id="inp" name="inp" type="file" onChange={handleChange} accept="/image/*" style={{display:"none"}}/>
                {fileName!==""&&<button onClick={handleUpload} className="admin-img-add-button">Add</button>}            
            </>}
        </div>
    );
}
 
export default ImageUploader;