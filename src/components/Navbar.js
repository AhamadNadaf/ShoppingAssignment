import React, { useState } from 'react';
import shop_logo from '../assets/Screenshot 2023-05-04 150521.png'
import SearchIcon from '@mui/icons-material/Search';
import './css/navbar.css'
import Basket from '../assets/basket.png'


function Navbar({datas, productData, setProduct,itemAdded , setItemAdded}) {

    const [val, setVal] = useState("")

    const handleChange = (e) => {

        setVal(e.target.value) 
        
        
    }

    const handleClick = () => {
        if(val === "" ){
            return setProduct(datas)        
        }
       const updatedData = productData.filter((item) => 
        item.name.toLowerCase().includes(val.toLowerCase())
        );
        setProduct(updatedData)

    }



    return (
        <div>
            <div className='navbar'>
                <img src={shop_logo} alt='Shop_logo' />
                <div>
                <input type='text' className='searchBar' placeholder='Search For Products by Name...' onChange={(e) => handleChange(e)}></input><span onClick={handleClick} className='searchIcon'><SearchIcon /></span>
                </div>
                <div className='Basket_item'><img src={Basket} alt='basket' /><span className='MyBasket'>My Basket<br />{itemAdded} item</span></div>
                
            </div>
            {
                productData.length === ( <div className='noData'>No data</div>)
            }
        </div>
    )
}

export default Navbar;