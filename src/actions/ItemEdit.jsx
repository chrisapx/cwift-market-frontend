import { Close } from '@mui/icons-material'
import { Button } from "@mui/material";
import { Avatar, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '../context/ContextProvider';
import { IoLogIn } from 'react-icons/io5';
import './EditItems.css'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Compressor from "compressorjs";
import { v4 } from "uuid";
import { app } from '../../Firebase';


  const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

  const ItemEdit = ({ item }) => {

    const storage = getStorage(app);
    const [closeDialog, setClose] = useState(false);
    const { state: { openItemDialog }, dispatch } = useValue();
    const [coverPhoto, setCoverPhoto] = useState();
    const [photoImages, setPhotos] = useState([]);
    const [ads, setAds] = useState([]);

    // const [data, setData] = useState({ coverPhoto: {}, photos: [], ads: [] });

    const handleClose = () => {
        dispatch({ type: 'CLOSE_ITEM_DIALOGUE' });
    };

    const handleCoverPhotoUpload = async () => {
      try {
          const compressedCover = await new Promise((resolve, reject) => {
              new Compressor(coverPhoto, {
                  quality: 0.6,
                  success: (compressedResult) => {
                      resolve(compressedResult);
                  },
                  error: (error) => {
                      reject(error);
                  },
              });
          });

          const imageRef = ref(storage, `item-images/${compressedCover.name + v4()}`);
          const snapshot = await uploadBytes(imageRef, compressedCover);
          const uri = await getDownloadURL(snapshot.ref);
          return uri;
      } catch (error) {
          throw new Error('Error uploading cover photo');
      }
  };

    const handlePhotoUpload = async (photo) => {
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
          return uri;
      } catch (error) {
          throw new Error('Error uploading photo');
      }
  };

    const handleAdUpload = async (ad) => {
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
          return uri;
      } catch (error) {
          throw new Error('Error uploading ad');
      }
  };


  const handleUpload = async (e) => {
        e.preventDefault();
          dispatch({ type: 'START_LOADING' });

          try {
            if ( !coverPhoto || photoImages.length === 0 ) {
              dispatch({
                  type: 'UPDATE_ALERT',
                  payload: {
                    open: true,
                    severity: 'error',
                    message: 'Fill in all the required fields',
                  },
              });
            }
    
            const coverPhotoUrl = await handleCoverPhotoUpload();
            
            const photoUrlsPromises = photoImages?.map(async (photo) => {
                try {
                    const url = await handlePhotoUpload(photo);
                    return { url };
                } catch (error) {
                    console.error('Error uploading photo:', error);
                    return null; 
                }
            });

            const photoUrls = await Promise.all(photoUrlsPromises);

            const adUrlsPromises = ads?.map(async (ad) => {
                try {
                    const url = await handleAdUpload(ad);
                    return { url };
                } catch (error) {
                    console.error('Error uploading ad:', error);
                    return null;
                }
            });

            const adUrls = await Promise.all(adUrlsPromises);

            const itemData = { coverPhoto: { url: coverPhotoUrl }, photos: photoUrls, ads: adUrls };

            const response = await fetch(`https://inventory.nalmart.com/items/update?=${item?.itemID}`, {
            // const response = await fetch('http://127.0.0.1:8080/items/item', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            });
            const data = await response.json();
            console.log('Product updated successfully:', data);

            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                  open: true,
                  severity: 'success',
                  message: 'Product Uploaded successfully',
                },
              });
          
            dispatch({ type: 'END_LOADING' });
    
        } catch (error) {
          dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                open: true,
                severity: 'error',
                message: 'Update error: ' + error.message,
              },
            });
          }
        
          dispatch({ type: 'END_LOADING' });
     
    };

  // const handleDeleteImage = (indexToDelete) => {
  //   dispatch({ type: 'START_LOADING' });
  //   // Create a copy of the current photoImages array
  //   const updatedPhotoImages = [...photoImages];
  //   // Remove the image at the specified index
  //   updatedPhotoImages.splice(indexToDelete, 1);
  //   // Update the state with the new array without the deleted image
  //   setPhotoImages(updatedPhotoImages);
  //   dispatch({ type: 'END_LOADING' });
  // };



  const elements = [{id: 0, name:'Image 1'},{id: 1, name: 'Image 2'},{id: 2, name: 'Image 3'},{id: 3, name: 'Image 4'},{id: 4, name: 'Image 5'}];
  const usageImages = [{id: 0, name: 'Usage Image 1'},{id: 1, name: 'Usage Image 2'},{id: 2, name: 'Usage Image 3'}];

  return (
    <Dialog open={openItemDialog} onClose={handleClose} fullScreen={true} TransitionComponent={Transition} >
      <DialogTitle>
        <div>Edit product details</div>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{item?.name}</DialogContentText>

        <div>Old Images</div>
        <img src={item?.coverPhoto?.url}width={100} height={100}/>
        <div style={{display: 'flex'}}>
          { item?.photos?.map((i, ix) => (
              <div key={i}>
                <img src={i?.url} index={ix} width={100} height={100}/>
              </div>
            )) 
          }
        </div>
        <div>New Images</div>
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

      {coverPhoto && (
        <img src={URL.createObjectURL(coverPhoto)} width={100} height={100} />
      )}
      <div style={{ display: 'flex' }}>
        {photoImages?.map((file, ix) => (
          <div key={ix} style={{ position: 'relative' }}>
            <img src={URL.createObjectURL(file)} width={100} height={100} />
            {/* <button style={{ position: 'absolute', top: 0, right: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: 'white', }} nClick={() => handleDeleteImage(ix)} >
              Delete
            </button> */}
          </div>
        ))}
      </div>


      <Button sx={{mt: 6}} type="submit" onClick={handlePhotoUpload} variant="contained" endIcon={<IoLogIn />}>
        Update
      </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ItemEdit
