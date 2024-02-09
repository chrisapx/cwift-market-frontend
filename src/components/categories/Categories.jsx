import { useNavigate } from 'react-router-dom'
import './Categories.scss'

const Categories = () => {
    
    const navigate = useNavigate();


    const categories = [ 'Home & Kitchen', 'Toy & Baby', 'Automobile', 'Outdoor', 'Computing' , 
                         'Phones & Laptops', 'Office appliances' ]
    return(
        <div className="categories-frame">
            <div className='cat-frame'>
                {categories.map((cat, index) => (
                    <div className='cart-card' style={{width: 100}} onClick={() => navigate('/listings')}>
                        <div className='cat-image'>
                            {/* <img src='src/assets/Headphones-Transparent-PNG.png' width={'100%'} /> */}
                        </div>
                        <div className='cat-text'>{cat}</div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Categories;