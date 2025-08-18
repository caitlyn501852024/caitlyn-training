import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { FaFire } from 'react-icons/fa6';
import { MdInsertComment } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

type Props = {
  article_id: number;
  topic: string;
  article_img_url: string;
  created_at: string;
  title: string;
  comments_count: number;
  onDeletePostAction: (articleId: number) => void;
};

export default function MyPostsListCardComponent({
  article_id,
  topic,
  article_img_url,
  created_at,
  title,
  comments_count,
  onDeletePostAction,
}: Props) {
  const router = useRouter();

  const handleDeletePost = () => {
    onDeletePostAction(article_id);
  };

  return (
    <>
      <div className="flex gap-1 py-4 items-stretch justify-between">
        <Link
          href={`/posts/${article_id}`}
          className="flex-grow hover:bg-gray-200"
        >
          <div className="flex gap-1 py-4 items-stretch justify-between hover:cursor-pointer">
            <div className="min-w-[52px] self-center me-4">
              <p className="inline-block w-full text-center bg-secondary text-white py-1 px-2">
                {topic}
              </p>
            </div>
            <div className="aspect-video overflow-hidden min-w-40">
              <Image
                className="object-cover object-center h-full"
                src={article_img_url || '/imgs/article-default.webp'}
                alt="文章圖片"
                width={160}
                height={90}
              />
            </div>
            <div className="card-body justify-between py-0">
              <p className="flex-grow-0">{created_at}</p>
              <h2 className="card-title leading-tight line-clamp-2">{title}</h2>
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
          <FaEdit
            className="hover:cursor-pointer hover:text-gray-500 active:text-gray-700"
            onClick={() => router.push(`/posts/edit/${article_id}`)}
          />
          <FaTrashCan
            onClick={handleDeletePost}
            className="hover:cursor-pointer hover:text-gray-500 active:text-gray-700"
          />
        </div>
      </div>
    </>
  );
}
