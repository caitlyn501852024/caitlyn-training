'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Auth-context';

import { FaTrashCan } from 'react-icons/fa6';

type Props = {
  comment_id: number;
  content: string;
  created_at: string;
  account: string;
  avatar_url: string;
};

export default function CommentDetailCardComponent({
  comment_id,
  avatar_url = '/imgs/avatar-default.png',
  account,
  created_at,
  content,
}: Props) {
  const { auth } = useAuth();
  const router = useRouter();

  const handleDeleteComment = async (comment_id: number) => {
    if (window.confirm('確定要刪除留言嗎？此操作無法復原喔！')) {
      try {
        const res = await fetch(
          'http://localhost:3001/api/posts/delete-comment',
          {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ comment_id: comment_id }),
          }
        );
        if (!res.ok) throw new Error('刪除留言失敗！');

        router.refresh();
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <div className="flex gap-1 py-4 items-stretch justify-between">
        <div className=" card-body p-0">
          <div className="flex justify-between">
            <div className="flex">
              <div className="avatar me-3">
                <div className="w-12 rounded-full">
                  <Image
                    src={avatar_url}
                    alt=" 留言者大頭貼圖"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center">
                  <h2 className="card-title font-medium">{account}</h2>
                  {auth.account === account && (
                    <p className="text-secondary font-bold">・我</p>
                  )}
                </div>

                <h3 className="text-gray-400">{created_at}</h3>
              </div>
            </div>
            {auth.account === account && (
              <div className="text-xl text-gray-400 hover:cursor-pointer hover:text-gray-500 active:text-gray-700">
                <FaTrashCan onClick={() => handleDeleteComment(comment_id)} />
              </div>
            )}
          </div>
          <p className=" leading-tight">{content}</p>
        </div>
      </div>
    </>
  );
}
