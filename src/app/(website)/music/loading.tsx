export default function loading() {
  return (
    <>
      {/* Music Section */}
      <div className="grid lg:grid-cols-3 items-start gap-10 w-full h-full">
        <article className="col-span-1 rounded-3xl h-full w-full bg-my-black-med animate-pulse"></article>

        <section className="col-span-1 *:w-full h-full flex flex-col justify-between">
          <div className="flex flex-col justify-between h-full">
            <article className="space-y-2">
              <h3 className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></h3>
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
            </article>
            <article className="space-y-2 my-5">
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
            </article>
          </div>

          <div className="col-span-1 space-y-2 h-full">
            <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
            <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>

            <div className="flex justify-between items-center gap-5">
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
            </div>
          </div>
        </section>

        <div className="col-span-1 h-full flex flex-col gap-y-5">
          <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
          <p className="w-full h-full bg-my-black-med animate-pulse rounded-lg"></p>
        </div>
      </div>

      {/* Comment Section */}
      <section className="my-10 space-y-5">
        <p className="h-20 w-full bg-my-black-med animate-pulse rounded-lg"></p>
        <ul className="space-y-2">
          {[0, 1, 2].map((item) => {
            return (
              <li
                key={item}
                className="bg-my-black-med space-y-3 animate-pulse rounded-xl h-40"
              ></li>
            );
          })}
        </ul>
      </section>

      {/* Slider Section */}
      <article className="space-y-5 pb-32">
        <section className="h-20 w-full bg-my-black-med animate-pulse rounded-lg"></section>
        <section className="grid grid-cols-2 md:grid-cols-4 items-center gap-5 h-32">
          {[0, 1, 2, 3].map((item) => (
            <article
              className={`h-full w-full space-y-2 ${
                item > 1 && "hidden md:block"
              }`}
              key={item}
            >
              <article className="w-full object-cover h-44 rounded-xl bg-my-black-med animate-pulse"></article>

              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
              <p className="h-8 w-full bg-my-black-med animate-pulse rounded-lg"></p>
            </article>
          ))}
        </section>
      </article>
    </>
  );
}
