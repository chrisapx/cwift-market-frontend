import { useState } from 'react'
import './AddItem.scss'
import { useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app,  } from '../../../Firebase';
import { v4 } from 'uuid';
import Compressor from 'compressorjs';


const AddItem = () => {

    const storage = getStorage(app);

    const [imageUpload, setImageUpload] = useState(null);
    const [ compressedFile, setCompressedFile] = useState();

    const [item, setItem] = useState({
        name: '', 
        qty: '',
        description: '',
        price: null,
        discount: null,
        freeDelivery: false,
        stockCount: null,
        brand: null,
        serialNumber: '',
        vendorID: null,
        category: null,
        details: null,
        photos: null,
        coverPhoto: null,
        ads: null,
        reviews: null
    });

    const updateItem = (property, value) => {
        setItem(prevItem => ({
          ...prevItem,
          [property]: value,
        }));
      };
    
    const updateAddress = (property, value) => {
    setUser(prevItem => ({
        ...prevItem,
        address: {
        ...prevUser.address,
        [property]: value,
        },
    }));
    };

    const uploadImage = async () =>  {
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
                console.log(url);
                alert(url);
                updateItem(coverPhoto, url)
            });
            });
      };

    const handleSubmit = () => {
        fetch('https://inventory.nalmart.com/items/item', {
            method: 'POST',
            body: JSON.stringify(item),
            
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => console.log(res))
        .catch((error) => console.log(error));
    }

    return(
        <div className="add-item-frame">
            This is the add item page
            <div>
                <input className='input' placeholder='Item name..' onInput={(e) => updateItem('name', e )}/>
            </div>
            <div>
                <input className='input' placeholder='Item qty e.g Kgs' onInput={(e) => updateItem('qty', e )}/>
            </div>
            <div>
                <input className='input' placeholder='Item description..' onInput={(e) => updateItem('description', e )}/>
            </div>
            <div>
                <input className='input' placeholder='Free delivery..' type='checkbox' onInput={(e) => updateItem('freeDelivery', e )}/>

            </div>
            <div>
                <input className='input' placeholder='Discount eg 20 or 57' onInput={(e) => updateItem('discount', e )}/>
            </div>
            <div>
                <input className='input' placeholder='Brand' onInput={(e) => updateItem('brand', e )}/>
            </div>
            <div>
                <input className='input' placeholder='Serial number..' onInput={(e) => updateItem('serialNumber', e )}/>
            </div>

            <input
                type="file"
                name=''
                onChange={(event) => {
                setImageUpload(event.target.files[0]);
                }}
                style={{}}
            />
            <button onClick={uploadImage}> Upload Image</button>

            <div style={{height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', color: 'white', width: '100%', marginInline: 30, cursor: 'pointer'}} onClick={handleSubmit}>
                SAVE
            </div>
            
        </div>
    )
}

export default AddItem