"use client";
import { Spacer } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SearchSection } from "./search-section";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => (
  <div className="flex">
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
    <div className="h-full lg:px-6 z-10">
      <div className="flex flex-col w-full h-full mt-6 md:mt-14 items-center">
        <h1 className="text-3xl font-semibold text-white self-center text-center">Looking for overnight parking?</h1>
        <Spacer y={16} />
        <SearchSection />
      </div>

      {/* Table Latest Users */}
      {/* <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
        <div className="flex  flex-wrap justify-between">
          <h3 className="text-center text-xl font-semibold">Latest Users</h3>
        </div>
        <TableWrapper />
      </div> */}
    </div>
  </div>

);
