import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import LocaleDateTimeTransferUtility from '@/utils/LocaleDateTimeTransfer';
import CommentDetailCardComponent from './_components/Comment-detail-card';

type Topic = {
  id: number;
  topic_name: string;
};

type Member = {
  id: number;
  account: string;
  nickname?: string;
  avatar_url?: string;
};

type ArticleImgs = {
  id: number;
  article_id: number;
  img_url?: string;
  img_order?: number;
  created_at: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  topic_id: number;
  created_at: string;
  updated_at?: string;
  views: number;
  member_id: number;
  topics: Topic;
  members: Member;
  article_imgs?: ArticleImgs[];
  comments?: Comment[];
};

type Comment = {
  id: number;
  content: string;
  member_id: number;
  article_id: number;
  created_at: string;
  members: Member;
};

async function isLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('My_blog_token')?.value;
  return !!token;
}

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
      throw new Error('文章資料錯誤');
    }
    ;
    data = await res.json();
    // console.log(data);
  } catch (err) {
    console.error(err, '文章資料錯誤');
  }

  if (!data) redirect('/posts');

  const loggedIn = await isLoggedIn();

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
                      <div className=" w-8 rounded-full">
                        <Image
                          src={data.members?.avatar_url || ''}
                          alt="作者大頭貼圖"
                          width={32}
                          height={32}
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
                <p>
                  {data.content}
                </p>
              </section>
              <div className="h-px bg-gradient-to-r from-black to-primary my-8"></div>
              <section>


                <h3 className="text-primary text-xl font-bold mb-4">留言</h3>
                {loggedIn ?
                  (
                    <textarea className="textarea textarea-primary w-full mb-4" placeholder="留點什麼吧"></textarea>

                  ) :
                  (
                    <p className="text-sm text-gray-500 mb-4">請先<Link
                      className="text-primary underline underline-offset-2" href="/login">登入</Link>才能留言喔~</p>
                  )
                }
                <CommentDetailCardComponent />
                <CommentDetailCardComponent />
                <CommentDetailCardComponent />
                <CommentDetailCardComponent />


              </section>
            </div>
            <aside className="col-span-3">
              <section className="mb-4">
                <h3 className="text-primary font-bold text-xl mb-2">此作者最新文章</h3>
                <ul>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}
                      className="hover:font-bold"
                    >文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}
                      className="hover:font-bold"
                    >文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                </ul>
              </section>
              <section>
                <h3 className="text-primary font-bold text-xl mb-2">主題 最新文章</h3>
                <ul>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                </ul>
              </section>
            </aside>

          </div>
        </div>

      </main>
      <FooterComponent />
    </>
  );
}