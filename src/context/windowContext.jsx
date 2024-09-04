import { createContext, useContext, useEffect, useRef, useState } from "react";

const WindowContext = createContext();

export const useWindowContext = () => {
  return useContext(WindowContext);
};

export default function WindowContextProvider({ children }) {
  const [progressWidth, setProgressWidth] = useState(0);
  const divRef = useRef(null);

const handleScroll = () => {
    const scrollDiv = divRef.current;

    if (scrollDiv) {
      const scrollPosition = scrollDiv.scrollTop;
      const scrollHeight = scrollDiv.scrollHeight - scrollDiv.clientHeight;

      const scrollWidth = (scrollPosition / scrollHeight) * 100;
      setProgressWidth(scrollWidth);
    }
  };

  useEffect(() => {
    
      if (divRef.current) {
        const divScroll = divRef.current;
      console.log(divScroll);
      
      divScroll.addEventListener("scroll", handleScroll);
      // Cleanup event listener on component unmount
      return () => divScroll.removeEventListener("scroll", handleScroll);
      }
    
  }, []); // Empty dependency array ensures the event listener is added once

  return (
    <WindowContext.Provider value={{ progressWidth, divRef }}>
      {children}
    </WindowContext.Provider>
  );
}
