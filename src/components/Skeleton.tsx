export function TextSkeleton({
  width = "L",
  height = "S",
}: {
  width?: "S" | "M" | "L";
  height?: "S" | "M" | "L";
}) {
  return (
    <p
      className={`bg-my-black-med animate-pulse rounded-lg ${
        width === "S" ? "w-32" : width === "M" ? "w-52" : "w-full"
      } ${height === "S" ? "h-8" : height === "M" ? "h-20" : "h-44"}`}
    ></p>
  );
}

export function ImageSkeleton({ height = "S" }: { height?: "S" | "M" | "L" }) {
  return (
    <article
      className={`rounded-xl bg-my-black-med animate-pulse w-full ${
        height === "S" ? "h-44" : height === "M" ? "h-96" : "h-full"
      }`}
    ></article>
  );
}

export function CommentSkeleton() {
  return (
    <section className="my-10 space-y-5">
      <TextSkeleton height="M" />
      <article className="space-y-3">
        <TextSkeleton height="L" />
        <TextSkeleton height="L" />
        <TextSkeleton height="L" />
      </article>
    </section>
  );
}

export function SliderSkeleton() {
  return (
    <article className="space-y-5 w-full">
      <TextSkeleton height="M" />
      <section className="grid grid-cols-2 md:grid-cols-4 items-center gap-5 min-h-32">
        {[0, 1, 2, 3].map((item) => (
          <article
            className={`h-full w-full space-y-2 ${
              item > 1 && "hidden md:block"
            }`}
            key={item}
          >
            <ImageSkeleton />

            <TextSkeleton />
            <TextSkeleton />
          </article>
        ))}
      </section>
    </article>
  );
}
