import Link from 'next/link';
import Image from 'next/image';

export default function ArticleListCardComponent({}) {
  return (
    <>
      <Link href={`/posts/`}>
        <div className="flex gap-1 py-4 items-stretch justify-between hover:bg-gray-200 hover:cursor-pointer">
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
            <h2
              className="card-title leading-tight line-clamp-3">文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題</h2>
            <div className="flex items-center">
              <div className="avatar me-2">
                <div className="w-8 rounded-full">
                  <Image src="/imgs/cat.png"
                         alt="留言者大頭貼圖"
                         width={32}
                         height={32}
                  />
                </div>
              </div>
              <p className="text-gray-500">apple5566</p>
            </div>
          </div>
          <p className="text-sm self-center">2025/7/31</p>
        </div>
      </Link>
    </>
  );
}