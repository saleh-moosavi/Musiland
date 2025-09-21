"use client";
import "swiper/css";
import "swiper/css/navigation";
import { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlidersResponsive } from "@/constants/window";

export default function SliderWrapper({ children }: { children: ReactNode[] }) {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper w-full flex place-items-center *:w-full *:h-full"
      breakpoints={SlidersResponsive}
    >
      {children?.map((child: ReactNode, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
