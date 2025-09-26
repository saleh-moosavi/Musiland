export const getAllGenres = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
  const data = await res.json();
  return data;
};
