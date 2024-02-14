import React, { useEffect, useState } from "react";
import './AddProduct.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../Firebase";
import Compressor from "compressorjs";
import { v4 } from "uuid";

export default function AddProduct() {

    const storage = getStorage(app);
    const [description, setDescription] = useState('');
    const [whatIsIn, setWhatIsIn] = useState('');

    const [coverPhoto, setCoverPhoto] = useState();
    const [photoImages, setPhotos] = useState([]);
    const [ads, setAds] = useState([]);

    const [errors, setErrors] = useState([]);


    
    const [compressedPhoto, setCompressedPhoto] = useState();
    const [compressedCover, setCompressedCover] = useState();
    const [compressedAd, setCompressedAd] = useState();
    
    const [categories, setCategories] = useState([]);
    
    const [item, setItem] = useState({
        name: '', 
        qty: '',
        description: '',
        globalPrice: 0,
        price: 0.0,
        // discount: (item.globalPrice)/item.globalPrice*100,
        freeDelivery: false,
        stockCount: 0,
        brand: '',
        store: '',
        type: '',
        serialNumber: '',
        vendorID: 6788978, //Get this from the logged in User
        category: '',
        whatIsIn: '',
        coverPhoto: {},
        details: [],
        photos: [],
        ads: [],
    });


    useEffect(()=>{
        // fetch('http://127.0.0.1:8080/items/categories')
        fetch('https://inventory.nalmart.com/items/categories')
        .then(response => {
            if (!response.ok) { 
                throw new Error('Network response was not ok'); 
            }
            return response.json();
        }).then(categories => {
            categories.forEach(category => {
                setCategories(prevCategories => [...prevCategories, category]);
            });
        }).catch(error => { 
            console.error('Error fetching categories:', error); 
        });
            console.log(coverPhoto)
            console.log(photoImages)
            console.log(item.coverPhoto)
            // console.log(categories);
    },[])

    const resetForm = () => {
        setDescription('');
        setWhatIsIn('');
        setCoverPhoto(null);
        setPhotos([]);
        setAds([]);
        setCompressedPhoto(null);
        setCompressedCover(null);
        setCompressedAd(null);
        setItem({
            name: '', 
            qty: '',
            description: '',
            globalPrice: 0,
            price: 0.0,
            freeDelivery: false,
            stockCount: 0,
            brand: '',
            store: '',
            type: '',
            serialNumber: '',
            vendorID: 6788978,
            category: '',
            whatIsIn: '',
            coverPhoto: {},
            details: [],
            photos: [],
            ads: [],
        });
        setErrors([]);
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {

            // Save the cover photo
            if (coverPhoto !== null){
                new Compressor(coverPhoto, {
                    quality: 0.6,
                    success: (compressedResult) => {      
                      setCompressedCover(compressedResult)
                    },});
            
                    const imageRef = ref(storage, `item-images/${compressedCover?.name + v4()}`);
                    uploadBytes(imageRef, compressedCover).then((snapshot) => {
                      getDownloadURL(snapshot.ref).then((uri) => {
                        console.log(uri)
                        updateItem("coverPhoto", { url: uri });                        
                      });
                    });
            }else {
                setErrors(prevErrors => [...prevErrors, "Cover Photo is null"])
            }
                
            for (const photo of photoImages) {
                if (photo !== null) {
                    try {
                        const compressedPhoto = await new Promise((resolve, reject) => {
                            new Compressor(photo, {
                                quality: 0.6,
                                success: (compressedResult) => {
                                    resolve(compressedResult);
                                },
                                error: (error) => {
                                    reject(error);
                                },
                            });
                        });

                        const imageRef = ref(storage, `item-images/${compressedPhoto.name + v4()}`);
                        const snapshot = await uploadBytes(imageRef, compressedPhoto);
                        const uri = await getDownloadURL(snapshot.ref);
                        console.log(uri);

                        setItem((prevState) => ({
                            ...prevState,
                            photos: [...prevState.photos, { url: uri }],
                        }));
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            for (const ad of ads) {
                if (ad !== null) {
                    try {
                        const compressedAd = await new Promise((resolve, reject) => {
                            new Compressor(ad, {
                                quality: 0.6,
                                success: (compressedResult) => {
                                    resolve(compressedResult);
                                },
                                error: (error) => {
                                    reject(error);
                                },
                            });
                        });

                        const imageRef = ref(storage, `item-images/${compressedAd.name + v4()}`);
                        const snapshot = await uploadBytes(imageRef, compressedAd);
                        const uri = await getDownloadURL(snapshot.ref);
                        console.log(uri);

                        setItem((prevState) => ({
                            ...prevState,
                            ads: [...prevState.ads, { url: uri }],
                        }));
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            const response = await fetch('https://inventory.nalmart.com/items/item', {
                // const response = await fetch('http://127.0.0.1:8080/items/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
            const data = await response.json();
            console.log(data);
            console.log('Product added successfully:', data);
            resetForm();

        } catch (error) {
            console.error('Error adding product:', error);
            alert(error);
        }
    };
    
    const updateItem = (property, value) => {
        setItem(prevItem => ({
          ...prevItem,
          [property]: value,
        }));
      };

    const elements = [{id: 0, name:'Image 1'},{id: 1, name: 'Image 2'},{id: 2, name: 'Image 3'},{id: 3, name: 'Image 4'},{id: 4, name: 'Image 5'}];
    const usageImages = [{id: 0, name: 'Usage Image 1'},{id: 1, name: 'Usage Image 2'},{id: 2, name: 'Usage Image 3'}];

    return(
        <div className="main-product-frame">
            <div className='tittle'>Add Products</div>

            <div className="sub-tittle" >Product information</div>

            <form onSubmit={handleFormSubmit}>
                <div className="product-info">
                    
                    <div className="image-pickers">


                    
                        
                        {/* Main image picker */}
                        <div className="image-picker">
                            <input type="file" accept="image/*" id="fileInput" onChange={e => setCoverPhoto(e.target.files[0])} style={{ display: 'none' }} />
                            <label htmlFor="fileInput" className="picker-box">
                                {!coverPhoto ? (<div className="plus">+</div>) : (<div className="plus" style={{fontSize: 12}}>Captured</div>)}
                                <div className="text">Main Image</div>
                            </label>
                        </div>

                        {/* Other images picker */}
                        { elements.map((picker, index) => (
                            <div key={index} className="image-picker">
                                <input type="file" accept="image/*" id={`photofileInput-${picker.id}`} onChange={e => setPhotos(prev => [...prev, e.target.files[0]])} style={{ display: 'none' }} />
                                <label htmlFor={`photofileInput-${picker.id}`} className="picker-box">
                                    {!photoImages[picker.id] ? (<div className="plus">+</div>) : (<div className="plus" style={{fontSize: 12}}>Captured</div>)}
                                    <div className="text">{picker.name}</div>
                                </label>
                            </div>   
                        ))} 

                        {/* Other images picker */}
                        { usageImages.map((picker, index) => (
                            <div key={index} className="image-picker">
                                <input type="file" accept="image/*" id={`adfileInput-${picker.id}`} onChange={e => setAds( prev => [...prev, e.target.files[0]])} style={{ display: 'none' }} />
                                <label htmlFor={`adfileInput-${picker.id}`} className="picker-box">
                                    {!ads[picker.id] ? (<div className="plus">+</div>) : (<div className="plus" style={{fontSize: 12}}>Captured</div>)}
                                    <div className="text">{picker.name}</div>
                                </label>
                            </div>   
                        ))} 
                    

                    </div>
                    <div className="image-caution">Image needs to be between 500x500 and 2000x2000 pixels. White backgrounds are recommended. No watermarks. Maximum image size 2Mb.</div>

                    <div className="name-cat">
                        
                        <div className="input-cont">
                            <div className="in">Name <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input required placeholder="Name of product, should be between 15 and 60 characters" onChange={event => updateItem("name" ,event.target.value)} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div>

                        <div className="input-cont">
                            <div className="in">Category <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <select required onChange={event => updateItem("category" , event.target.value)} style={{height: '100%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}>
                                    <option>Select Category</option>
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                </select>                            
                            </div> 
                        </div> 

                    </div>

                    <div className="name-cat">
                        
                        <div className="input-cont">
                            <div className="in">Global price <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input placeholder="Global price" onChange={event => updateItem("globalPrice" , parseFloat(event.target.value))} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div>

                        <div className="input-cont">
                            <div className="in">Selling price <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input required placeholder="Selling price, this must be equal or lower to cater for the discount" onChange={event => updateItem("price" , parseFloat(event.target.value))} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div> 

                        <div className="input-cont">
                            <div className="in">Quantity <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input required placeholder="Quantity eg 1Kg or XXpieces or Dozen" onChange={event => updateItem("qty" ,event.target.value)} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div> 

                    </div>

                    <div className="name-cat">
                        
                        <div className="input-cont">
                            <div className="in">Stock Count <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input placeholder="Number of items in stock" onChange={event => updateItem("stockCount" , parseInt(event.target.value))} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div>

                        <div className="input-cont">
                            <div className="in">Store <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input placeholder="Vendor store supplying the product" onChange={event => updateItem("store" ,event.target.value)}  style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div> 
                        
                        {/* Update this in the server later */}
                        <div className="input-cont">
                            <div className="in">Type <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <select onChange={event => updateItem("type" ,event.target.value)} style={{height: '100%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}>
                                    <option value="">Select Type</option>
                                    <option value="NEW">NEW</option>
                                    <option value="USED">USED</option>
                                </select>
                            </div> 
                        </div> 

                    </div>

                    <div className="name-cat">
                        
                        <div className="input-cont">
                            <div className="in">Serial number <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input required placeholder="Product serial number or IMEI" onChange={e => updateItem("serialNumber", e.target.value)} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div>

                        <div className="input-cont">
                            <div className="in">Brand <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                            <input required placeholder="Item brand" onChange={e => updateItem("brand", e.target.value)} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}/>
                            </div> 
                        </div> 

                        <div className="input-cont">
                            <div className="in">Delivery <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <select onChange={event => updateItem("freeDelivery" ,event.target.value)} style={{height: '100%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 10}}>
                                    <option value={false}>None</option>
                                    <option value={true}>Free delivery</option>
                                </select>                            
                            </div> 
                        </div> 

                    </div>

                    

                    <div className="desc">Item Description</div>
                    <ReactQuill 
                        theme="snow" 
                        onChange={(e) => { updateItem("description" , description);}}
                        className="description-input"
                        placeholder="Description of the product, atleast 50 characters"
                    />

                    <div className="desc">What is in the box</div>
                    <ReactQuill 
                        theme="snow" 
                        onChange={(e) => { updateItem("whatIsIn" ,whatIsIn);}}                        
                        className="description-input"
                        placeholder="What is in the box, write a bulleted list of items in the box"
                    />

                </div>

                <div type="submit" onClick={handleFormSubmit} style={{position: "sticky", cursor: "pointer", bottom: 0, display: "flex", alignItems: 'center', marginBlock: 16, marginTop: 40, marginLeft: 30, backgroundColor: 'orange', width: 'fit-content', padding: 10, borderRadius: 8, color : 'white', fontWeight: 'bold'}}>Submit</div>
            </form>

        </div>
    )
}