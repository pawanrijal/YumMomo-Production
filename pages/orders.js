import React from "react";
import { useRouter } from "next/router.js";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myOrders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token }),
      });
      let res = await a.json();
      setOrders(res.orders);
    };
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);
  return (
    <>
      <div className="container mx-auto min-h-screen">
        <h1 className="text-4xl text-center m-4 font-semibold">
          My Orders
        </h1>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        # Order Id
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => {
                      return (
                      <tr key={item._id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.orderId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.Total}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link legacyBehavior href = {'/order/?id=' + item._id}><a>Details</a></Link>
                      </td>
                    </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Orders;
