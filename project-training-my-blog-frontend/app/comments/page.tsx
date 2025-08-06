import Link from 'next/link';
import NavbarComponent from '@/app/_components/Navbar';
import CommentListCardComponent from '@/app/comments/_components/Comment-list-card';
import FooterComponent from '@/app/_components/Footer';
import SearchBarComponent from '@/app/_components/Search-bar';
import PaginationComponent from '@/app/_components/Pagination';

export default function Comments() {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>留言列表</li>
            </ul>
          </div>
          <h2 className="text-primary text-xl font-bold mb-4">留言列表</h2>
          <div className="flex justify-end">
            <SearchBarComponent />
          </div>
          <p className="text-gray-500 text-sm mb-4">共 123 筆結果・第 1 頁 / 共 234 頁・目前顯示第 1 - 10 筆結果</p>
          <section className="mb-4">
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
            <CommentListCardComponent />
          </section>
          <PaginationComponent />
        </div>
      </main>
      <FooterComponent />
    </>
  );
}