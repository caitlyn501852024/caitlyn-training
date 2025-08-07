'use client';

import { useEffect, useState } from 'react';
import { LuArrowUpToLine } from 'react-icons/lu';

export default function ToTopComponent() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showButton ? (
    <>
      <button
        onClick={scrollToTop}
        className="fixed flex justify-center items-center bottom-8 right-4 w-9 h-9 bg-black rounded-full text-white text-xl hover:bg-primary">
        <LuArrowUpToLine />
      </button>
    </>
  ) : null;
}