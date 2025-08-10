import Image from 'next/image';
import Link from 'next/link';

import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';

type Props = {
  comment_author_img_src?: string,
  comment_author: string,
  comment_time: string,
  comment_content: string,
  article_url: string,
  article_img_url?: string,
  article_title: string,
  article_author_avatar_img_src?: string,
  article_author: string,
}

export default function CommentCardComponent({
                                               comment_author_img_src = '/imgs/cat.png',
                                               comment_author,
                                               comment_time,
                                               comment_content,
                                               article_url,
                                               article_img_url = '/imgs/test.jpg',
                                               article_title,
                                               article_author_avatar_img_src = '/imgs/cat.png',
                                               article_author
                                             }: Props) {
  return (
    <>
      <div className="card">
        <div className="card-body p-0">
          <div className="flex">
            <div className="avatar me-3">
              <div className="w-16 rounded-full border-2 border-gray-400">
                <Image src={comment_author_img_src}
                       alt="留言者大頭貼圖"
                       width={64}
                       height={64}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="card-title text-base">{comment_author}</h2>
              <h3 className="text-gray-500">{LocaleDateTimeTransferUtility(comment_time ?? '')}</h3>
            </div>
          </div>
          <p className="leading-tight line-clamp-4">
            {comment_content}
          </p>
          <Link href={article_url}>
            <div
              className="card relative p-0.5 bg-gradient-to-r from-black to-primary">
              <div className="card bg-white p-1 hover:rounded-t-md">
                <div className="card-body p-2">
                  <div className="flex items-center">
                    <div className="aspect-video min-w-[64px] me-2">
                      <Image src={article_img_url}
                             alt="文章圖片"
                             width={64}
                             height={36}
                      />
                    </div>
                    <div>
                      <h2 className="card-title font-bold leading-tight text-sm line-clamp-1">
                        {article_title}
                      </h2>
                      <div className="flex justify-between items-center">
                        <div className="avatar me-2">
                          <div className="w-6 rounded-full border border-gray-400">
                            <Image src={article_author_avatar_img_src}
                                   alt=" 文章作者大頭貼圖"
                                   width={48}
                                   height={48}
                            />
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">{article_author}</p>
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
  );
}