import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FaLongArrowAltRight } from 'react-icons/fa';

export default function PaginationComponent() {
  return (
    <>
      <div className="flex gap-8 text-center justify-center">
        <button className="join-item"><FaLongArrowAltLeft /></button>
        <button className="join-item">1</button>
        <button className="join-item">2</button>
        <button className="join-item">3</button>
        <button className="join-item">4</button>
        <button className="join-item">5</button>
        <button className="join-item">6</button>
        <button className="join-item">7</button>
        <button className="join-item">8</button>
        <button className="join-item"><FaLongArrowAltRight /></button>
      </div>
    </>
  );
}