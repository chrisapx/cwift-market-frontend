import Header from '../../components/header/Header';
import './Cart.scss'

const Cart = () => {
    return(
        <div className='main-cart-section'>
            <div>
                <Header showBack={true} showSearch={true}/>
            </div>
            This is the Cart page
        </div>
    )
}

export default Cart;