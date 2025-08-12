'use client';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Auth-context';
import { MdSend } from 'react-icons/md';

type PropsFromParents = {
  article_id: number,
}

export default function CommentSectionComponent({ article_id }: PropsFromParents) {
  const { auth } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState('');

  const sendComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/posts/new-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ member_id: auth.id, article_id: article_id, content })
      });

      if (res.ok) setContent(() => '');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {!!auth.token ?
        (
          <>
            <form onSubmit={sendComment}>
              <div className="flex mb-4">
                <textarea className="textarea w-full me-2"
                          placeholder="留點什麼吧..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                />
                <button className="btn border-0 text-primary text-xl"><MdSend /></button>
              </div>
            </form>

          </>

        ) :
        (
          <p className="text-sm text-gray-500 mb-4">請先<Link
            className="text-primary underline underline-offset-2" href="/login">登入</Link>才能留言喔~</p>
        )
      }
    </>
  );
}