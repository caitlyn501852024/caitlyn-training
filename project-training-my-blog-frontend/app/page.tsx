import Link from 'next/link';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import ArticleCardComponent from '@/app/_components/Article-card';
import CommentCardComponent from '@/app/_components/comment-card';

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <nav className="my-6">
            <ul className="flex justify-between font-bold">
              <li className="hover:text-secondary"><Link href="/">美食</Link></li>
              <li className="hover:text-secondary"><Link href="/">影視</Link></li>
              <li className="hover:text-secondary"><Link href="/">生活</Link></li>
              <li className="hover:text-secondary"><Link href="/">旅遊</Link></li>
              <li className="hover:text-secondary"><Link href="/">親子</Link></li>
              <li className="hover:text-secondary"><Link href="/">寵物</Link></li>
              <li className="hover:text-secondary"><Link href="/">3C</Link></li>
              <li className="hover:text-secondary"><Link href="/">美妝</Link></li>
              <li className="hover:text-secondary"><Link href="/">健康</Link></li>
            </ul>
          </nav>
          <section>
            <h2 className="text-primary text-xl font-bold my-4">最新文章</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <ArticleCardComponent />
              <ArticleCardComponent />
              <ArticleCardComponent />
              <ArticleCardComponent />
              <ArticleCardComponent />
              <ArticleCardComponent />
              <ArticleCardComponent />
              <ArticleCardComponent />
              <ArticleCardComponent />
            </div>
            <p className="underline underline-offset-2 text-primary my-4 text-end hover:text-primary-500">
              <Link href="/posts">看全部文章</Link>
            </p>
          </section>
          <section>
            <h2 className="text-primary text-xl font-bold my-4">最新留言</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <CommentCardComponent />
              <CommentCardComponent />
              <CommentCardComponent />
              <CommentCardComponent />
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
