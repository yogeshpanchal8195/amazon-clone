
import React from 'react';
import './Home.scss';
import imgpath from '../images/amazon3.jpg'
// import imgpath from '../images/amazon2.jpg'
import Product from './Product';

var productsList = [
    {
        id: 1,
        rating: 3,
        price: "12.24",
        title: "AmazonBasics Lightweight Super Soft Easy Care Microfiber Sheet Set with 16 Deep Pockets - Twin, Dark Grey",
        imgUrl: "https://m.media-amazon.com/images/I/71f8d7Y6EUL._AC_UY218_.jpg"
    },
    {
        id: 2,
        rating: 3,
        price: "12.24",
        title: "AmazonBasics Hybrid Mattress - Memory Foam With Strong Innerspring Support - Medium Feel",
        imgUrl: "https://m.media-amazon.com/images/I/81D3FcLchhL._AC_UY218_.jpg"
    },
    {
        id: 3,
        rating: 3,
        price: "12.24",
        title: "VicTsing MM057 2.4G Wireless Mouse Portable Mobile Optical Mouse with USB Receiver, 5 Adjustable DPI Levels,",
        imgUrl: "https://images-na.ssl-images-amazon.com/images/I/41PpNHdOKJL._AC_US160_.jpg"
    },
    {
        id: 4,
        rating: 3,
        price: "12.24",
        title: "Lenovo IdeaPad 3 14 FHD (1920 x 1080) Display, AMD Ryzen 5 3500U Processor, 8GB DDR4 RAM, 256GB SSD, AMD Radeon Vega 8 Graphics, Narrow Bezel, Windows 10, 81W0003QUS, Abyss Blue",
        imgUrl: "https://images-na.ssl-images-amazon.com/images/I/41hCoCHfdjL._AC_US160_.jpg"
    },
    {
        id: 5,
        rating: 3,
        price: "12.24",
        title: "If You Tell: A True Story of Murder, Family Secrets, and the Unbreakable Bond of Sisterhood ",
        imgUrl: "https://m.media-amazon.com/images/I/410K-S--pmL.jpg"
    },
    {
        id: 6,
        rating: 3,
        price: "12.24",
        title: "Lying Next to Me",
        imgUrl: "https://m.media-amazon.com/images/I/41rSaQpivNL.jpg"
    }
]
function Home() {
    return (
        <div className="home">
            <div className="home_header">
                <img className="home_header_image" src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/1102620_MLP_1440x675_apv189_V3._SY1200_FMJPG_.jpg" alt=""></img>
                <div className="dv-row-item dv-copy dv-push-left home_header_left">
                    <h1 className="dv-copy-title">Amazon Prime Video</h1>
                    <div className="dv-copy-body">
                        <p>Join Prime to watch the latest movies, TV shows and award-winning Amazon Originals</p>
                    </div>
                </div>
            </div>
            <div className="product_row">
                {productsList.map((ele,idx) => (
                    <Product {...ele} key={idx}></Product>
                ))}
            </div>
        </div>
    )
}

export default Home
