'use client';
import React, { useState, CompositionEvent, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';


type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBarComponent({
                                             placeholder,
                                             value,
                                             onChange
                                           }: Props) {
  const [isComposing, setIsComposing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    onChange(e.currentTarget.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);

    if (!isComposing) {
      onChange(e.currentTarget.value);
    }
  };

  return (
    <>
      <label className="input min-w-80">
        <IoSearchOutline />
        <input
          type="search"
          className="grow"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </label>
    </>
  );
}
