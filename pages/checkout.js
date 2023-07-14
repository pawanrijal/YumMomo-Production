import React from "react";
import Link from "next/link";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCheckCircle,
  AiFillDelete,
} from "react-icons/ai";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Checkout = ({ cart, subTotal, addToCart, removeFromCart}) => {
  const Router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [user, setUser] = useState({value: null})


  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
    if(myuser.token){
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }
  }, [])
  
  const fetchData = async(token)=> {
    let data = {token: token}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data})
    });
    let res = await a.json()
    setName(res.name)
    setPhone(res.phone)
    setAddress(res.address)
  }

  const handleChange = () => (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
    if (e.target.name === "address") {
      setAddress(e.target.value);
    }
    if (e.target.name === "city") {
      setCity(e.target.value);
    }
  };

  const initiatePayment = async () => {
    if (name.length != 0 && email.length != 0 && phone.length != 0 && address.length != 0 && city.length != 0) {
    let oid = "OID" + Math.floor(Math.random() * 1000000000);
    const data = {
      orderId: oid,
      email,
      products: cart,
      address,
      Total: subTotal,
      phone,
  }
  let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let response = await res.json();
  if (response.success) {
    toast.success("Order created successfully", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(response);
    setTimeout(() => {
      Router.push(`/order?id=${response.data._id}`);
    }, 1500);
  }
  else{
    toast.error("Order creation failed", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}
else{
  toast.error("Please fill all the fields", {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
  };
  return (
    <div className="container px-4 sm:m-auto">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="font-bold text-3xl my-8 text-center ">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2 ">
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange()}
              type="text"
              value={name}
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (Default)
            </label>
            {user && user.token ? <input
              value={user.email}
              readOnly
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            /> :<input
            onChange={handleChange()}
            value={email}
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          /> }
            
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className="relative mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange()}
            value={address}
            cols="30"
            rows="1"
            type="text"
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2 ">
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone No.
            </label>
            <input
              onChange={handleChange()}
              placeholder="Format: 2041231234"
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div className="relative mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              onChange={handleChange()}
              value={city}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-xl">2. Review Cart Items</h2>
      <div className="sidecart right-0 px-8 py-10 my-2 rounded-lg  bg-red-200">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <p className="text-center">No items in your bag at the moment! <br/> Please choose some items before checkout.</p>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k} className="flex items-center">
                <div className="flex items-center">
                  <div className="font-semibold m-4">{cart[k].name}</div>
                  <div className="flex items-center justify-center font-semibold text-xl">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(k, 1, cart[k].price, cart[k].name);
                      }}
                      className="cursor-pointer text-red-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(k, 1, cart[k].price, cart[k].name);
                      }}
                      className="cursor-pointer text-red-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <span className="font-bold">Total: ${subTotal}</span>
        </ol>
        <div className="my-3"></div>
      </div>
      
        <div>
          <button
            onClick={initiatePayment}
            className="disabled:bg-red-400 flex text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-sm"
          >
            <span>Pay ${subTotal}</span>
            <AiFillCheckCircle className="ml-1 mt-0.5" />
          </button>
        </div>
      
    </div>
  );
};


export default Checkout;
