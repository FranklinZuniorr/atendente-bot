import { useEffect, useState } from 'react';

const useCurrentScroll = (): number => {
  const [currentScrollPosition, setCurrentScrollPosition] = useState<number>(0);

  const handleDefineCurrentScrollPosition = () => {
    const currentScrollY = window.scrollY;
    setCurrentScrollPosition(currentScrollY);
  };
    
  useEffect(() => {
    window.addEventListener('scroll', handleDefineCurrentScrollPosition);

    return () => window.removeEventListener('scroll', handleDefineCurrentScrollPosition);
  }, []);

  return currentScrollPosition;
};

export default useCurrentScroll;