import React, { useEffect, useState } from "react";
import './ManageProducts.scss'
import { DataGrid } from "@mui/x-data-grid";
import Login from "../../auth-pages/user/Login";
import { Avatar, Box, gridClasses } from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import ItemActions from "../../actions/ItemActions";
import { grey } from "@mui/material/colors";
import { Lock } from "@mui/icons-material";
import DeleteActions from "../../actions/DeleteAction";

export default function ManageProducts() {

    const { dispatch } = useValue();
    const [items, setItems] = useState([]);
    const [currency, setCurrency] = useState('UGX');
    const [ clicked, setClicked ] = useState('');
    const [ rowId, setRowId ] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [ loading, setLoading ] = useState('');
    const [ login, setLogin ] = useState(false);

    useEffect(()=>{
        // fetch('http://127.0.0.1:8080/items/categories')
        fetch('https://inventory.nalmart.com/items')
        .then(response => {
            if (!response.ok) { 
                throw new Error('Network response was not ok'); 
            }
            return response.json();
        }).then(data => {
            setItems(data);
            console.log(data);
        }).catch(error => { 
            console.error('Error fetching items:', error); 
        });
    },[])

    const subCategories = [
        {name: 'Lighting', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Flighting.jpeg57e8c991-b2f3-4dc8-b493-6eff339937a1?alt=media&token=dbf37ac9-6308-414a-8630-6e02f7055bc2'},
        {name: 'Headphones, EarBuds & Accessories ', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fh%26ebuds.jpeg6fe4d50a-cb95-4f5d-b840-d0c4f119dab1?alt=media&token=b7dcd69a-aa28-4183-9ec3-461fadda463e'},
        {name: 'Camera & Photo', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcamera%26photo.jpegc2ff6931-8d31-4aa8-8190-140ac6a178cf?alt=media&token=75ca5891-d1a8-4a65-9c58-d2c6f33319b8'},
        {name: 'Audio & Radio', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fo%26radio.jpeg802de16c-0c95-4c3b-9b21-47d97d2f5b99?alt=media&token=29274414-6f44-44f9-88a9-90ec479903fd'},
        {name: 'Phones & Tablets', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fphones%26tablets.jpege11f25e3-1ece-464c-9ea2-63aebaf997ef?alt=media&token=4d8d3500-2a20-4d64-bacf-f83c7d4e5d37'},
        {name: 'Laptops', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Flaptops.jpeg72efff1c-1047-4d8f-aac5-844d1acd8622?alt=media&token=0f5cad92-0a3a-41b5-b066-ce3431243b91'},
        {name: 'Data Storage', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fdatastorage.jpeg1ecaabce-4d5a-4803-a93d-ad4448f338ff?alt=media&token=10fb62e6-3a22-45af-a648-dfc31c0be1d8'},
        {name: 'keyboards, Mice & Accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fkeybord%26mice.jpeg2712e463-b8c2-456e-a314-014f1adb47c7?alt=media&token=536b73bd-479d-4d95-b0e0-e2780e3f480f'},
        {name: 'Video Games', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fvideogames.jpegc8b30ba4-ee4a-405f-b4a8-9c463aff6a8e?alt=media&token=9af682e2-5029-49f9-a817-873273844023'},
        {name: 'Hubs & Adapters', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fhubd%26adapters.jpegdca98b95-8dbe-4f14-8064-f5db139c20ca?alt=media&token=fbec11d9-ed01-43db-9ba7-4546524055a5'},
        {name: 'Computer accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcomputing.jpeg4eb42784-1576-4346-89d3-0f7c243d27d7?alt=media&token=dfe12355-fdd0-442b-8690-51cdd33d539d'},
        {name: 'Batteries & Accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fbattery.jpegfd2e6ca5-aaec-48f4-a242-6cdd2496e668?alt=media&token=1378a309-80ea-42ea-a9ee-647f3f4e972f'},
        {name: 'USB Gadgets', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fusbgadets.jpeg3ac2767d-b0ed-4218-8e0b-a250548a59ef?alt=media&token=7269fe11-f6d4-4e9d-8a0b-afc05c705a72'},
        {name: 'power Strips', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2FpowerStrips.jpeg3380279e-d7bc-44ad-b915-4a549b864b3e?alt=media&token=0083bba6-c589-4032-b92d-e38b0f9094ad'},
    ]

    const columns = [
        { 
            field: 'id', 
            headerName: '#' 
        },
        { 
            field: 'sku', 
            headerName: 'sku', 
            width: 150 
        },
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 130, 
            editable: true,
            renderCell: p => (<p>{p?.row.name}</p>)
        },
        { 
            field: 'globalPrice', 
            headerName: currency === "USD"? 'Glibal Price (USD)' : 'Global Price (UGX)', 
            width: 140, 
            type: 'number', 
            editable: true 
        },
        { 
            field: 'price', 
            headerName: currency === "USD"? 'Price (USD)' : 'Price (UGX)', 
            width: 140, 
            type: 'number', 
            editable: true 
        },
        { 
            field: 'stockCount', 
            headerName: 'Stock Count', 
            type: 'number', 
            width: 150, 
            editable: true 
        },
        
        { 
            field: 'coverImage', 
            headerName: 'Cover Photo',
            editable: true, 
            renderCell: (params) => ( 
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Avatar sx={{objectFit: 'contain'}} src={params?.row.coverPhoto?.url }/>
                </div>
            ) , width: 130 
        },
        { 
            field: 'photos', 
            headerName: 'Display Images', 
            width: 200 ,
            renderCell: p => (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    {p.row.photos.map((photo, index) => (
                        <Avatar key={index} src={photo.url} />
                    ))}
                </div>
            )
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            renderCell: (params) => ( 
             <div style={{ color: 'green', fontSize: 16, }}>
                {params.value}
            </div> 
            ) , width: 130 },
        
        { 
            field: 'category', 
            headerName: 'Category', 
            width: 250,
            fontSize: 'small',
            type: 'singleSelect',
            // valueOptions: ['Electronics', 'Home'],
            editable: true,
            renderCell: param => (
                <select 
                    style={{backgroundColor: 'whitesmoke', whiteSpace: 'nowrap', flex: 1, color: 'black', border: 'none'}}
                    onClick={ e => {param.row.category = e.target.value}}
                    >
                    <option>{param.row.category}</option>
                    <option>{'Electronics'}</option>
                    <option>{'Home apliances and many more'}</option>
                </select>
            )
        },
        { 
            field: 'subCategory', 
            headerName: 'Sub Category', 
            width: 280,
            fontSize: 'small',
            editable: true,
            color: 'grey',
            type: 'singleSelect',
            renderCell: param => (
                <select 
                    style={{
                        backgroundColor: 'whitesmoke', 
                        whiteSpace: 'nowrap', 
                        flex: 1, color: 'black', 
                        border: 'none'
                        }} 
                    onChange={e => { param.row.subCategory = e.target.value;
                     }}>
                    <option>{param.row.subCategory ? param.row.subCategory : 'Sub Category'}</option>
                        {subCategories.map((sub, index) => (
                            <option key={index}>{sub.name}</option>
                        ))}
                    <option>{'Home apliances and many more'}</option>
                </select>
            )
        },
        { 
            field: 'vendorID', 
            headerName: 'Vendor ID', 
            width: 130, 
            editable: true 
        },
        { 
            field: 'serialNumber', 
            headerName: 'Serial Number', 
            width: 130, 
            type: 'number', 
            editable: true 
        },
        { 
            field: 'qty', 
            headerName: 'Quantity', 
            width: 150, 
            editable: true 
        },
        { 
            field: 'freeDelivery', 
            headerName: 'Delivery', 
            width: 130, 
            editable: true, 
            type: "boolean" 
        },
        { 
            field: 'store', 
            headerName: 'Store', 
            width: 130, 
            type: 'number', 
            editable: true 
        },
        { 
            field: 'type', 
            headerName: 'Age type', 
            type: 'number', 
            width: 150, 
            editable: true,
            renderCell: param => (
                <select style={{backgroundColor: 'whitesmoke', whiteSpace: 'nowrap', flex: 1, color: 'black', border: 'none'}}
                onClick={ e => {param.row.type = e.target.value}}
                >
                    <option>{param.row.type}</option>
                    { param.row.type !== 'NEW' ? <option>{'NEW'}</option> : null}
                    { param.row.type !== 'USED' ? <option>{'USED'}</option> : null}
                </select>
            )
        },
        { 
            field: 'description', 
            headerName: 'Description', 
            width: 130, 
            editable: true 
        },
        { 
            field: 'discount', 
            headerName: 'Discount', 
            width: 130, 
            type: 'number', 
            editable: true ,
        },
        { 
            field: 'dateCreated', 
            headerName: 'date created', 
            width: 150, 
        },
        { 
            field: 'actions', 
            headerName: 'Commit', 
            renderCell: (params) => ( 
                <ItemActions 
                    {...{ params, rowId, setRowId }} 
                    />
            ), 
            // height: 40            
        },
        { 
            field: 'delete', 
            headerName: 'Delete', 
            renderCell: (params) => ( 
                <DeleteActions 
                    {...{ params, rowId, setRowId }} 
                    />
            ), 
            // height: 40            
        },
              
    ];
    
    const rows = items.map(row => ({
        ...row,
        id: row.itemID,
        status: row?.status,
        coverImage: row.coverPhoto?.url,
        price: currency === "UGX" || currency === "none" ? row.price : row.price/38000,
        globalPrice: currency === "UGX" | currency === "none" ? row.globalPrice : row.globalPrice/38000,
        // delete: <div><GridDeleteIcon size={6}/></div>,
      }))
    
    return(
        <div className='main-frame'>
                <div className='tittle'>
                    <div>Products Management</div>
                    <div style={{display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,200,0.7)', paddingInline: 6, borderRadius: 6, color: 'white', cursor: 'pointer' ,fontSize: 'medium'}} onClick={() => setLogin(true)}>
                        <p>Login</p> 
                        <Lock sx={{fontSize: 16, }} size={'medium'}/>
                    </div>
                </div>
                
                <div className='orders-filter'>
                    <div style={{color: 'orange', paddingBottom: 10, fontSize: 8, fontWeight: '600'}}>FILTERS</div>
                    
                    <div className='status-panel'>
                        <div className='order-status'>
                            <div style={{fontSize: 12, fontWeight: '700'}}>STATUS: </div>
                            <div className='status-item'>All</div>
                            <div className='status-item'>Pending</div>
                            <div className='status-item'>Qc</div>
                            <div className='status-item'>live</div>
                            <div className='status-item'>Off Stock</div>
                            <div className='status-item'>B-listed</div>
                        </div>
                        <div>
                            <div style={{color: 'grey', fontWeight: '600', fontSize: 14}}>
                                CURRENCY: 
                                    <span style={{color: 'grey', fontWeight: '600', fontSize: 12, marginLeft: 8}}>
                                        <select style={{backgroundColor: 'white', color: 'black'}} onChange={(e) => setCurrency(e.target.value)}>
                                            <option>none</option>
                                            <option value="UGX">Ugx</option>
                                            <option value="USD">Usd</option>
                                        </select>
                                    </span> 
                            </div>
                        </div>
                    </div>

                </div>

                {/* Items list */}
                <Box>
                    <div style={{ width: '100%', marginTop: 20, marginBottom: 40, backgroundColor: 'white', fontSize: 8, boxShadow: 'black' }}>

                        <DataGrid
                            columns={columns}
                            rows={rows}
                            getRowId={(row) => row.itemID}
                            rowsPerPageOptions={[5, 10, 20]}
                            pageSize={pageSize}
                            checkboxSelection
                            showColumnVerticalBorder={true}
                            showCellVerticalBorder={true}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            getRowSpacing={(params) => ({
                                top: params.isFirstVisible ? 0 : 5,
                                bottom: params.isLastVisible ? 0 : 5,
                            })}
                            sx={{
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                theme.palette.mode === 'light' ? grey[200] : grey[900],
                            },
                            }}
                            onCellEditCommit={(params) => setRowId(params.id)}
                        />

                        {items.length == 0 && <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>No records found</div>}

                    </div>
                    <Login open={login}/>
                </Box>

            </div>
    )
}