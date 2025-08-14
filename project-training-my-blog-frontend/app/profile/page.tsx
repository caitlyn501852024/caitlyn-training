'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import TabsComponent from '@/app/profile/_components/Tabs';

import { useAuth } from '@/context/Auth-context';

type MemberData = {
  id: number;
  account: string;
  nickname: string;
  avatar_url: string;
  created_at: string;
  articles: Article[];
  comments: Comment[];
}

type Article = {
  id: number;
  title: string;
  content?: string;
  topics?: Topic;
  created_at?: string;
  updated_at?: string;
  article_imgs?: ArticleImgs[];
  _count?: Count;

}

type Topic = {
  id: number;
  topic_name: string;
}

type ArticleImgs = {
  id: number;
  article_id: number;
  img_url: string;
  img_order: number;
  created_at: string;
}

type Count = {
  comments: number;
}

type Comment = {
  id: number;
  content: string;
  article_id: number;
  created_at: string;
  articles: Article;

}

export default function ProfilePage() {
  const { auth, getAuthHeader } = useAuth();
  const [data, setData] = useState<MemberData | null>();

  useEffect(() => {
    const fetchMemberData = async () => {
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      };
      fetch('http://localhost:3001/api/profile',
        {
          method: 'GET',
          headers
        }
      ).then(res => res.json())
        .then(result => setData(result))
        .catch(err => console.error(err));
    };
    fetchMemberData();
  }, []);


  return (
    <>
      <NavbarComponent />
      <pre>{JSON.stringify(data, null, 4)}</pre>
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
                <Image src="/imgs/cat.png"
                       alt="大頭貼圖"
                       width={96}
                       height={96}
                />
              </div>
            </div>
            <div className="flex flex-col justify-around">
              <h2 className="card-title font-bold text-xl">{data?.account}</h2>
              <h3 className="text-gray-400">註冊日期：2025 年 6 月 30日</h3>
            </div>
          </div>
          <TabsComponent />

        </div>

      </main>
      <FooterComponent />
    </>
  );
}