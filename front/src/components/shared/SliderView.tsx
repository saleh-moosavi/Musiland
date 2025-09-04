"use client";
import "swiper/css";
import Link from "next/link";
import "swiper/css/navigation";
import PlayButton from "./PlayButton";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlidersResponsive } from "@/constants/window";
import Image from "next/image";

export default function SliderView({ data }: any) {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper w-full flex place-items-center *:w-full *:h-full"
      breakpoints={SlidersResponsive}
    >
      {data?.map((song: any) => (
        <SwiperSlide key={song._id}>
          <div className="relative group rounded-xl overflow-hidden">
            <Image
              src={song.coverUrl}
              alt={song.name}
              width={100}
              height={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full object-cover h-44"
              loading="lazy"
            />
            <p className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <PlayButton song={song} icon />
            </p>
          </div>
          <Link
            className="group dark:text-white"
            href={`/music/${song.singer?.name}-${song._id}`}
          >
            <p className="font-semibold mt-2">{song.name}</p>
            <p className="text-sm">{song.singer?.name || "Unknown Artist"}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
