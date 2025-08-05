import Image from 'next/image';

type Props = {
  src?: string,
  title?: string,
  author?: string,
  topic?: string,
}

export default function ArticleCardComponent({ src = '/imgs/test.jpg', ...props }: Props) {
  return (
    <>
      <div className="card relative p-0 pb-0.5 bg-gradient-to-r from-black to-primary hover:cursor-pointer hover:p-0.5">
        <div className="card rounded-t-none bg-white p-1 hover:rounded-t-md">
          <figure className="w-100">
            <Image
              src={src}
              alt="文章圖片"
              width={800}
              height={450}
            />
          </figure>
          <div className="card-body p-2 pb-4">
            <h2 className="card-title leading-tight font-normal line-clamp-2">
              文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
            </h2>
            <div className="flex justify-between items-center">
              <div className="avatar me-3">
                <div className="w-8 rounded-full">
                  <Image src="/imgs/cat.png"
                         alt="作者大頭貼圖"
                         width={32}
                         height={32}
                  />
                </div>
              </div>
              <p className="text-gray-400">abc1234</p>
              <p className="bg-secondary md:max-w-[25%] text-center text-white p-1">主題</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}