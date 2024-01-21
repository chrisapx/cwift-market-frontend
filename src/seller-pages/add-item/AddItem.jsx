import { useState } from 'react'
import './AddItem.scss'
import { useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app,  } from '../../../Firebase';
import { v4 } from 'uuid';
// import imagemin from 'imagemin';
// import imageminMozjpeg from 'imagemin-mozjpeg';
// import imageminWebp from 'imagemin-webp';


const AddItem = () => {

    const storage = getStorage(app);

    const [imageUpload, setImageUpload] = useState(null);

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

    // const compressedImage = await compress(imageUpload, {
    //     quality: 0.8, // Adjust the quality as needed (0 to 1)
    //     maxWidth: 800, // Adjust the maximum width as needed
    //   });

    // Use squoosh for image compression
    // const compressedImage = await encode(imageUpload, {
    //         webp: {},
    //         mozjpeg: { quality: 80 }, // Adjust quality as needed
    //         oxipng: {}, // Optional: Use Oxipng for PNG compression
    // });

    // const compressedImageBuffer = await imagemin.buffer(imageUpload, {
    //     plugins: [
    //       imageminMozjpeg({ quality: 80 }), // Adjust quality as needed
    //       imageminWebp(),
    //     ],
    //   });

        const imageRef = ref(storage, `item-images/${compressedImageBuffer.name + v4()}`);  //Add the item name for easy tracing
        uploadBytes(imageRef, compressedImageBuffer).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            alert(url);
            // setImageUrls((prev) => [...prev, url]);
          });
        });
      };

    // useEffect(() => {
    const handleSubmit = () => {
        fetch('http://127.0.0.1:8080/items/item', {
            method: 'POST',
            body: JSON.stringify(Array.of(item)),
            
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .catch((error) => console.log(error));
    }
    // })

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
            <div>
                {/* <input className='input' placeholder='Category..' type='search' onInput={(e) => updateItem(name, e )}/> */}
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