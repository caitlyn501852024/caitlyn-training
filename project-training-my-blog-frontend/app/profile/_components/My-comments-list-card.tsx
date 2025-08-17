import Image from 'next/image';
import Link from 'next/link';

import { FaTrashCan } from 'react-icons/fa6';

type Props = {
  comment_id: number;
  created_at: string;
  content: string;
  article_id: number;
  article_img_url: string;
  title: string;
  author_avatar_url: string;
  author: string;
};

export default function MyCommentsListCardComponent({
  comment_id,
  created_at,
  content,
  article_id,
  article_img_url,
  title,
  author_avatar_url,
  author,
}: Props) {
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
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <div className="flex gap-2 py-4 items-center justify-between">
        <div className="card-body p-0">
          <h3 className="text-gray-400">{created_at}</h3>
          <p className="leading-tight">{content}</p>
          <Link href={`/posts/${article_id}`}>
            <div className="card relative p-0.5 bg-gradient-to-r from-black to-primary">
              <div className="card bg-white p-1 hover:rounded-t-md hover:bg-gray-200">
                <div className="card-body p-2">
                  <div className="flex items-center">
                    <div className="aspect-video min-w-[64px] me-2">
                      <Image
                        src={article_img_url || '/imgs/test.png'}
                        alt="文章圖片"
                        width={64}
                        height={36}
                      />
                    </div>
                    <div>
                      <h2 className="card-title leading-tight font-bold text-gray-500 text-sm line-clamp-1">
                        {title}
                      </h2>
                      <div className="flex justify-between items-center">
                        <div className="avatar me-2">
                          <div className="w-6 rounded-full">
                            <Image
                              src={
                                author_avatar_url || '/imgs/avatar-default.png'
                              }
                              alt="大頭貼圖"
                              width={48}
                              height={48}
                            />
                          </div>
                        </div>
                        <p className="text-gray-400">{author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-end  w-1/12 text-xl ">
          <FaTrashCan
            className="text-gray-400 hover:cursor-pointer hover:text-gray-500 active:text-gray-700"
            onClick={() => handleDeleteComment(comment_id)}
          />
        </div>
      </div>
    </>
  );
}
