import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { storage, db } from './firebase'
import firebase from 'firebase'
import './Imageupload.css'

function ImageUpload({ username }) {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0);
    // const [url,setUrl]=useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                // error function
                console.log(error);
                alert(error.message)
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            captions: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage("");
                    })
            }
        )
    }
    return (
        <div className='imageUpload'>


            <progress className='imageUpload__progress' value={progress} max='100' />
            {/* caption input*/}
            <input type='text'
                placeholder='Enter a Caption'
                value={caption}
                onChange={event => setCaption(event.target.value)}
            />
            {/* File input*/}
            <input type='file' onChange={handleChange} />
            {/* post button*/}
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
