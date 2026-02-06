import { TextSkeleton } from "@/components/Skeleton";

export default function loading() {
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <TextSkeleton />
      <article className="grid sm:grid-cols-2 lg:grid-cols-3 *:col-span-1 gap-5">
        {[0, 1, 2, 3, 4, 5].map((item) => {
          return <TextSkeleton key={item} height="M" />;
        })}
      </article>
    </section>
  );
}
