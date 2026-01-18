export default function loading() {
  return (
    <>
      <h2 className="mb-5 mx-auto bg-my-black-med w-52 h-8 animate-pulse rounded-lg"></h2>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-10">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((item) => (
          <div
            className="self-start bg-my-black-med h-44 w-full rounded-xl animate-pulse"
            key={item}
          ></div>
        ))}
      </section>
    </>
  );
}
