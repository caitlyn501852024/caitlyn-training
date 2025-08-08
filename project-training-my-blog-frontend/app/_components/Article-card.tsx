import Image from 'next/image';

type Props = {
  article_img_src?: string,
  article_title: string,
  article_author: string,
  article_topic: string,
  author_avatar_img_src?: string,
}

export default function ArticleCardComponent({
                                               article_img_src = '/imgs/test.jpg',
                                               article_title,
                                               article_author,
                                               article_topic,
                                               author_avatar_img_src = '/imgs/cat.png'
                                             }: Props) {
  return (
    <>
      <div className="card relative p-0 pb-0.5 bg-gradient-to-r from-black to-primary hover:cursor-pointer hover:p-0.5">
        <div className="card rounded-t-none bg-white p-1 hover:rounded-t-md">
          <figure className="w-100">
            <Image
              src={article_img_src}
              alt="文章圖片"
              width={800}
              height={450}
            />
          </figure>
          <div className="card-body p-2 pb-4">
            <h2 className="card-title text-xl leading-tight font-bold line-clamp-2">{article_title}</h2>
            <div className="flex justify-between items-center">
              <div className="avatar me-2">
                <div className="w-8 rounded-full border-2 border-gray-400">
                  <Image src={author_avatar_img_src}
                         alt="作者大頭貼圖"
                         width={32}
                         height={32}
                  />
                </div>
              </div>
              <p className="text-gray-500 line-clamp-1">{article_author}</p>
              <p className="bg-secondary md:max-w-[20%] text-center text-white p-1">{article_topic}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}