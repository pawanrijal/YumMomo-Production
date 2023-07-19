'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import mongoose from "mongoose";
import Product from "../../models/Product.js";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const products = await Product.findOne({slug: context.query.slug});
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
};




export default function Page({addToCart, products, buyNow}) {
  const router = useRouter()
  const { slug } = router.query
  
  return <> 
    <section className="text-gray-600 body-font min-h-screen">
  <div className="container px-5 py-20 mx-auto">
    <div className="lg:w-3/4 mx-auto  flex ">
      <div className=''>
      <img alt="ecommerce" className="lg:w-3/4 w-full lg:h-auto rounded-lg shadow-lg" src = {products.image} />
      </div>
      <div className="lg:w-1/2 w-full mt-6">
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{products.title}</h1>
        <div className="flex mb-4">
          <span className="flex items-center my-3">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </span>
          
        </div>
        <p className="leading-relaxed">Description: {products.desc}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">${products.price}.00</span>
        </div>
        <div className='flex mt-3'>
        <button onClick={()=>{addToCart(slug, 1, products.price, products.title)}} className="flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add to Cart</button>
          <button onClick={()=>{buyNow(slug, 1, products.price, products.title)}} className="flex ml-3 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
}