import { useEffect, useState } from "react";
import { generalItems } from "@/types/generalItems";

export default function useNavbarData() {
  const [genres, setGenres] = useState<generalItems[]>([]);
  const [playlists, setPlaylists] = useState<generalItems[]>([]);

  useEffect(() => {
    const fetchData = async (
      url: string,
      setter: React.Dispatch<React.SetStateAction<generalItems[]>>
    ) => {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    };

    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/genres`, setGenres);
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/playlists`, setPlaylists);
  }, []);

  return { genres, playlists };
}
