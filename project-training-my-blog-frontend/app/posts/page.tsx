import Link from 'next/link';
import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import ArticleListCardComponent from '@/app/posts/_components/Article-list-card';
import DropDownComponent from '@/app/_components/DropDown';
import PaginationComponent from '@/app/_components/Pagination';

export default function Posts() {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>文章列表</li>
            </ul>
          </div>
          <h2 className="text-primary text-xl font-bold mb-4">文章列表</h2>
          <DropDownComponent />
          <p className="text-gray-500 text-sm mb-4">共 123 筆結果・第 1 頁 / 共 234 頁・目前顯示第 1 - 10 筆結果</p>
          <ArticleListCardComponent />
          <PaginationComponent />

        </div>
      </main>
      <FooterComponent />
    </>
  );
}