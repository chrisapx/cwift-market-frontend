import Header from '../../components/header/Header';
import './Account.scss'

const Account = () => {
    return(
        <div className='main-account-section'>
            <div>
                <Header showBack={true} showSearch={true}/>
            </div>
            This is the Account page
        </div>
    )
}

export default Account;