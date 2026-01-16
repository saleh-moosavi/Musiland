"use client";
import "swiper/css";
import "swiper/css/navigation";
import { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SliderWrapper({ children }: { children: ReactNode[] }) {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper w-full flex place-items-center *:w-full *:h-full"
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
    >
      {children?.map((child: ReactNode, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
