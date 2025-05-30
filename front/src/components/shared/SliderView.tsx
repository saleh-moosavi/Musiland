"use client";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { SlidersResponsive } from "@/constants/window";
import { Swiper, SwiperSlide } from "swiper/react";

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
        <SwiperSlide key={song.id}>
          <Link href={`/music/${song.singer?.name} - ${song.documentId}`}>
            <img
              src={song.coverUrl}
              alt={song.name}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full object-cover rounded-xl h-44 bg-gray-200"
              loading="lazy"
            />
            <p className="font-semibold mt-2">{song.name}</p>
            <p className="text-sm">{song.singer?.name || "Unknown Artist"}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
