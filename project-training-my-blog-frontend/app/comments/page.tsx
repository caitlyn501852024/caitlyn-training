import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import Link from 'next/link';

export default function Comments() {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>留言列表</li>
            </ul>
          </div>
          <h2 className="text-primary text-xl font-bold mb-4">留言列表</h2>
          <button className="btn btn-primary">123</button>
        </div>
      </main>
      <FooterComponent />
    </>
  );
}