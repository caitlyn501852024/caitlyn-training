'use client';
import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/Auth-context';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';

import { IoMdPerson } from 'react-icons/io';
import { MdLock } from 'react-icons/md';
import { IoEye } from 'react-icons/io5';
import { IoEyeOff } from 'react-icons/io5';
import { LuTriangleAlert } from 'react-icons/lu';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5';

import { loginSchema, LoginFormData } from '@/app/schemas/login-schema';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  // 控制密碼可見狀態
  const [showPassword, setShowPassword] = useState(false);

  // 用來儲存登入失敗訊息 state
  const [loginFailureMessage, setLoginFailureMessage] = useState('');

  // 使用 useRef 來控制 modal 的顯示
  const loginSuccessModalRef = useRef<HTMLDialogElement | null>(null);
  const loginFailureModalRef = useRef<HTMLDialogElement | null>(null);

  // 使用 react-hook-form 與 zodResolver 處理表單驗證
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: LoginFormData) => {
    // 使用 Auth-context 的 login 方法登入
    try {
      const result = await login(data.account, data.password);

      if (!result.success) {
        // 登入失敗，顯示失敗 Modal
        setLoginFailureMessage(() => result.error || '登入失敗，請再試一次');
        loginFailureModalRef.current?.showModal();
        throw new Error('登入失敗，請再試一次');
      }

      // 登入成功，顯示成功 Modal 並在 1.5 秒後跳轉回原本頁面
      loginSuccessModalRef.current?.showModal();
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (err) {
      console.error('登入錯誤:', err);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="w-1/2 m-auto">
          <div className="flex justify-center text-center items-center gap-4 mb-12">
            <h2 className="text-primary text-3xl font-bold">登入</h2>
            <Link className="text-xl inline-block font-bold" href="/">
              <span className="inline-flex align-middle items-center text-2xl">
                <Image
                  src="/imgs/logo.png"
                  alt="My Blog logo"
                  width={36}
                  height={36}
                  className={'me-3'}
                />
                <span className="text-primary">M</span>y Blog
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
              <div className="mb-4">
                <label className="input mb-1 w-full">
                  <IoMdPerson className="text-gray-400 text-3xl" />
                  <input
                    type="text"
                    className="text-base"
                    placeholder="帳號"
                    {...register('account')}
                  />
                </label>
                <p
                  className={`label text-secondary text-sm px-1 min-h-4 ${
                    errors.account ? 'visible' : 'invisible'
                  }`}
                >
                  {errors.account ? (
                    <>
                      <LuTriangleAlert />
                      {errors.account.message}
                    </>
                  ) : (
                    ' '
                  )}
                </p>
              </div>
              <div className="mb-4">
                <label className="input mb-1 w-full">
                  <MdLock className="text-gray-400 text-3xl" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="text-base w-full"
                    placeholder="密碼"
                    {...register('password')}
                  />
                  <span
                    className="text-gray-400 text-xl hover:cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </span>
                </label>
                <p
                  className={`label text-secondary text-sm px-1 min-h-4 ${
                    errors.password ? 'visible' : 'invisible'
                  }`}
                >
                  {errors.password ? (
                    <>
                      <LuTriangleAlert />
                      {errors.password.message}
                    </>
                  ) : (
                    ' '
                  )}
                </p>
              </div>
              <button
                className="btn min-h-8 w-full rounded-md bg-primary text-center text-white font-bold my-8 py-6 text-base">
                登入
              </button>
              <p className="text-sm text-center">
                還不是會員嗎？
                <Link
                  href={'/register'}
                  className="text-primary underline underline-offset-2"
                >
                  立即註冊
                </Link>
                即可發表文章和留言！
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* 登入成功和失敗的 Modals */}
      <dialog className="modal" ref={loginSuccessModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCheckmarkCircleOutline className="text-success text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">登入成功！</h3>
          </div>
          <p className="py-4">即將為您跳轉 ...</p>
        </div>
      </dialog>

      <dialog className="modal" ref={loginFailureModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCloseCircleOutline className="text-error text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">登入失敗！</h3>
          </div>
          <p className="py-4">{loginFailureMessage}</p>
          <div className="modal-action self-end m-0">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-primary text-white hover:bg-primary-500 active:bg-primary-700">
                關閉
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
