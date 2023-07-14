import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/Bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response =  res;
    setEmail("");
    setName("");
    setPassword("");
    toast.success("Account Succesfully Created, Please login.", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  return (
    <>
      <section className="">
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-10 lg:py-0">
          <div className="w-full bg-white rounded-md md:mt-0 sm:max-w-md xl:p-0 shadow-lg">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl leading-tight tracking-tight text-black md:text-2xl">
                Sign up to create your account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your Name
                  </label>
                  <input
                    value={name}
                    onChange={handleChange()}
                    type="text"
                    name="name"
                    id="name"
                    className="text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border border-gray-300"
                    placeholder="name goes here"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={handleChange()}
                    type="email"
                    name="email"
                    id="email"
                    className="text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border border-gray-300"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={handleChange()}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                
                <div className="">
                  <button className="w-full text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded-md text-sm">
                    <BsArrowRightCircleFill className="m-auto" />
                    Sign Up
                  </button>
                  <Link href={"/login"}>
                    <button className="w-full my-3 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded-md text-sm">
                      {" "}
                      <BsArrowLeftCircleFill className="m-auto" />
                      Back to login
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
