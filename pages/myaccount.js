import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';



const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [user, setUser] = useState({value: null})
    const router = useRouter();
    useEffect(() => {
      const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (!myuser) {
            router.push("/");
        }
        if(myuser && myuser.token){
          setUser(myuser)
          setEmail(myuser.email)
          fetchData(myuser.token)
          
        }
    }, []);

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

    const handleUserSubmit = async() => {
    let data = {token: user.token, address, phone, name}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data})
    });
    let res = await a.json()
    toast.success("User Updated"), {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  };

    const handleChange = () => (e) => {
      if (e.target.name === "name") {
        setName(e.target.value);
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
  return (
    <div className="container px-4 sm:m-auto min-h-screen">
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
      <h1 className="font-bold text-3xl my-8 text-center ">Update My Account</h1>
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
      </div>
          <button onClick={handleUserSubmit} className="flex ml-3 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Update</button>
      </div>
  )
}



export default MyAccount