import Image from 'next/image';
import Link from 'next/link';

import { FaFire } from 'react-icons/fa6';
import { MdInsertComment } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

export default function MyPostsListCardComponent() {
  return (
    <>
      <Link href={`/posts/:id`}>
        <div className="flex gap-1 py-4 items-stretch justify-between hover:cursor-pointer">
          <div className="min-w-[6%] self-center"><p className="inline bg-secondary text-white py-1.5 px-2.5">主題</p>
          </div>
          <figure className="aspect-video min-w-40">
            <Image
              src="/imgs/test.jpg"
              alt="文章圖片"
              width={160}
              height={90}
            />
          </figure>
          <div className="card-body justify-between py-0">
            <p>2025/7/31</p>
            <h2
              className="card-title leading-tight line-clamp-2">文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題</h2>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1 text-gray-400">
                <FaFire />
                <p>13343</p>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <MdInsertComment />
                <p>666</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 text-xl self-center text-gray-400">
            <FaEdit className='hover:text-gray-500 active:text-gray-700' />
            <FaTrashCan className='hover:text-gray-500 active:text-gray-700' />
          </div>
        </div>
      </Link>
    </>
  );
}