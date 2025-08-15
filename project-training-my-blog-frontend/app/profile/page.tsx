'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import TabsComponent from '@/app/profile/_components/Tabs';

import { useAuth } from '@/context/Auth-context';
import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';

type Data = {
  memberData: Member;
  articles: ArticleData;
  comments: CommentData
}

type Member = {
  id: number;
  account: string;
  nickname: string;
  avatar_url: string;
  created_at: string;
}

type ArticleData = {
  articleData: Article[];
  pagination: pagination
}

type CommentData = {
  commentData: Comment[];
  pagination: pagination;
}

type Article = {
  id: number;
  title: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
  topics?: Topic;
  article_imgs?: Article_imgs[];
  commentCount?: number;
}

type Topic = {
  id: number;
  topic_name: string;
}

type Article_imgs = {
  id: number;
  article_id: number;
  img_url?: string;
  img_order?: number;
  created_at: string;
}

type pagination = {
  totalCount: number
  totalPages: number
  currentPage: number
  startItem: number
  endItem: number
}

type Comment = {
  id: number;
  content: string;
  article_id: number;
  created_at: string;
  articles: Article
}


export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { auth, getAuthHeader } = useAuth();

  const [allTopics, setAllTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [articlePage, setArticlePage] = useState(1);
  const [articleSearchTerm, setArticleSearchTerm] = useState('');
  const [commentPage, setCommentPage] = useState(1);
  const [commentSearchTerm, setCommentSearchTerm] = useState('');
  const [data, setData] = useState<Data | null>(null);

  // 拿全部主題資料
  useEffect(() => {
    const fetchAllTopics = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/topics');
        const result = await res.json();
        setAllTopics(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllTopics();
  }, []);

  // 進入本頁或 URL 改變時時從網址拿 query string 並同步狀態
  useEffect(() => {
    const urlArticlePage = parseInt(searchParams.get('urlArticlePage') || '1');
    const urlTopics = searchParams.get('topics')?.split(',').filter(Boolean) || [];
    const urlArticleSearchTerm = searchParams.get('articleSearchTerm') || '';

    const urlCommentPage = parseInt(searchParams.get('urlCommentPage') || '1');
    const urlCommentSearchTerm = searchParams.get('commentSearchTerm') || '';


    setArticlePage(urlArticlePage);
    setSelectedTopics(urlTopics);
    setArticleSearchTerm(urlArticleSearchTerm);

    setCommentPage(urlCommentPage);
    setCommentSearchTerm(urlCommentSearchTerm);
  }, []);

  // 狀態變化時更新 URL 並重新 fetch
  useEffect(() => {
    const params = new URLSearchParams();
    if (articlePage > 1) params.set('articlePage', articlePage.toString());
    if (selectedTopics.length > 0) params.set('topics', selectedTopics.join(','));
    if (articleSearchTerm) params.set('articleSearchTerm', articleSearchTerm);

    if (commentPage > 1) params.set('commentPage', commentPage.toString());
    if (commentSearchTerm) params.set('commentSearchTerm', commentSearchTerm);

    router.push(`/profile?${params.toString()}`);

    // 向後端 api 拿資料

    const fetchData = async () => {
      try {
        const headers = {
          ...getAuthHeader(),
          'Content-Type': 'application/json'
        };
        const res = await fetch(`http://localhost:3001/api/profile?${params.toString()}`,
          {
            method: 'GET',
            headers
          }
        );
        const result = await res.json();
        setData(result);
        setAllTopics(result.allTopics || []);
      } catch (err) {
        console.error(err);
      }

    };
    fetchData();
  }, [articlePage, selectedTopics, articleSearchTerm, commentPage, commentSearchTerm, router]);

  // 搜尋欄 input 改變
  const handleArticleSearchTermChange = (value: string) => {
    setArticleSearchTerm(value);
    setArticlePage(1);
  };
  const handleCommentSearchTermChange = (value: string) => {
    setCommentSearchTerm(value);
    setCommentPage(1);
  };

  // 篩選主題改變
  const handleTopicsChange = (newSelectedTopics: string[]) => {
    setSelectedTopics(newSelectedTopics);
    setArticlePage(1);
  };

  // 切換分頁
  const handleArticlePageChange = (newPage: number) => {
    setArticlePage(newPage);
  };
  const handleCommentPageChange = (newPage: number) => {
    setCommentPage(newPage);
  };

  return (
    <>
      <NavbarComponent />
      {/*<pre>{JSON.stringify(data, null, 4)}</pre>*/}
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>會員中心</li>
            </ul>
          </div>
          <h2 className="text-primary font-bold text-xl mb-4">會員中心</h2>
          <div className="flex mb-5">
            <div className="avatar me-5">
              <div className="w-24 rounded-full">
                <Image src={data?.memberData?.avatar_url || '/imgs/avatar-default.png'}
                       alt="大頭貼圖"
                       width={96}
                       height={96}
                />
              </div>
            </div>
            <div className="flex flex-col justify-around">
              <h2 className="card-title font-bold text-xl">{data?.memberData?.account}</h2>
              <h3
                className="text-gray-400">註冊日期：{LocaleDateTimeTransferUtility(data?.memberData?.created_at).split(' ')[0]}</h3>
            </div>
          </div>
          <TabsComponent
            articles={data?.articles}
            comments={data?.comments}
            allTopics={allTopics}
            selectedTopics={selectedTopics}
            onTopicsChange={handleTopicsChange}
            articlePage={articlePage}
            onArticlePageChange={handleArticlePageChange}
            articleSearchTerm={articleSearchTerm}
            onArticleSearchTermChange={handleArticleSearchTermChange}
            commentPage={commentPage}
            onCommentPageChange={handleCommentPageChange}
            commentSearchTerm={commentSearchTerm}
            onCommentSearchTermChange={handleCommentSearchTermChange}
          />

        </div>

      </main>
      <FooterComponent />
    </>
  );
}