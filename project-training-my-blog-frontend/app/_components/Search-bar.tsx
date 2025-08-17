import { IoSearchOutline } from 'react-icons/io5';

type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBarComponent({
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <>
      <label className="input min-w-80">
        <IoSearchOutline />
        <input
          type="search"
          className="grow"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </>
  );
}
