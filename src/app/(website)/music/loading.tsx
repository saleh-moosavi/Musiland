import {
  CommentSkeleton,
  ImageSkeleton,
  SliderSkeleton,
  TextSkeleton,
} from "@/components/Skeleton";

export default function loading() {
  return (
    <>
      {/* Music Section */}
      <div className="grid lg:grid-cols-3 items-start gap-10 w-full h-full">
        <ImageSkeleton height="L" />

        <section className="*:w-full h-full flex flex-col justify-between">
          <div className="flex flex-col justify-between h-full">
            <article className="space-y-2">
              <TextSkeleton />
              <TextSkeleton />
            </article>
            <article className="space-y-2 my-5">
              <TextSkeleton />
              <TextSkeleton />
              <TextSkeleton />
            </article>
          </div>

          <div className="space-y-2 h-full">
            <TextSkeleton />
            <TextSkeleton />

            <div className="flex justify-between items-center gap-5">
              <TextSkeleton />
              <TextSkeleton />
              <TextSkeleton />
            </div>
          </div>
        </section>

        <div className="h-full flex flex-col gap-y-5">
          <TextSkeleton />
          <ImageSkeleton height="L" />
        </div>
      </div>

      {/* Comment Section */}
      <CommentSkeleton />

      {/* Slider Section */}
      <SliderSkeleton />
    </>
  );
}
