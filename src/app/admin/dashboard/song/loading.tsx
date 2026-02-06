import { ImageSkeleton, TextSkeleton } from "@/components/Skeleton";

export default function loading() {
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <TextSkeleton />
      <article className="grid sm:grid-cols-2 *:col-span-1 gap-5 w-full">
        {[0, 1, 2, 3].map((item) => {
          return <ImageSkeleton key={item} height="S" />;
        })}
      </article>
    </section>
  );
}
