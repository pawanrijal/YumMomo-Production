import React from "react";
import Image from "next/image";
import { BsFillBagCheckFill } from "react-icons/bs";

import Link from "next/link";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCheckCircle,
  AiFillDelete,
} from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NavBar2 = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length === 0 && setSidebar(true);

    let exempted = ["/checkout", "/orders", "/order", "/myaccount", "/momos", "/", "/about", "/contact", "/login", "/signup"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, [cart, router.pathname]);

  const toggleCart = () => {
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full');
    //   ref.current.classList.add('translate-x-0');
    // }
    // else {
    //   ref.current.classList.remove('translate-x-0');
    //   ref.current.classList.add('translate-x-full');
    // }
    setSidebar(!sidebar);
  };
  const ref = React.useRef();
  return (
    <>
      <header className={`text-gray-600 body-font shadow-md`}>
        <div
          className={`container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ${
            !sidebar && "overflow-hidden"
          }`}
        >
          <nav className="flex lg:w-2/5 flex-wrap items-center md:ml-auto sm:ml-auto text-sm lg:text-lg">
            <Link
              href={"/"}
              className="mr-5 hover:text-gray-900 cursor-pointer font-bold"
            >
              Home
            </Link>
            <Link
              href={"/about"}
              className="mr-5 hover:text-gray-900 cursor-pointer font-bold"
            >
              About Us
            </Link>
            <Link
              href={"/contact"}
              className="mr-5 hover:text-gray-900 cursor-pointer font-bold"
            >
              Contact Us
            </Link>
            <Link
              href={"/feedback"}
              className="hover:text-gray-900 cursor-pointer font-bold"
            >
              FeedBack
            </Link>
          </nav>
          <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <Image alt="logo" width={100} height={100} src="/logo2.jpg" />
            <span className="ml-3 text-xl">Yum Momo</span>
          </div>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <div className="flex justify-center my-3">
              <span
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
              >
                {dropdown && (
                  <div
                    onClick={() => {
                      setDropdown(true);
                    }}
                    onMouseOver={() => {
                      setDropdown(true);
                    }}
                    onMouseLeave={() => {
                      setDropdown(false);
                    }}
                    className="absolute shadow-lg right-44 w-40 top-20 p-3 rounded-lg bg-red-200"
                  >
                    <ul>
                      <Link legacyBehavior href={"/myaccount"}>
                        <a>
                          <li className="font-bold cursor-pointer py-1 hover:text-red-500 ">
                            My Account
                          </li>
                        </a>
                      </Link>
                      <Link legacyBehavior href={"/orders"}>
                        <a>
                          <li className="font-bold cursor-pointer py-1 hover:text-red-500">
                            Orders
                          </li>
                        </a>
                      </Link>
                      <li
                        onClick={logout}
                        className="font-bold cursor-pointer py-1 hover:text-red-500"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
                {user.value && (
                  <MdAccountCircle className="text-4xl mx-3 text-red-500 hover:text-red-600 cursor-pointer " />
                )}
              </span>
              {!user.value && (
                <Link legacyBehavior href={"/login"}>
                  <a>
                    <button className="mr-2 my-0.5 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded-lg">
                      Login
                    </button>
                  </a>
                </Link>
              )}
              <BsFillBagCheckFill
                onClick={toggleCart}
                className="text-3xl text-red-500 hover:text-red-600 cursor-pointer"
              />
            </div>

            <div
              ref={ref}
              className={`shadow-2xl h-[100vh] sidecart overflow-y-scroll absolute w-72 top-0 bg-red-200 px-8 py-10 rounded-2xl transition-all ${
                sidebar ? "right-0" : "right-full"
              } transform z-10`}
            >
              <h2 className="font-bold text-xl text-center mb-3">Your Bag</h2>
              <span
                onClick={toggleCart}
                className="absolute top-2 right-2 cursor-pointer text-2xl text-red-500"
              >
                <AiFillCloseCircle />
              </span>
              <ol className="list-decimal font-semibold">
                {Object.keys(cart).length == 0 && (
                  <p className="text-center">
                    No items in your bag at the moment!
                  </p>
                )}
                {Object.keys(cart).map((k) => {
                  return (
                    <div key={k} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <li className="font-semibold m-4">{cart[k].name}</li>
                        <div className="flex items-center justify-center w-1/3 font-semibold text-xl">
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
                    </div>
                  );
                })}
              </ol>
              <div className="flex space-x-3 my-3">
                {Object.keys(cart).length === 0 ? (
                  <button
                    disabled
                    className="disabled:bg-gray-400 flex text-white bg-black border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-sm"
                  >
                    <span>Check Out</span>
                    <AiFillCheckCircle className="ml-1 mt-0.5" />
                  </button>
                ) : (
                  <Link href="/checkout">
                    <button className="flex text-white bg-black border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-sm">
                      <span>Check Out</span>
                      <AiFillCheckCircle className="ml-1 mt-0.5" />
                    </button>
                  </Link>
                )}
                <button
                  disabled={Object.keys(cart).length == 0}
                  onClick={clearCart}
                  className="disabled:bg-red-300 flex text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"
                >
                  <span>Clear Cart</span>
                  <AiFillDelete className="ml-1 mt-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar2;
