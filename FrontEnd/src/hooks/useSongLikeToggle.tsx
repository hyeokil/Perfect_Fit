import { useState } from "react";
import axios from "axios";

const useSongLikeToggle = () => {
  const [loading, setLoading] = useState<boolean>(false);

  

  return { toggleLike, loading };
};

export default useSongLikeToggle;
