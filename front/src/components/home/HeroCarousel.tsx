"use client";
import "swiper/css";
import Link from "next/link";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { CarouselResponsive } from "@/constants/window";

export default function HeroCarousel() {
  const [songs, setSongs] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/songs?page=1,10&sort=date`
        );
        if (!response.ok) throw new Error("Failed to fetch songs");
        const data = await response.json();
        setSongs(data);
      } catch (error: any) {
        console.error("Error fetching songs:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        className="mySwiper w-full flex place-items-center *:w-full *:h-full"
        breakpoints={CarouselResponsive}
      >
        {[1, 2].map((index: any) => (
          <SwiperSlide key={index}>
            <div className="object-cover rounded-3xl w-full h-86 bg-gray-300 animate-pulse"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  } else {
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
        {songs &&
          songs?.map((song: any) => (
            <SwiperSlide className="relative" key={song.id}>
              <Link
                href={`/music/${song.singer?.name || "Unknown"}-${song._id}`}
              >
                <div className="flex flex-col gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-center bg-black/50 px-2 py-1 rounded-xl">
                  <p>{song.singer?.name || "Unknown Artist"}</p>
                  <p>{song.name}</p>
                </div>
                <img
                  src={song.coverUrl}
                  alt={song.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-3xl w-full h-86"
                  loading="lazy"
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  }
}
