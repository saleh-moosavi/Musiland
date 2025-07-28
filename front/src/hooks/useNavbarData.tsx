import checkSavedData from "@/libs/checkSavedData";
import { useEffect, useState } from "react";

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
      setter(data.data);
    };

    fetchData(
      `http://localhost:1337/api/genres?&populate=[genre][fields]=id,name`,
      setGenres
    );
    fetchData(
      `http://localhost:1337/api/playlists?&populate=[playlists][fields]=id,name`,
      setPlaylists
    );
  }, []);
  return { genres, playlists };
}
