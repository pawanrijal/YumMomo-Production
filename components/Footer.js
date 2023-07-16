import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto justify-center flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image alt="logo" src={"/logo2.jpg"} width={50} height={50} />
            <span className="ml-3 text-xl">Yum Momo</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2023 Yum momo
          </p>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            For best Experience please use Laptop/Desktop
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
