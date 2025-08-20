'use client';
import { useState } from 'react';
import MyPostsComponent from '@/app/profile/_components/My-posts';
import MyCommentsComponent from '@/app/profile/_components/My-comments';

type Props = {
  articles?: ArticleData;
  comments?: CommentData;

  articlePage: number;
  onArticlePageChange: (page: number) => void;
  articleSearchTerm: string;
  onArticleSearchTermChange: (term: string) => void;
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;

  commentPage: number;
  onCommentPageChange: (page: number) => void;
  commentSearchTerm: string;
  onCommentSearchTermChange: (term: string) => void;

  allTopics: { id: number; topic_name: string }[];

  onDeletePostAction: (articleId: number) => void;
  onDeleteCommentAction: (articleId: number, commentId: number) => void;
};

type Pagination = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  startItem: number;
  endItem: number;
};

type Article = {
  id: number;
  title: string;
  createdAt?: string;
  topics?: { id: number; topicName: string };
  commentCount?: number;
};

type Comment = {
  id: number;
  content: string;
  articleId: number;
  createdAt: string;
  articles: Article;
};

type ArticleData = {
  articleData: Article[];
  pagination: Pagination;
};

type CommentData = {
  commentData: Comment[];
  pagination: Pagination;
};

export default function TabsComponent({
                                        articles,
                                        comments,
                                        articlePage,
                                        onArticlePageChange,
                                        articleSearchTerm,
                                        onArticleSearchTermChange,
                                        selectedTopics,
                                        onTopicsChange,
                                        commentPage,
                                        onCommentPageChange,
                                        commentSearchTerm,
                                        onCommentSearchTermChange,
                                        allTopics,
                                        onDeletePostAction,
                                        onDeleteCommentAction
                                      }: Props) {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');

  return (
    <>
      <div
        role="tablist"
        className="tabs tabs-border text-primary font-bold mb-6"
      >
        <a
          role="tab"
          className={`tab ${
            activeTab === 'posts' ? 'tab-active' : ''
          } text-base`}
          onClick={() => setActiveTab('posts')}
        >
          我的文章
        </a>
        <a
          role="tab"
          className={`tab ${
            activeTab === 'comments' ? 'tab-active' : ''
          } text-base`}
          onClick={() => setActiveTab('comments')}
        >
          我的留言
        </a>
      </div>
      <div>
        {activeTab === 'posts' && (
          <MyPostsComponent
            articles={articles}
            allTopics={allTopics}
            selectedTopics={selectedTopics}
            onTopicsChangeAction={onTopicsChange}
            articlePage={articlePage}
            onPageChangeAction={onArticlePageChange}
            articleSearchTerm={articleSearchTerm}
            onSearchTermChangeAction={onArticleSearchTermChange}
            onDeletePostAction={onDeletePostAction}
          />
        )}
        {activeTab === 'comments' && (
          <MyCommentsComponent
            comments={comments}
            commentPage={commentPage}
            onPageChangeAction={onCommentPageChange}
            commentSearchTerm={commentSearchTerm}
            onSearchTermChangeAction={onCommentSearchTermChange}
            onDeleteCommentAction={onDeleteCommentAction}
          />
        )}
      </div>
    </>
  );
}
