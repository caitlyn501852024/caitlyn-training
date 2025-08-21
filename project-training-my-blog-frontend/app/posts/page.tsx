'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import ArticleListCardComponent from '@/app/posts/_components/Article-list-card';
import DropDownComponent from '@/app/_components/DropDown';
import SearchBarComponent from '@/app/_components/Search-bar';
import PaginationComponent from '@/app/_components/Pagination';
import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';

type Topic = {
  topic_name: string;
};

type Member = {
  account: string;
  nickname: string;
  avatar_url: string;
};

type ArticleImgs = {
  id: number;
  article_id: number;
  img_url?: string;
  img_order?: number;
  created_at: string;
};

type Articles = {
  id: number;
  title: string;
  content: string;
  topic_id: number;
  created_at: string;
  updated_at: string;
  views: number;
  member_id: number;
  topics: Topic;
  members: Member;
  article_imgs: ArticleImgs[];
};

type Pagination = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  startItem: number;
  endItem: number;
};

type Data = {
  allTopics: Topic[];
  articles: Articles[];
  pagination: Pagination;
};

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 各種狀態管理
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [page, setPage] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Data | null>({
    allTopics: [],
    articles: [],
    pagination: {
      totalCount: 0,
      totalPages: 1,
      currentPage: 1,
      startItem: 0,
      endItem: 0
    }
  });

  // 進入本頁或 URL 改變時時從網址拿 query string 並同步狀態
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1');
    const urlTopics =
      searchParams.get('topics')?.split(',').filter(Boolean) || [];
    const urlSearchTerm = searchParams.get('searchTerm') || '';

    if (page !== urlPage) setPage(urlPage);
    if (JSON.stringify(selectedTopics) !== JSON.stringify(urlTopics)) setSelectedTopics(urlTopics);
    if (searchTerm !== urlSearchTerm) setSearchTerm(urlSearchTerm);

    fetchData(urlPage, urlTopics, urlSearchTerm);
  }, [searchParams]);

  // fetch api
  const fetchData = async (urlPage: number, urlTopics: string[], urlSearchTerm: string) => {
    const params = new URLSearchParams();
    if (urlPage > 1) params.set('page', urlPage.toString());
    if (urlTopics.length > 0)
      params.set('topics', urlTopics.join(','));
    if (urlSearchTerm) params.set('searchTerm', urlSearchTerm);

    try {
      const res = await fetch(`http://localhost:3001/api/posts?${params}`);
      const result = await res.json();

      setData(result);
      setAllTopics(result.allTopics);
    } catch (err) {
      console.error(err);
    }
  };

  // 狀態改變時更新 URL
  const handleStateChange = (newPage: number, newTopics: string[], newSearchTerm: string) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', newPage.toString());
    if (newTopics.length > 0) params.set('topics', newTopics.join(','));
    if (newSearchTerm) params.set('searchTerm', newSearchTerm);
    router.push(`/posts?${params.toString()}`);
  };

  // 搜尋欄 input 改變
  const handleSearchTermChange = (value: string) => {
    handleStateChange(1, selectedTopics, value);
  };

  // 篩選主題改變
  const handleTopicsChange = (newSelectedTopics: string[]) => {
    handleStateChange(1, newSelectedTopics, searchTerm);
  };

  // 切換分頁
  const handlePageChange = (newPage: number) => {
    handleStateChange(newPage, selectedTopics, searchTerm);
  };

  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li>
                <Link href="/">首頁</Link>
              </li>
              <li>文章列表</li>
            </ul>
          </div>
          <h2 className="text-primary text-xl font-bold mb-4">文章列表</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <DropDownComponent
                topics={allTopics}
                selectedTopics={selectedTopics}
                onChange={handleTopicsChange}
              />
              <div className="flex items-center gap-2">
                {selectedTopics.map((topic, index) => (
                  <div key={index} className="badge badge-primary gap-1">
                    {topic}
                    <button
                      className="hover:cursor-pointer"
                      onClick={() =>
                        handleTopicsChange(
                          selectedTopics.filter((t) => t !== topic)
                        )
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {selectedTopics.length > 0 && (
                  <button
                    className="btn btn-sm block border-gray-400 text-gray-500 ms-3"
                    onClick={() => handleTopicsChange([])}
                  >
                    清除全部
                  </button>
                )}
              </div>
            </div>
            <SearchBarComponent
              placeholder={'搜尋文章標題或作者'}
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          {/*<pre>{JSON.stringify(data, null, 4)}</pre>*/}
          <p className="text-gray-500 text-sm mb-4">
            共 {data?.pagination.totalCount ?? 0} 筆結果・第{' '}
            {data?.pagination.currentPage ?? 1} 頁 / 共{' '}
            {data?.pagination.totalPages ?? 1} 頁・目前顯示第{' '}
            {data?.pagination.startItem ?? 0} - {data?.pagination.endItem ?? 0}{' '}
            筆結果
          </p>
          <section className="mb-4">
            {data?.articles && data?.articles.length > 0 ? (
              data?.articles?.map((article: Articles, index: number) => (
                <ArticleListCardComponent
                  key={index}
                  id={article.id}
                  topic={article.topics.topic_name}
                  article_img_url={
                    article.article_imgs[0]?.img_url ||
                    '/imgs/article-default.webp'
                  }
                  title={article.title}
                  author_img_url={article.members.avatar_url}
                  author={article.members.account}
                  created_at={LocaleDateTimeTransferUtility(
                    article.created_at
                  ).slice(0, 10)}
                />
              ))
            ) : (
              <p>目前沒有文章喔～</p>
            )}
          </section>

          {data?.pagination && (
            <PaginationComponent
              currentPage={data.pagination.currentPage}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
      <FooterComponent />
    </>
  );
};
