import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FaLongArrowAltRight } from 'react-icons/fa';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent(props: Props) {
  const { currentPage, totalPages, onPageChange } = props;

  if (!currentPage || !totalPages) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];

    // 頁數少於 7 頁時，全部顯示
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      for (let i = 1; i <= 7; i++) {
        pages.push(i);
      }
      if (totalPages > 7) {
        pages.push('...');
      }
    } else if (currentPage >= totalPages - 3) {
      if (totalPages > 7) {
        pages.push('...');
      }
      for (let i = totalPages - 6; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push('...');
      for (let i = currentPage - 3; i <= currentPage + 3; i++) {
        pages.push(i);
      }
      pages.push('...');
    }
    return pages;
  };

  const pages = getPages();

  return (
    <>
      <div className="flex gap-4 text-center justify-center items-center">
        <button className="join-item btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
        ><FaLongArrowAltLeft /></button>

        {pages.map((page, index) =>
          typeof page === 'string' ? (
            <span key={index} className="join-item">{page}</span>
          ) : (
            <button key={index} className={`join-item btn ${currentPage === page ? 'bg-primary text-white' : ''}`}
                    onClick={() => onPageChange(page)}
            >{page}</button>
          )
        )
        }
        <button className="join-item btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
        ><FaLongArrowAltRight /></button>
      </div>
    </>
  );
};