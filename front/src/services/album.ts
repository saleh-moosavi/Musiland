export const getAlbums = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`);
  const data = await res.json();
  return data;
};
