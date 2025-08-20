import SearchBarComponent from '@/app/_components/Search-bar';
import PaginationComponent from '@/app/_components/Pagination';
import MyCommentsListCardComponent from '@/app/profile/_components/My-comments-list-card';

import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';

type Props = {
  comments: Comments;
  commentPage: number;
  onPageChangeAction: (page: number) => void;
  commentSearchTerm: string;
  onSearchTermChangeAction: (term: string) => void;
  onDeleteCommentAction: (article_id: number, comment_id: number) => void;
};

type Comments = {
  commentData: Comment[];
  pagination: Pagination;
};

type Comment = {
  id: number;
  content: string;
  article_id: number;
  created_at: string;
  articles: Article;
};

type Article = {
  id: number;
  title: string;
  created_at?: string;
  topics?: { id: number; topic_name: string };
  commentCount?: number;
  article_imgs?: Article_imgs[];
  members?: { id: number; account: string; avatar_url: string };
};

type Article_imgs = {
  id: number;
  article_id: number;
  img_url?: string;
  img_order?: number;
  created_at: string;
};

type Pagination = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  startItem: number;
  endItem: number;
};

export default function MyCommentsComponent({
                                              comments,
                                              commentPage,
                                              onPageChangeAction,
                                              commentSearchTerm,
                                              onSearchTermChangeAction,
                                              onDeleteCommentAction
                                            }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">
          共 {comments?.pagination?.totalCount ?? 0} 筆結果・第{' '}
          {comments?.pagination?.currentPage ?? 1} 頁 / 共{' '}
          {comments?.pagination?.totalPages ?? 1} 頁・目前顯示第{' '}
          {comments?.pagination?.startItem ?? 0} -{' '}
          {comments?.pagination?.endItem ?? 0} 筆結果
        </p>
        <div className="flex justify-end">
          <SearchBarComponent
            placeholder={'搜尋留言內容或文章標題'}
            value={commentSearchTerm}
            onChange={onSearchTermChangeAction}
          />
        </div>
      </div>
      <section className="mb-4">
        {comments?.commentData?.length > 0 ? (
          comments.commentData.map((comment, index) => (
            <MyCommentsListCardComponent
              key={index}
              comment_id={comment.id}
              created_at={LocaleDateTimeTransferUtility(comment.created_at)}
              content={comment.content}
              article_id={comment.article_id}
              article_img_url={
                (comment?.articles?.article_imgs &&
                  comment?.articles?.article_imgs[0]?.img_url) ||
                '/imgs/article-default.webp'
              }
              title={comment.articles.title}
              author_avatar_url={comment?.articles?.members?.avatar_url || ''}
              author={comment.articles?.members?.account || ''}
              onDeleteCommentAction={onDeleteCommentAction}
            />
          ))
        ) : (
          <p>目前沒有留言喔～</p>
        )}
      </section>
      <PaginationComponent
        currentPage={commentPage}
        totalPages={comments?.pagination.totalPages}
        onPageChange={onPageChangeAction}
      />
    </>
  );
}
