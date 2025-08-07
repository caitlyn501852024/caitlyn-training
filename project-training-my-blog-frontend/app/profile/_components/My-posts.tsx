import DropDownComponent from '@/app/_components/DropDown';
import SearchBarComponent from '@/app/_components/Search-bar';
import PaginationComponent from '@/app/_components/Pagination';
import MyPostsListCardComponent from '@/app/profile/_components/My-posts-list-card';

export default function MyPostsComponent() {
  return (
    <>
      <div className="flex justify-between">
        <DropDownComponent />
        <SearchBarComponent />
      </div>
      <p className="text-gray-500 text-sm mb-4">共 123 筆結果・第 1 頁 / 共 234 頁・目前顯示第 1 - 10 筆結果</p>
      <section className="mb-4">
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
        <MyPostsListCardComponent />
      </section>
      <PaginationComponent />
    </>
  );
}