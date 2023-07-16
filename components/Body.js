import React from "react";
import Image from "next/image";
import Link from "next/link";

const Body = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-8 items-center justify-center flex-col">
          <Image
            width={600}
            height={400}
            className="lg:w-2/6 md:w-3/6 w-5/6 object-cover object-center rounded-lg shadow-lg"
            alt="hero"
            src="/momo3.jpeg"
          />
          <div className="text-center lg:w-2/3 w-full mt-7">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            &quot;Delight in the Divine Flavors of Yum-Momo&apos;s Irresistible Dumplings!&quot;
            </h1>
            <p className="mb-8 leading-relaxed">
            Yum-Momo is a culinary haven dedicated to crafting exquisite and authentic dumplings that will transport your taste buds to the bustling streets of Nepal. 
            With our secret family recipes passed down through generations, we meticulously handcraft each dumpling, ensuring a perfect balance of flavors and textures. 
            From the delicate folds of our steamed momos to the delectable crispness of our pan-fried varieties, Yum-Momo offers a culinary experience that will leave you craving more of our tantalizing momos.
            </p>
            <div className="flex justify-center">
              <Link href={"/momos"}><button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                Explore Menus
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Body;
