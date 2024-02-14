import React, { useEffect, useState } from "react";
import './ManageProducts.scss'
import { DataGrid, GridDeleteIcon, enUS } from "@mui/x-data-grid";
import { TbHttpDelete } from "react-icons/tb";

export default function ManageProducts() {

    const [items, setItems] = useState([]);
    const [currency, setCurrency] = useState('UGX');

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

    const columns = [
        { field: 'id', headerName: '#' },
        { field: 'sku', headerName: 'sku', width: 150 },
        { field: 'name', headerName: 'Name', width: 130, editable: true },
        { field: 'price', headerName: currency === "USD"? 'Price (USD)' : 'Price (UGX)', width: 140, type: 'number', editable: true },
        { field: 'stockCount', headerName: 'Stock Count', type: 'number', width: 150, editable: true },
        
        // { field: 'coverImage', headerName: 'Cover Photo', width: 150 },
        { field: 'coverImage', headerName: 'Cover Photo', renderCell: (params) => ( 
            <div style={{ color: 'green', fontSize: 12, }}>
               <a href={params.value}>{params.value}</a>
           </div> 
           ) , width: 130 },
        { field: 'status', headerName: 'Status', renderCell: (params) => ( 
             <div style={{ color: 'green', fontSize: 16, }}>
                {params.value}
            </div> 
            ) , width: 130 },
        
        { field: 'categoty', headerName: 'Category', width: 150, editable: true },
        { field: 'vendorID', headerName: 'Vendor ID', width: 130, editable: true },
        { field: 'serialNumber', headerName: 'Serial Number', width: 130, type: 'number', editable: true },
        { field: 'original', headerName: 'Original', type: 'number', width: 150, editable: true },
        { field: 'qty', headerName: 'Quantity', width: 150, editable: true },
        { field: 'freeDelivery', headerName: 'Delivery', width: 130, editable: true, type: "boolean" },
        { field: 'store', headerName: 'Store', width: 130, type: 'number', editable: true },
        { field: 'type', headerName: 'Age type', type: 'number', width: 150, editable: true },

        { field: 'description', headerName: 'Description', width: 130, editable: true },
        { field: 'discount', headerName: 'Discount', width: 130, type: 'number', editable: true },
        { field: 'dateCreated', headerName: 'date created', width: 150, },
        { field: 'delete', headerName: '', renderCell: (params) => ( 
            <div style={{ color: 'red', }}>
               {params.value}
           </div> 
           ) , width: 10 },

              
    ];

    const handleCellEditCommit = (params) => {
        const updatedRows = [...rows];
        const { id, field, value } = params;
        const rowIndex = updatedRows.findIndex((row) => row.id === id);
        updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value };
        
        // Update record in the database with the edited value
        // You can make an API call here to update the record in the backend
    
        // For demonstration purposes, let's just log the updated rows
        console.log("Updated Rows:", updatedRows);
    };
            
    const rows = items.map(row => ({
        ...row,
        id: row.itemID,
        status: "live",
        coverImage: row.coverPhoto?.url,
        price: currency === "UGX" | currency === "none" ? row.price : row.price/38000,
        delete: <div><GridDeleteIcon size={6}/></div>
      }))
    
    return(
        <div className='main-frame'>
                <div className='tittle'>Products Management</div>
                
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

                    {/* <div className='input-field' style={{display: "flex",}}>                        
                        <div className="input-cont">
                            <div className="in">Stock Count <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input placeholder="Number of items in stock" onChange={{}} style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 14}}/>
                            </div> 
                        </div>

                        <div className="input-cont">
                            <div className="in">Store <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <input placeholder="Vendor store supplying the product" onChange={{}}  style={{height: '90%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 14}}/>
                            </div> 
                        </div> 
                        
                        <div className="input-cont">
                            <div className="in">Type <span style={{fontSize: 16, color: 'red'}}>*</span></div>
                            <div className="input1">
                                <select onChange={{}} style={{height: '100%', width: '100%', paddingInline: 12, backgroundColor: 'white', borderStyle: 'none', color: 'black', fontSize: 14}}>
                                    <option value="">Region</option>
                                    <option value="Eastern">Eastern</option>
                                    <option value="Western">Western</option>
                                    <option value="Central">Central</option>
                                    <option value="Northern">Northern</option>
                                </select>
                            </div> 
                    </div>
                        <input type='text' className='input'/>
                    </div>
 */}
                </div>

                {/* Order list */}
                <div style={{ width: '100%', marginTop: 20, marginBottom: 40, backgroundColor: 'white', fontSize: 8, boxShadow: 'black' }}>
                    <DataGrid 
                        rows={rows} 
                        columns={columns} 
                        checkboxSelection 
                        rowHeight={35} 
                        columnHeaderHeight={40} 
                        showCellVerticalBorder 
                        style={{borderStyle: 'solid', fontSize: 12, paddingTop: 14, boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}}
                        columnBuffer={1}
                        // processRowUpdate={(updatedRow, originalRow) => mySaveOnServerFunction(updatedRow) }
                        // onProcessRowUpdateError={handleProcessRowUpdateError}
                    
                        editMode="row"
                        onEditCellChangeCommitted={handleCellEditCommit}
                        />

                    {items.length == 0 && <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>No records found</div>}

                </div>

            </div>
    )
}