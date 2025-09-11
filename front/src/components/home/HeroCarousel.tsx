"use client";
import "swiper/css";
import Link from "next/link";
import "swiper/css/pagination";
import Image from "next/image";
import { GetSong } from "@/types/song";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { CarouselResponsive } from "@/constants/window";

export default function HeroCarousel() {
  const [songs, setSongs] = useState<GetSong[]>([]);
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
      } catch (error) {
        console.error("Error fetching songs:", error as string);
      } finally {
        setLoading(false);
      }
    }
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-52 flex justify-center gap-5 *:w-full *:h-full">
        <article className="rounded-3xl min-h-86 bg-my-white-high animate-pulse"></article>
        <article className="rounded-3xl min-h-86 bg-my-white-high animate-pulse"></article>
      </div>
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
          songs?.map((song: GetSong) => (
            <SwiperSlide className="relative" key={song._id}>
              <Link
                href={`/music/${song.singer?.name || "Unknown"}-${song._id}`}
              >
                <div className="flex flex-col gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 text-my-white-low text-center bg-my-black-max/50 px-2 py-1 rounded-xl">
                  <p>{song.singer?.name || "Unknown Artist"}</p>
                  <p>{song.name}</p>
                </div>
                <Image
                  src={song.coverUrl}
                  alt={song.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={100}
                  height={100}
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
