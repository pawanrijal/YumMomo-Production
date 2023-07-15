import React from "react";
import Image from "next/image";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
};

const momos = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container lg:px-5 lg:py-10 mx-auto">
          <div className="flex flex-wrap justify-center lg:justify-normal md:justify-normal">
                {products.map((item) => {
                    return (
                      <Link key={item._id} href={`/products/${item.slug}`}>
                    <div className="flex m-3 shadow-md hover:shadow-xl transition-all cursor-pointer p-2  rounded-lg">
                    <div className="" >
                      <div className="block ">
                        <Image
                          alt="ecommerce"
                          className="object-cover  object-center block rounded-md"
                          width={200}
                          height={200}
                          src={"/momo.jpeg"}
                        />
                      </div>
                      <div className="">
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {item.title}
                        </h2>
                        <p className="text-sm lg:text-md">${item.price}.00</p>
                      </div>
                    </div>
                    </div>
                    </Link>
                  );
                })}
            </div>
        </div>
      </section>
    </>
  );
};

export default momos;
