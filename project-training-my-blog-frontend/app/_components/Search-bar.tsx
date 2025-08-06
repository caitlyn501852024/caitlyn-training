import { IoSearchOutline } from 'react-icons/io5';

export default function SearchBarComponent() {
  return (
    <>
      <label className="input input-primary">
        <IoSearchOutline />
        <input type="search" className="grow" placeholder="搜尋" />
      </label>
    </>
  );
}