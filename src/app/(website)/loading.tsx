import {
  TextSkeleton,
  ImageSkeleton,
  SliderSkeleton,
} from "@/components/Skeleton";

export default function loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <TextSkeleton />
      {/* Hero Carousel */}
      <div className="h-full w-full grid grid-cols-2 gap-5">
        <ImageSkeleton height="M" />
        <ImageSkeleton height="M" />
      </div>
      {/* Sliders */}
      <section className="grid w-full min-h-full gap-10">
        {[0, 1, 2].map((item) => (
          <SliderSkeleton key={item} />
        ))}
      </section>
    </div>
  );
}
