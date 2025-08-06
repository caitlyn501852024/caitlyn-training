import Image from 'next/image';
import Link from 'next/link';

export default function NavbarComponent({}) {
  return (
    <>
      <header className="sticky top-0 z-20">
        <nav className="navbar bg-base-100 border-b-4 border-primary">
          <div className="flex-1">
            <Link className="text-xl inline-block font-bold"
                  href="/">
            <span className="inline-flex align-middle items-center text-2xl">
            <Image src="/imgs/logo.png" alt="My Blog logo"
                   width={36}
                   height={36}
                   className={'me-3'}
            />
            <span className="text-primary">M</span>y Blog
          </span>
            </Link>
          </div>
          <div className="flex-none">
            <ul className="flex gap-1 px-1 align-middle items-center text-sm">
              <li>
                <Link
                  href="/posts/new-post"
                  className="bg-primary text-white text-base font-medium p-2 rounded-md me-4 hover:bg-primary-500 active:bg-primary-700"
                >發表新文章
                </Link>
              </li>
              <li className="hover:underline underline-offset-2">
                <Link href="/login">登入</Link>
              </li>
              <li>/</li>
              <li className="hover:underline underline-offset-2">
                <Link href="/register">註冊</Link>
              </li>

            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}