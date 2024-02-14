import React, { useEffect, useState } from "react";
import './Orders.scss'
import { DataGrid, enUS } from "@mui/x-data-grid";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [currency, setCurrency] = useState("UGX");

    useEffect(()=>{
        // fetch('http://127.0.0.1:8080/items/categories')
        fetch('https://inventory.nalmart.com/orders')
        .then(response => {
            if (!response.ok) { 
                throw new Error('Network response was not ok'); 
            }
            return response.json();
        }).then(data => {
            setOrders(data);
            console.log(data);
        }).catch(error => { 
            console.error('Error fetching items:', error); 
        });
    },[])

    const columns = [
        { field: 'id', headerName: '#', },
        { field: 'orderID', headerName: 'Order ID', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 130, editable: true },
        { field: 'totalPrice', headerName: 'Amount', width: 130, type: 'number', editable: true },
        { field: 'paid', headerName: 'Paid', type: 'boolean', width: 150, editable: true },
        { field: 'specialInstructions', headerName: 'Special Instructions', width: 150, editable: true },
        { field: 'userID', headerName: 'Cistomer ID', width: 130, editable: true },
        { field: 'dateCreated', headerName: 'Date created', width: 130, type: 'number', editable: true },
              
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
            
    const rows = orders.map(row => ({
        ...row,
        id: row.itemID,
        status: "live",
        coverImage: row.coverPhoto?.url,
      }))
      
    //   const rows = items;
    //   [
    //     { id: 1, sku: "sku0188jjs9jw", name: 'HP laptop 12th gen', price: 120003882.23.toLocaleString(), status: 'Qc'},
    //     { id: 2, sku: 'sku-01882n28892', name: 'iPhone 12 8BG RAM', price: 2500000, status: "Live" },
    //     { id: 3, sku: "sku-j89wjnsi9wnj", name: 'Infix Hot 12i First gen', price: 670000, status: "Out" },
    //   ];


    return(
        <div className='main-frame'>
                <div className='tittle'>Orders Management</div>
                
                <div className='orders-filter'>
                    <div style={{color: 'orange', paddingBottom: 10, fontSize: 8, fontWeight: '600'}}>FILTERS</div>
                    
                    <div className='status-panel'>
                        <div className='order-status'>
                            <div style={{fontSize: 12, fontWeight: '700'}}>STATUS: </div>
                            <div className='status-item'>All</div>
                            <div className='status-item'>Pending</div>
                            <div className='status-item'>Confirmed</div>
                            <div className='status-item'>Picked</div>
                            <div className='status-item'>Shipped</div>
                            <div className='status-item'>Out for delivery</div>
                            <div className='status-item'>Delivered</div>
                            {/* <div className='status-item'>Delivery failed</div>
                            <div className='status-item'>Cancelled</div>
                            <div className='status-item'>Received</div>
                            <div className='status-item'>Rated</div> */}
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

                    {/* <div className='input-field'>                        
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
                    </div> */}

                </div>

                {/* Order list */}
                <div style={{ width: '100%', marginTop: 20, marginBottom: 40, backgroundColor: 'white', fontSize: 8, boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
                    <DataGrid 
                        rows={rows} 
                        columns={columns} 
                        checkboxSelection 
                        rowHeight={35} 
                        columnHeaderHeight={40} 
                        showCellVerticalBorder 
                        style={{borderStyle: 'solid', fontSize: 12, paddingTop: 14, }}
                        // processRowUpdate={(updatedRow, originalRow) => mySaveOnServerFunction(updatedRow) }
                        // onProcessRowUpdateError={handleProcessRowUpdateError}
                        onEditCellChangeCommitted={handleCellEditCommit}
                        />

                        {orders.length == 0 && <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>No records found</div>}
                </div>

            </div>
    )
}