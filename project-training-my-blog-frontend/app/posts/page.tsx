import Link from 'next/link';
import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import ArticleListCardComponent from '@/app/posts/_components/Article-list-card';
import DropDownComponent from '@/app/_components/DropDown';
import SearchBarComponent from '@/app/_components/Search-bar';
import PaginationComponent from '@/app/_components/Pagination';
import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';

type Topic = {
  topic_name: string,
}

type Member = {
  account: string,
  nickname: string,
  avatar_url: string,
}

type ArticleImgs = {
  id: number;
  article_id: number;
  img_url?: string;
  img_order?: number;
  created_at: string;
};

type Articles = {
  id: number,
  title: string,
  content: string,
  topic_id: number,
  created_at: string,
  updated_at: string,
  views: number,
  member_id: number,
  topics: Topic,
  members: Member,
  article_imgs: ArticleImgs[],
}

type Pagination = {
  totalCount: number,
  totalPages: number,
  currentPage: number,
  startItem: number,
  endItem: number,
}

type Data = {
  articles: Articles[],
  pagination: Pagination,
}

export default async function Posts() {
  let data: Data | null = null;
  try {
    const result = await fetch('http://localhost:3001/api/posts');
    data = await result.json();
  } catch (err) {

  }

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
          <div className="flex justify-between">
            <DropDownComponent />
            <SearchBarComponent />
          </div>
          <p
            className="text-gray-500 text-sm mb-4">共 {data?.pagination.totalCount} 筆結果・第 {data?.pagination.currentPage} 頁
            /
            共 {data?.pagination.totalPages} 頁・目前顯示第 {data?.pagination.startItem} - {data?.pagination.endItem} 筆結果</p>
          <section className="mb-4">
            {data?.articles ? data?.articles?.map((article: Articles, index: number) => (
              <ArticleListCardComponent key={index}
                                        topic={article.topics.topic_name}
                                        article_img_url={article.article_imgs[0]?.img_url || '/imgs/test.jpg'}
                                        title={article.title}
                                        author_img_url={article.members.avatar_url}
                                        author={article.members.account}
                                        created_at={LocaleDateTimeTransferUtility(article.created_at).slice(0,10)}
              />

            )) : (<p>目前沒有文章喔～</p>)}

          </section>
          <PaginationComponent />
        </div>
      </main>
      <FooterComponent />
    </>
  );
}