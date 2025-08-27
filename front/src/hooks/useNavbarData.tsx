import { useEffect, useState } from "react";
import checkSavedData from "@/libs/checkSavedData";

export default function useNavbarData() {
  const [genres, setGenres] = useState<any>([]);
  const [playlists, setPlaylists] = useState<any>([]);

  useEffect(() => {
    const fetchData = async (
      url: string,
      setter: React.Dispatch<React.SetStateAction<any>>
    ) => {
      await checkSavedData();
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    };

    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/genres`, setGenres);
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/playlists`, setPlaylists);
  }, []);

  return { genres, playlists };
}
