import Link from 'next/link';
import Image from 'next/image';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import TabsComponent from '@/app/profile/_components/Tabs';

export default function ProfilePage() {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>會員中心</li>
            </ul>
          </div>
          <h2 className="text-primary font-bold text-xl mb-4">會員中心</h2>
          <div className="flex mb-5">
            <div className="avatar me-5">
              <div className="w-24 rounded-full">
                <Image src="/imgs/cat.png"
                       alt="大頭貼圖"
                       width={96}
                       height={96}
                />
              </div>
            </div>
            <div className="flex flex-col justify-around">
              <h2 className="card-title font-bold text-xl">gsdkg548</h2>
              <h3 className="text-gray-400">註冊日期：2025 年 6 月 30日</h3>
            </div>
          </div>
          <TabsComponent />

        </div>

      </main>
      <FooterComponent />
    </>
  );
}