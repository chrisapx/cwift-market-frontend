import DHeader from "../../components/header/DHeader";


const DHome = () => {  //THis is desktop home component
    return(
        <div className="d-home-frame">
            <div style={{width: '100vw'}}>
                <DHeader />
            </div>
            <div style={{}}>
                <img src="src/assets/98658cdd-c5e8-4603-9ea7-b6c254e66e7d.png" width={'100%'} style={{objectFit: 'contain'}}/>
            </div>
        </div>
    )
}

export default DHome;