import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


import { FaFire } from 'react-icons/fa6';
import { MdInsertComment } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

type Props = {
  article_id: number,
  topic: string,
  article_img_url: string,
  created_at: string,
  title: string,
  comments_count: number,
}

export default function MyPostsListCardComponent({
                                                   article_id,
                                                   topic,
                                                   article_img_url,
                                                   created_at,
                                                   title,
                                                   comments_count
                                                 }: Props) {
  const router = useRouter();

  const handleDeletePost = async (article_id: number
    ) => {
      if (window.confirm('確定要刪除文章嗎？此操作無法復原喔！')) {
        try {
          const res = await fetch('http://localhost:3001/api/posts/delete-post', {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({ article_id: article_id })
          });
          if (!res.ok) throw new Error('刪除文章失敗！');

          // router.refresh();
        } catch (err) {
          console.error(err);
        }
      }
    }
  ;

  return (
    <>
      <div className="flex gap-1 py-4 items-stretch justify-between">
        <Link href={`/posts/${article_id}`} className='flex-grow hover:bg-gray-200'>
          <div className="flex gap-1 py-4 items-stretch justify-between hover:cursor-pointer">
            <div className="min-w-[52px] self-center me-4"><p
              className="inline-block w-full text-center bg-secondary text-white py-1 px-2">{topic}</p>
            </div>
            <figure className="aspect-video min-w-40">
              <Image
                src={article_img_url || '/imgs/test.jpg'}
                alt="文章圖片"
                width={160}
                height={90}
              />
            </figure>
            <div className="card-body justify-between py-0">
              <p className="flex-grow-0">{created_at}</p>
              <h2
                className="card-title leading-tight line-clamp-2">{title}</h2>
              <div className="flex gap-4 items-center">
                {/*<div className="flex items-center gap-1 text-gray-400">*/}
                {/*  <FaFire />*/}
                {/*  <p>13343</p>*/}
                {/*</div>*/}
                <div className="flex items-center gap-1 text-gray-400">
                  <MdInsertComment />
                  <p>{comments_count}</p>
                </div>
              </div>
            </div>

          </div>
        </Link>
        <div className="flex gap-5 text-xl self-center text-gray-400">
          <FaEdit className="hover:cursor-pointer hover:text-gray-500 active:text-gray-700"
                  onClick={() => router.push(`/posts/edit/${article_id}`)}
          />
          <FaTrashCan onClick={() => handleDeletePost(article_id)}
                      className="hover:cursor-pointer hover:text-gray-500 active:text-gray-700" />
        </div>

      </div>
    </>
  )
    ;
}