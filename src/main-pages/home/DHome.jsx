import DHeader from "../../components/header/DHeader";


const DHome = () => {  //THis is desktop home component
    return(
        <div className="d-home-frame">
            <div style={{width: '100vw'}}>
                <DHeader />
            </div>
            <div style={{}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2F98658cdd-c5e8-4603-9ea7-b6c254e66e7d.png26c5f385-74e8-4220-8b5a-6e06be571dbf?alt=media&token=2198a089-369e-4d50-9bfb-afa7f242f695" width={'100%'} style={{objectFit: 'contain'}}/>
            </div>
        </div>
    )
}

export default DHome;