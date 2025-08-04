import Image from 'next/image';
import Link from 'next/link';

export default function NavbarComponent({}) {
  return (
    <>
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
          <ul className="menu menu-horizontal px-1 align-middle items-center">
            <li>
              <button className="bg-primary text-white text-base font-medium me-2">發表新文章</button>
            </li>
            <li>
              <Link href="#">登入</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="#">註冊</Link>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}