import { ImageSkeleton, TextSkeleton } from "@/components/Skeleton";

export default function loading() {
  return (
    <>
      <TextSkeleton />
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-10 mt-10">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((item) => (
          <ImageSkeleton key={item} />
        ))}
      </section>
    </>
  );
}
