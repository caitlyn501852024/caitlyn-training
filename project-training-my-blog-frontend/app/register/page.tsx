'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Auth-context';
import Image from 'next/image';
import Link from 'next/link';

import { IoMdPerson } from 'react-icons/io';
import { MdLock } from 'react-icons/md';
import { IoEye } from 'react-icons/io5';
import { IoEyeOff } from 'react-icons/io5';
import { LuTriangleAlert } from 'react-icons/lu';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5';

import { registerSchema, RegisterFormData } from '@/app/schemas/registerSchema';

export default function RegisterPage() {
  const router = useRouter();
  const { auth } = useAuth();

  // 控制密碼可見狀態
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 用來儲存登入失敗訊息 state
  const [registerFailureMessage, setRegisterFailureMessage] = useState('');

  // 使用 useRef 來控制 modal 的顯示
  const registerSuccessModalRef = useRef<HTMLDialogElement | null>(null);
  const registerFailureModalRef = useRef<HTMLDialogElement | null>(null);

  // 使用 react-hook-form 與 zodResolver 處理表單驗證
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (auth && auth.token) {
      router.replace('/');
    }
  }, [router, auth]);

  const onSubmit = async (data: RegisterFormData) => {
    // `http://localhost:3001/register/api` 會員註冊 api
    try {
      const res = await fetch('http://localhost:3001/register/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // 後端回傳 409 （帳號已被註冊）
        const errorData = await res.json();
        if (res.status === 409 && errorData.error) {
          setError('account', {
            type: 'server',
            message: errorData.error,
          });
        }
        // 其他錯誤，顯示註冊失敗 Modal
        setRegisterFailureMessage(
          () => errorData.error || '註冊失敗，請稍後再試'
        );
        registerFailureModalRef.current?.showModal();
        throw new Error('註冊失敗，請稍後再試');
      }

      // 註冊成功，顯示成功 Modal
      registerSuccessModalRef.current?.showModal();
    } catch (err) {
      console.error('註冊失敗:', err);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="w-1/2 m-auto">
          <div className="flex justify-center text-center items-center gap-4 mb-12">
            <h2 className="text-primary text-3xl font-bold">註冊</h2>
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
                    placeholder="請輸入帳號"
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
                    className="text-base"
                    placeholder="請輸入密碼"
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
              <div className="mb-4">
                <label className="input mb-1 w-full">
                  <MdLock className="text-gray-400 text-3xl" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="text-base"
                    placeholder="請再次輸入密碼"
                    {...register('confirmPassword')}
                  />
                  <span
                    className="text-gray-400 text-xl hover:cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                  </span>
                </label>
                <p
                  className={`label text-secondary text-sm px-1 min-h-4 ${
                    errors.confirmPassword ? 'visible' : 'invisible'
                  }`}
                >
                  {errors.confirmPassword ? (
                    <>
                      <LuTriangleAlert />
                      {errors.confirmPassword.message}
                    </>
                  ) : (
                    ' '
                  )}
                </p>
              </div>
              <button className="btn min-h-8 w-full rounded-md bg-primary text-center text-white font-bold my-8 py-6 text-base">
                註冊
              </button>
              <p className="text-sm text-center">
                已經是會員？立即
                <Link
                  href={'/login'}
                  className="text-primary underline underline-offset-2"
                >
                  登入
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* 註冊成功和失敗的 Modals */}
      <dialog className="modal" ref={registerSuccessModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCheckmarkCircleOutline className="text-success text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">註冊成功！</h3>
          </div>
          <Link
            href="/login"
            className="text-primary underline underline-offset-2"
          >
            <p className="py-4">前往登入</p>
          </Link>
        </div>
      </dialog>

      <dialog className="modal" ref={registerFailureModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCloseCircleOutline className="text-error text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">註冊失敗！</h3>
          </div>
          <p className="py-4">{registerFailureMessage}</p>
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
