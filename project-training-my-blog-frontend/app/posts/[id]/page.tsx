import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';
import CommentSectionComponent from './_components/Comment-section';
import CommentDetailCardComponent from './_components/Comment-detail-card';

import 'quill/dist/quill.snow.css';


type Topic = {
  id: number,
  topic_name: string,
};

type Member = {
  id: number,
  account: string,
  nickname?: string,
  avatar_url?: string,
};

type ArticleImgs = {
  id: number,
  article_id: number,
  img_url?: string,
  img_order?: number,
  created_at: string,
};

type Post = {
  id: number,
  title: string,
  content: string,
  topic_id: number,
  created_at: string,
  updated_at?: string,
  views: number,
  member_id: number,
  topics: Topic,
  members: Member,
  article_imgs?: ArticleImgs[],
  comments?: Comment[],
  authorLatestPosts?: Post[],
  topicLatestPosts?: Post[],
};

type Comment = {
  id: number,
  content: string,
  member_id: number,
  article_id: number,
  created_at: string,
  members: Member,
};

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let data: Post | null = null;

  // `http://localhost:3001/api/posts/:id`
  try {
    const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
      cache: 'no-cache',
      credentials: 'include'
    });
    if (!res.ok) {
      redirect('/posts');
      // throw new Error('文章資料錯誤');
    }

    data = await res.json();
    // console.log(data);
  } catch (err) {
    console.error(err, '文章資料錯誤');
  }

  if (!data) redirect('/posts');

  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li><Link href="/posts">文章列表</Link></li>
              <li>{data.title}</li>
            </ul>
          </div>
          <div className="grid grid-cols-12 gap-8 mb-4">
            <div className="col-span-9">
              <h2
                className="text-xl font-bold mb-4">{data.title}</h2>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <p className="bg-secondary text-white px-3 py-1.5 me-4">{data.topics?.topic_name}</p>
                  <div className="flex justify-between items-center">
                    <div className="avatar me-2">
                      <div className="w-8 rounded-full">
                        <Image
                          className='w-8'
                          src={data.members?.avatar_url || ''}
                          alt="作者大頭貼圖"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <p className="text-primary">{data.members?.account}</p>
                  </div>

                </div>
                {data.created_at === data.updated_at ? (
                  <p className="text-gray-400">發表於 {LocaleDateTimeTransferUtility(data.created_at ?? '')}</p>

                ) : (
                  <p className="text-gray-400">更新於 {LocaleDateTimeTransferUtility(data.updated_at ?? '')}</p>

                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-9 ">
              <section>
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: data.content }}>
                  {/* <p>
                  {data.content}
                </p> */}
                </div>
              </section>
              <div className="h-px bg-gradient-to-r from-black to-primary my-8"></div>
              <section>


                <h3 className="text-primary text-xl font-bold mb-4">留言</h3>

                <CommentSectionComponent article_id={data.id} />
                {data.comments?.length ? (
                  data.comments?.map((comment, index) => (
                    <CommentDetailCardComponent
                      key={index}
                      comment_id={comment.id}
                      avatar_url={comment.members?.avatar_url || ''}
                      account={comment.members?.account}
                      created_at={LocaleDateTimeTransferUtility(comment.created_at)}
                      content={comment.content}
                    />

                  ))
                ) : (
                  <p>目前沒有留言喔～</p>
                )
                }


              </section>
            </div>
            <aside className="col-span-3">
              <section className="mb-4">
                <h3 className="text-primary font-bold text-xl mb-2">此作者最新文章</h3>
                <ol>
                  {data.authorLatestPosts ?
                    data.authorLatestPosts.map((post, index) => (
                      <li key={index} className="line-clamp-3 leading-tight mb-2">
                        <Link
                          href={`/posts/${post.id}`}
                          className="hover:text-secondary hover:underline-offset-2 hover:underline"
                        >{post.title}
                        </Link>
                      </li>
                    )) : (
                      <p>目前沒有文章喔~</p>
                    )}
                </ol>
              </section>
              <section>
                <h3 className="text-primary font-bold text-xl mb-2">{data.topics.topic_name} 最新文章</h3>
                <ol>
                  {data.topicLatestPosts ?
                    data.topicLatestPosts.map((post, index) => (
                      <li key={index}
                          className="line-clamp-3 leading-tight mb-2">
                        <Link
                          href={`/posts/${post.id}`}
                          className="hover:text-secondary hover:underline-offset-2 hover:underline"
                        >{post.title}
                        </Link>
                      </li>
                    )) : (
                      <p>目前沒有文章喔~</p>
                    )
                  }
                </ol>
              </section>
            </aside>
          </div>
        </div>

      </main>
      <FooterComponent />
    </>
  );
}