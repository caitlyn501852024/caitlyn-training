import { MdOutlineKeyboardArrowDown } from 'react-icons/md';


export default function DropDownComponent() {
  return (
    <>
      <div className="dropdown border-black border-b-2 mb-4 hover:cursor-pointer">
        <label tabIndex={0} className="flex items-center gap-2 py-1 px-2 hover:cursor-pointer">
          篩選主題 <MdOutlineKeyboardArrowDown />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">美食</span>
            </label>
          </li>
          <li>
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">旅遊</span>
            </label>
          </li>
          <li>
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">生活</span>
            </label>
          </li>
          <li>
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">科技</span>
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}