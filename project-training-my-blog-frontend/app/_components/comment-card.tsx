import Image from 'next/image';

export default function CommentCardComponent() {
  return (
    <>
      <div className="card">
        <div className="card-body p-0">
          <div className="flex">
            <div className="avatar me-3">
              <div className="w-16 rounded-full">
                <Image src="/imgs/cat.png"
                       alt="留言者大頭貼圖"
                       width={64}
                       height={64}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="card-title">gsdkg548</h2>
              <h3 className="text-gray-400">3分鐘前</h3>
            </div>
          </div>
          <p className="leading-tight line-clamp-4">
            留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容
          </p>
          <div
            className="card relative p-0.5 bg-gradient-to-r from-black to-primary">
            <div className="card bg-white p-1 hover:rounded-t-md">

              <div className="card-body p-2">
                <div className="flex items-center">
                  <div className="aspect-video min-w-[64px] me-2">
                    <Image src="/imgs/test.jpg"
                           alt="文章圖片"
                           width={64}
                           height={36}
                    />
                  </div>
                  <div>
                    <h2 className="card-title leading-tight font-medium text-sm line-clamp-1">
                      文章標題文章標題文章標題文章標題
                    </h2>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400">abc1234</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}