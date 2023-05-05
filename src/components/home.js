import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import './css/home.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import { Link } from "react-router-dom";


const Home = () => {

    const [datas, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterData, setFilterData] = useState([])
    const [qty, setQty] = useState(1)
    const [itemAdded, setItemAdded] = useState(0)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const [categoryValue, setCategoryValue] = useState("Fruits & Vegetables")
    const [cardMatchData, setCardMatchData] = useState()

    const fetchData = async (pages) => {
        try {
            const res = await axios.get(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${pages}`)
            const responseData = res.data
            setData(responseData.products)
            setFilterData(responseData.products)
            setTotalPage(responseData.totalPages)
        }
        catch (err) {
            return err
        }

    }

    const handleQtyChange = (e) => {
        const val = e.target.value
        setQty(val)
    }

    const handleAddToCart = () => {
        setItemAdded(itemAdded + parseInt(qty))
    }


    const handlePre = () => {
        if (page > 1) {
            setPage(page - 1)
        }

    }


    const handleNext = () => {
        if (page <= totalPage) {
            setPage(page + 1)
        }

    }

    useEffect(() => {
        fetchData(page)
        setLoading(true)
    }, [])

    useEffect(() => {
        fetchData(page)
        setLoading(true)
    }, [page])



    return (
        <div>
            <Navbar datas={datas} productData={filterData} setProduct={setFilterData} itemAdded={itemAdded} setItemAdded={setItemAdded} />
            {
                loading ? (
                    <div>
                        <div className="sideDiv">
                            <div className="categoryDiv"><h2>Category</h2>
                            </div>
                            <hr />
                            <span>Fruits & Vegetables</span>
                            <div className="BrandDiv"><h2>Brand</h2></div>
                        </div>
                        <div className="productDiv">
                            <div>{categoryValue}</div>
                        </div>
                        <hr className="lineAboveGrid" />
                        <div className="GridDiv">
                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {
                                        filterData.map((items) => (
                                            <>
                                                <Grid item xs={3}>
                                                    <div className="itemCard" id={items.gtin}>
                                                        <div className="grids">
                                                            <div className="discountDiv">GET OFF OF 32%</div>
                                                            <img src={`${items.images.front}`} alt="img" className="imgDiv" /><br />
                                                            <span className="itemComName">{items.company_detail.name}</span>
                                                            <sapn className="itemName">{items.name}</sapn>
                                                            <div className="mrpDiv"><sapn className="mrpName">MRP {items.mrp.mrp}</sapn>
                                                                <div>
                                                                    <span className="qtyName">QTY</span><input type='text' className="qtyText" placeholder="1" onChange={(e) => handleQtyChange(e)} />
                                                                    <button className="AddButton" onClick={handleAddToCart}>ADD <ShoppingBasketIcon /></button>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </Grid>

                                            </>
                                        ))
                                    }
                                </Grid>
                            </Box>
                            <div className="pagination">
                                <span className={page === 1 ? "noprev" : "prev"} onClick={handlePre}>< ArrowBackIosSharpIcon /></span> &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="currentPage">{page}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className={totalPage <= page ? "noNext" : "next"} onClick={handleNext}><ArrowForwardIosSharpIcon /></span>

                            </div>
                        </div>

                    </div>
                ) : (
                    <div>
                        <h1>
                            No Data</h1>
                    </div>
                )
            }

        </div>
    )
}

export default Home;