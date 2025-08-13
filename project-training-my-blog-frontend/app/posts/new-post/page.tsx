'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Auth-context';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import Link from 'next/link';

type Topic = {
  id: number,
  topic_name: string,
}

export default function NewPostPage() {
  const auth = useAuth();
  const router = useRouter();

  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/posts/new-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, content, topic_id, member_id: auth.id })
        }
      );
      if (res.ok) {
        setTitle('');
        setContent('');
        alert('發表成功！');
        router.push('/posts');
      } else {
        alert('發表失敗！');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 獲取主題列表
  useEffect(() => {
    fetch('http://localhost:3001/api/topics')
      .then(res => res.json())
      .then(result => setAllTopics(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>發表新文章</li>
            </ul>
          </div>
          <h2 className="text-primary font-bold text-xl mb-4">發表新文章</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <select defaultValue="Pick a color" className="select w-1/12 bg-secondary text-white">
                {allTopics.map((topic, index) =>
                  <option
                    key={index}
                  >{topic.topic_name}</option>
                )}

              </select>
              <input type="text"
                // value={title}
                     placeholder="請輸入文章標題"
                     className="input flex-grow"
                     onChange={e => setTitle(e.target.value)}
              />
            </div>
            <textarea className="textarea w-full mb-4" placeholder="請輸入文章內容" rows={13}></textarea>
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">按下發表文章即視為同意
                <Link href={'#'}
                      className="text-primary underline-offset-2 underline">使用條款
                </Link>
              </p>
              <div className="flex justify-center gap-5">
                <button type="button"
                        className="inline-block border border-black rounded-md px-4 py-2.5 hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer">取消發表
                </button>
                <button type="submit"
                        className="inline-block bg-primary text-white font-bold rounded-md px-4 py-2.5 hover:bg-primary-500 active:bg-primary-700 hover:cursor-pointer">發表文章
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <FooterComponent />;
    </>
  )
    ;
}