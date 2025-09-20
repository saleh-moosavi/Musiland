"use client";
import "swiper/css";
import "swiper/css/pagination";
import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { CarouselResponsive } from "@/constants/window";

export default function HeroCarouselWrapper({
  children,
}: {
  children: ReactNode[];
}) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
      className="mySwiper w-full flex place-items-center *:w-full *:h-full"
      breakpoints={CarouselResponsive}
    >
      {children.map((child, index) => (
        <SwiperSlide className="relative" key={index}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
