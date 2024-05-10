"use client";
import { Spacer } from "@nextui-org/react";
import Image from "next/image";
import { CardParkingSpace } from "./card-parking-space";
import { SearchSection } from "./search-section";


export const Content = () => (
  <div className="flex w-full px-2">
    <div className='absolute top-0 left-0 w-full h-full max-h-[350px] md:max-h-[400px] z-0'>
      <Image
        src="/images/landing-photo.avif" // Path to your image
        alt="Description of image"
        layout="fill"
        objectFit="cover"
        objectPosition="50% 50%" // Adjust this value as needed
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-82 z-10"></div>

    </div>
    <div className="h-full lg:px-6 z-10 w-full">
      <div className="flex flex-col w-full h-full mt-6 md:mt-14 items-center">
        <h1 className=" text-2xl lg:text-4xl font-semibold text-white self-center text-center">Looking for a <span className="italic text-primary bold">space</span> to park?<br />Let&apos;s find one for <span className="italic text-primary bold">you</span>.</h1>
        <Spacer y={20} className="hidden md:block" />
        <Spacer y={14} className="md:hidden block" />
        <SearchSection />
      </div>


      <Spacer y={6} />
      {/* Table Latest Users */}
      <div className="flex flex-col justify-center w-full py-5 lg:px-0  max-w-[90rem] mx-auto gap-3">
        <div className="flex  flex-wrap justify-between md:mb-4">
          <h3 className="text-center text-2xl font-semibold">Parking spaces</h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {
            [... new Array(10).fill(9)].map((_, index) => <CardParkingSpace key={index} />)
          }
        </div>
      </div>
    </div>
  </div>

);
