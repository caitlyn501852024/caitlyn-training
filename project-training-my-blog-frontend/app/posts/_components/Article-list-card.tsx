import Link from 'next/link';
import Image from 'next/image';

type Props = {
  id: number;
  topic: string;
  article_img_url: string;
  title: string;
  author_img_url: string;
  author: string;
  created_at: string;
};

export default function ArticleListCardComponent({
  id,
  topic,
  article_img_url = '/imgs/article-default.webp',
  title,
  author_img_url = '/imgs/avatar-default.png',
  author,
  created_at,
}: Props) {
  return (
    <>
      <Link href={`/posts/${id}`}>
        <div className="flex gap-1 py-4 items-stretch justify-between hover:bg-gray-200 hover:cursor-pointer">
          <div className="min-w-[52px] self-center me-4">
            <p className="inline-block w-full text-center bg-secondary text-white py-1 px-2">
              {topic}
            </p>
          </div>
          <div className="aspect-video overflow-hidden min-w-40 relative">
            <Image
              className="object-cover object-center"
              src={article_img_url}
              alt="文章圖片"
              // width={160}
              // height={90}
              fill
            />
          </div>
          <div className="card-body justify-between py-0">
            <h2 className="card-title leading-tight line-clamp-3">{title}</h2>
            <div className="flex items-center">
              <div className="avatar me-2">
                <div className="w-8 rounded-full">
                  <Image
                    className="w-8"
                    src={author_img_url}
                    alt="作者大頭貼圖"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <p className="text-gray-500">{author}</p>
            </div>
          </div>
          <p className="text-sm self-center min-w-[85px]">{created_at}</p>
        </div>
      </Link>
    </>
  );
}
