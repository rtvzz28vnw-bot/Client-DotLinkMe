import { useEffect, useState, useCallback } from "react";

const useScrollToTop = (threshold = 300) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const scrollCallback = () => {
      const scrolledFromTop = window.scrollY;
      setShown(() => scrolledFromTop > threshold);
    };

    window.addEventListener("scroll", scrollCallback);

    scrollCallback();

    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { shown, scrollToTop };
};

export default useScrollToTop;
