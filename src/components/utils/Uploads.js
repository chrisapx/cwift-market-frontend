import Compressor from "compressorjs";
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import { app } from "../../../Firebase";

export const uploadImage = async ({ imageUpload }) =>  {
    
    const [ compressedFile, setCompressedFile ] = useState();
    const storage = getStorage(app);
    
    if (imageUpload == null) return;

    new Compressor(imageUpload, {
        quality: 0.6,
        success: (compressedResult) => {        
        setCompressedFile(compressedResult)
        },
    });

    const imageRef = ref(storage, `item-images/${compressedFile.name + v4()}`);  
    uploadBytes(imageRef, compressedFile).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
            setUrl (url);
        });
    });
    return url;
};