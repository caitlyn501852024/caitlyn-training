'use client';

import DropDownComponent from '@/app/_components/DropDown';
import SearchBarComponent from '@/app/_components/Search-bar';
import PaginationComponent from '@/app/_components/Pagination';
import MyPostsListCardComponent from '@/app/profile/_components/My-posts-list-card';
import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';

type Props = {
  articles?: ArticleData;
  allTopics: { id: number; topic_name: string }[];
  selectedTopics: string[];
  onTopicsChangeAction: (topics: string[]) => void;
  articlePage: number;
  onPageChangeAction: (page: number) => void;
  articleSearchTerm: string;
  onSearchTermChangeAction: (term: string) => void;
};

type ArticleData = {
  articleData: Article[];
  pagination: Pagination;
};

type Article = {
  id: number;
  title: string;
  created_at?: string;
  topics?: { id: number; topic_name: string };
  commentCount?: number;
  article_imgs: Article_imgs[];
};

type Pagination = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  startItem: number;
  endItem: number;
};

type Article_imgs = {
  id: number;
  article_id: number;
  img_url?: string;
  img_order?: number;
  created_at: string;
};

export default function MyPostsComponent({
  articles,
  allTopics,
  selectedTopics,
  onTopicsChangeAction,
  articlePage,
  onPageChangeAction,
  articleSearchTerm,
  onSearchTermChangeAction,
}: Props) {
  if (!articles) return <p>載入中...</p>;

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <DropDownComponent
            topics={allTopics}
            selectedTopics={selectedTopics}
            onChange={onTopicsChangeAction}
          />
          <div className="flex items-center gap-2">
            {selectedTopics.map((topic, index) => (
              <div key={index} className="badge badge-primary gap-1">
                {topic}
                <button
                  className="hover:cursor-pointer"
                  onClick={() =>
                    onTopicsChangeAction(
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
                onClick={() => onTopicsChangeAction([])}
              >
                清除全部
              </button>
            )}
          </div>
        </div>
        <SearchBarComponent
          placeholder={'搜尋文章標題'}
          value={articleSearchTerm}
          onChange={onSearchTermChangeAction}
        />
      </div>
      <p className="text-gray-500 text-sm mb-4">
        共 {articles?.pagination?.totalCount ?? 0} 筆結果・第{' '}
        {articles?.pagination?.currentPage ?? 1} 頁 / 共{' '}
        {articles?.pagination?.totalPages ?? 1} 頁・目前顯示第{' '}
        {articles?.pagination?.startItem ?? 0} -{' '}
        {articles?.pagination?.endItem ?? 0} 筆結果
      </p>
      <section className="mb-4">
        {articles?.articleData.length > 0 ? (
          articles?.articleData.map((article: Article, index: number) => (
            <MyPostsListCardComponent
              key={index}
              article_id={article.id}
              topic={article.topics?.topic_name || ''}
              article_img_url={article.article_imgs[0]?.img_url || ''}
              created_at={LocaleDateTimeTransferUtility(
                article.created_at
              ).slice(0, 10)}
              title={article.title}
              comments_count={article.commentCount || 0}
            />
          ))
        ) : (
          <p>目前沒有文章喔～</p>
        )}
      </section>
      <PaginationComponent
        currentPage={articlePage}
        totalPages={articles?.pagination.totalPages}
        onPageChange={onPageChangeAction}
      />
    </>
  );
}
