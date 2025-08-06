import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import Link from 'next/link';

export default function EditPostPage() {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>編輯文章</li>
              <li>文章標題</li>
            </ul>
          </div>
          <h2 className="text-primary font-bold text-xl mb-4">編輯文章</h2>
          <div className="flex gap-4 mb-4">
            <select defaultValue="Pick a color" className="select w-1/12 bg-secondary text-white">
              <option disabled={true}>主題</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
            <input type="text" placeholder="請輸入文章標題" className="input flex-grow" />
          </div>
          <textarea className="textarea w-full mb-4" placeholder="請輸入文章內容" rows={13}>654321</textarea>
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">按下發表文章即視為同意
              <Link href={'#'}
                    className="text-primary underline-offset-2 underline">使用條款
              </Link>
            </p>
            <div className="flex justify-center gap-5">
              <button
                className="inline-block border border-black rounded-md px-4 py-2.5 hover:bg-gray-200 active:bg-gray-300">取消編輯
              </button>
              <button
                className="inline-block bg-primary text-white font-bold rounded-md px-4 py-2.5 hover:bg-primary-500 active:bg-primary-700">發表文章
              </button>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </>
  );
}