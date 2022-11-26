import { useEffect, useState } from "react";

const useTitle = (getTitle) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle(getTitle);
    document.title = `${title} - App`;
  }, [getTitle, title]);
  return [title];
};

export default useTitle;
