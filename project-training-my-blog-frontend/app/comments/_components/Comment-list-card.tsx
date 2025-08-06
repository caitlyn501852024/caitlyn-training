import Image from 'next/image';
import Link from 'next/link';

export default function CommentListCardComponent() {
  return (
    <>
      <div className="flex gap-1 py-4 items-stretch justify-between">
        <div className=" card-body p-0">
          <div className=" flex">
            <div className=" avatar me-3">
              <div className=" w-12 rounded-full">
                <Image src="/imgs/cat.png"
                       alt=" 留言者大頭貼圖"
                       width={48}
                       height={48}
                />
              </div>
            </div>
            <div className=" flex flex-col justify-center">
              <h2 className=" card-title font-medium">gsdkg548</h2>
              <h3 className=" text-gray-400">3分鐘前</h3>
            </div>
          </div>
          <p className=" leading-tight">
            留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容
          </p>
          <Link href={`/posts/`}>
            <div
              className=" card relative p-0.5 bg-gradient-to-r from-black to-primary">
              <div className=" card bg-white p-1 hover:rounded-t-md hover:bg-gray-200">

                <div className=" card-body p-2">
                  <div className=" flex items-center">
                    <div className=" aspect-video min-w-[64px] me-2">
                      <Image src="/imgs/test.jpg"
                             alt="文章圖片"
                             width={64}
                             height={36}
                      />
                    </div>
                    <div>
                      <h2 className="card-title leading-tight font-bold text-gray-500 text-sm line-clamp-1">
                        文章標題文章標題文章標題文章標題
                      </h2>
                      <div className="flex justify-between items-center">
                        <div className=" avatar me-2">
                          <div className=" w-6 rounded-full">
                            <Image src="/imgs/cat.png"
                                   alt=" 留言者大頭貼圖"
                                   width={48}
                                   height={48}
                            />
                          </div>
                        </div>
                        <p className="text-gray-400">abc1234</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </>
  )
    ;
}