import Link from 'next/link';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import ArticleCardComponent from '@/app/_components/Article-card';
import CommentCardComponent from '@/app/_components/Comment-card';

type Topic = {
  id: number;
  topic_name: string;
};

type Member = {
  id: number;
  account: string;
  password_hash: string;
  nickname?: string;
  created_at: string;
  is_activated: boolean;
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
  article_imgs?: ArticleImgs;
};

type Comment = {
  id: number;
  content: string;
  member_id: number;
  article_id: number;
  created_at: string;
  members: Member;
  articles: Post;
};

type HomeData = {
  topics?: Topic[];
  posts?: Post[];
  comments?: Comment[];
};

export default async function HomePage() {
  // `http://localhost:3001/api` 資料包含：上方主題 nav、最新文章 9 篇、最新留言 8 筆
  let data: HomeData = { topics: [], posts: [], comments: [] };
  try {
    const result = await fetch(`http://localhost:3001/api`, {
      cache: 'no-cache',
      credentials: 'include'
    });
    data = await result.json();
    // console.log(data);
  } catch (err) {
    console.error(err, '請求資料失敗');
  }

  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          {/* 上方主題 nav 區 */}
          <nav className="my-6">
            <ul className="flex justify-between font-bold">
              {data?.topics?.map((topic: Topic, index: number) => (
                <li key={index} className="hover:text-secondary">
                  <Link href="/">{topic.topic_name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 最新文章區塊 */}
          <section>
            <h2 className="text-primary text-xl font-bold my-4">最新文章</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {data.posts && data.posts.length > 0 ? (
                data.posts.map((post: Post, index: number) => (
                  <Link key={index} href={`/posts/${post.id}`}>
                    <ArticleCardComponent
                      article_img_src={post.article_imgs?.img_url}
                      article_title={post.title}
                      article_author={post.members.account}
                      article_topic={post.topics.topic_name}
                      author_avatar_img_src={post.members.avatar_url}
                    />
                  </Link>
                ))
              ) : (
                <p>目前沒有文章喔～</p>
              )}
            </div>
            <p className="underline underline-offset-2 text-primary my-4 text-end hover:text-primary-500">
              <Link href="/posts">看全部文章</Link>
            </p>

            {/* 最新留言區塊 */}
          </section>
          <section>
            <h2 className="text-primary text-xl font-bold my-4">最新留言</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.comments && data.comments.length > 0 ? (
                data.comments.map((comment: Comment, index: number) => (
                  <CommentCardComponent
                    key={index}
                    comment_author_img_src={comment.members?.avatar_url}
                    comment_author={comment.members?.account}
                    comment_time={comment.created_at}
                    comment_content={comment.content}
                    article_url={`/posts/${comment.articles?.id}`}
                    article_img_url={comment.articles.article_imgs?.img_url}
                    article_title={comment.articles?.title}
                    article_author_avatar_img_src={
                      comment.articles?.members?.avatar_url
                    }
                    article_author={comment.articles?.members?.account}
                  />
                ))
              ) : (
                <p>目前沒有留言喔～</p>
              )}
            </div>
            <p className="underline underline-offset-2 text-primary my-4 text-end hover:text-primary-500">
              <Link href="/comments">看全部留言</Link>
            </p>
          </section>
        </div>
      </main>
      <FooterComponent />
    </>
  );
}
