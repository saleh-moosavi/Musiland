export const getAllPlaylists = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists`);
  const data = await res.json();
  return data;
};
