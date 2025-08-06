import Image from 'next/image';

import { FaTrashCan } from 'react-icons/fa6';

export default function CommentDetailCardComponent() {
  return (
    <>
      <div className="flex gap-1 py-4 items-stretch justify-between">
        <div className=" card-body p-0">
          <div className="flex justify-between">
            <div className="flex">
              <div className="avatar me-3">
                <div className="w-12 rounded-full">
                  <Image src="/imgs/cat.png"
                         alt=" 留言者大頭貼圖"
                         width={48}
                         height={48}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center">
                  <h2 className="card-title font-medium">gsdkg548</h2>
                  <p className="text-secondary font-bold">・我</p>
                </div>

                <h3 className="text-gray-400">3分鐘前</h3>
              </div>
            </div>
            <div className="text-xl text-primary hover:cursor-pointer hover:text-primary-500 active:text-primary-700">
              <FaTrashCan />
            </div>
          </div>
          <p className=" leading-tight">
            留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容
          </p>
        </div>
      </div>
    </>
  );
}