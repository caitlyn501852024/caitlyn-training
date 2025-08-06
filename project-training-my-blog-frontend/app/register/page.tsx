import Image from 'next/image';
import Link from 'next/link';

import { IoMdPerson } from 'react-icons/io';
import { MdLock } from 'react-icons/md';
import { IoEye } from 'react-icons/io5';
import { LuTriangleAlert } from 'react-icons/lu';

export default function RegisterPage() {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="w-1/2 m-auto">
          <div className="flex justify-center text-center items-center gap-4 mb-8">
            <h2 className="text-primary text-3xl font-bold">註冊</h2>
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
          <div className="flex items-center justify-center">
            <form action="" method="post" className="w-full max-w-md">
              <div className="mb-4">
                <label className="input mb-1 w-full">
                  <IoMdPerson className="text-gray-400 text-3xl" />
                  <input type="text" className="text-base" placeholder="請輸入帳號" />
                </label>
                <p className="label text-secondary text-sm px-1"><LuTriangleAlert />帳號需為 4 碼以上的英數字</p>
              </div>
              <div className="mb-4">
                <label className="input mb-1 w-full">
                  <MdLock className="text-gray-400 text-3xl" />
                  <input type="text" className="text-base" placeholder="請輸入密碼" />
                  <span className="text-gray-400 text-xl hover:cursor-pointer"><IoEye /></span>
                </label>
                <p className="label text-secondary text-sm px-1"><LuTriangleAlert />密碼需 6 碼以上，需包含至少一個英文與數字
                </p>
              </div>
              <div className="mb-4">
                <label className="input mb-1 w-full">
                  <MdLock className="text-gray-400 text-3xl" />
                  <input type="text" className="text-base" placeholder="請再次輸入密碼" />
                  <span className="text-gray-400 text-xl hover:cursor-pointer"><IoEye /></span>
                </label>
                <p className="label text-secondary text-sm px-1"><LuTriangleAlert />兩次輸入的密碼不一致</p>
              </div>
              <button className="block w-full bg-primary text-center text-white font-bold p-3 rounded-md mb-8">註冊
              </button>
              <p className="text-sm text-center">已經是會員？立即
                <Link href={'/login'}
                      className="text-primary underline underline-offset-2">登入
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}