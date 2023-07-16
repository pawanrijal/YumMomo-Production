import React from 'react'
import Image from 'next/image'
import Order from '../models/Order'
import mongoose from 'mongoose'

const MyOrder = ({order, subTotal}) => {
  const products = order.products;
  const Total = order.Total;
  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
  <div className="container px-5 py-24 m-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
        <p className="leading-relaxed mb-4 text-green-500">Yayy! Your order has been sucessfully placed.🙌</p>
        <p className="leading-relaxed mb-4 text-green-500">Thank You for choosing Yum-momo you will not regret it.🥟</p>
        <div className="flex mb-4">
          <p className="flex-grow text-center text-red-500 border-b-2 border-red-500 py-2 text-xl px-1">Items</p>
          <p className="flex-grow text-center border-b-2 border-gray-300 py-2 text-xl px-1">Quantity</p>
          <p className="flex-grow text-center border-b-2 border-gray-300 py-2 text-xl px-1">Total</p>
        </div>

        {Object.keys(products).map((key)=>{
          
          return(
          <div key={key}  className="flex py-2">
          <span className="text-gray-500 text-xl">{products[key].name}</span>
          <span className="mx-auto text-gray-900 text-xl">{products[key].qty}</span>
          <span className=' text-xl'>${products[key].price * products[key].qty}</span>
          </div>
        )
        })
        }
        <div className="flex border-t border-gray-300 py-2">
          <span className="text-gray-500 text-xl font-bold">Subtotal:</span>
          <span className="m-auto text-gray-900 text-xl mr-0">${Total}</span>
        </div>
      </div>
    <Image width={400} height={200} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-xl shadow-md" src="/momo3.jpeg"></Image>
    </div>
  </div>
</section>
    </>
  )
}

export const getServerSideProps = async (context) => {
  await mongoose.connect(process.env.MONGO_URI);
  const order = await Order.findById(context.query.id);
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};

export default MyOrder