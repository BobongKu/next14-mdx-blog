import { useEffect, useRef, useState } from 'react';

export const useHeadingsObserver = (query: string) => {
  // [수정] 타입을 | null 로 변경하고, (null)을 인자로 전달합니다.
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeIdList, setActiveIdList] = useState<string[]>([]);
  const [tempId, setTempId] = useState('');

  useEffect(() => {
    const scrollMarginOption = { rootMargin: '-32px 0px -80px 0px' };

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const targetId = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          setActiveIdList((prev) => [...prev, targetId]);
          setTempId(() => '');
        } else {
          setActiveIdList((prev) => {
            if (prev.length === 1) setTempId(targetId);
            return prev.filter((elem) => elem !== targetId);
          });
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, scrollMarginOption);

    const elements = document.querySelectorAll(query);
    elements.forEach((elem) => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, [query]);

  return [...activeIdList, tempId];
};