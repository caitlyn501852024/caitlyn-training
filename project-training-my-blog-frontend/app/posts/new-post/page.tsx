'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/Auth-context';

import { newPostSchema, newPostFormData } from '@/app/schemas/new-post-schema';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';

import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { LuTriangleAlert } from 'react-icons/lu';
import { RiErrorWarningLine } from 'react-icons/ri';

type Topic = {
  id: number,
  topic_name: string,
}

export default function NewPostPage() {

  const { auth, getAuthHeader } = useAuth();
  const router = useRouter();

  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number>(1);

  const postSuccessModalRef = useRef<HTMLDialogElement | null>(null);
  const postFailureModalRef = useRef<HTMLDialogElement | null>(null);
  const confirmCancelModalRef = useRef<HTMLDialogElement | null>(null);

  // 沒登入就跳轉登入頁
  if (!auth.id || !auth.token) {
    router.push('/login');
  }

  // 使用 react-hook-form 與 zodResolver 處理表單驗證
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<newPostFormData>({
    resolver: zodResolver(newPostSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: newPostFormData) => {
    try {
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      };
      const res = await fetch('http://localhost:3001/api/posts/new-post', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            title: data.title,
            content: data.content,
            topic_id: selectedTopic
          })
        }
      );
      if (res.ok) {
        setSelectedTopic(1);
        postSuccessModalRef.current?.showModal();
        setTimeout(() => {
          router.push('/posts');
        }, 1000);

      } else {
        postFailureModalRef.current?.showModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 取消發表
  const handleCancel = () => {
    confirmCancelModalRef.current?.showModal();
  };

  // 獲取主題列表
  useEffect(() => {
    fetch('http://localhost:3001/api/topics')
      .then(res => res.json())
      .then((result: Topic[]) => setAllTopics(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>發表新文章</li>
            </ul>
          </div>
          <h2 className="text-primary font-bold text-xl mb-4">發表新文章</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 mb-4">
              <select
                className="select w-1/12 bg-secondary text-white"
                value={selectedTopic}
                onChange={e => setSelectedTopic(+e.target.value)}
              >
                {allTopics.map((topic, index) =>
                  <option
                    key={index}
                    value={topic.id}
                  >
                    {topic.topic_name}
                  </option>
                )}

              </select>
              <input type="text"
                     placeholder="請輸入文章標題"
                     className="input flex-grow"
                     {...register('title')}
              />
              <div className="flex items-center min-w-[126px]">
                <p
                  className={`label text-secondary text-sm px-1 ${
                    errors.title ? 'visible' : 'invisible'
                  }`}
                >
                  {errors.title ? (
                    <>
                      <LuTriangleAlert />
                      {errors.title.message}
                    </>
                  ) : (
                    ' '
                  )}
                </p>
              </div>
            </div>
            <textarea
              className="textarea w-full mb-2"
              placeholder="請輸入文章內容"
              rows={11}
              {...register('content')}
            >
            </textarea>
            <p
              className={`label text-secondary text-sm px-1 min-h-4 mb-4 ${
                errors.content ? 'visible' : 'invisible'
              }`}
            >
              {errors.content ? (
                <>
                  <LuTriangleAlert />
                  {errors.content.message}
                </>
              ) : (
                ' '
              )}
            </p>

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">按下發表文章即視為同意
                <Link href={'#'}
                      className="text-primary underline-offset-2 underline">使用條款
                </Link>
              </p>
              <div className="flex justify-center gap-5">
                <button type="button"
                        className="inline-block border border-black rounded-md px-4 py-2.5 hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer"
                        onClick={handleCancel}
                >取消發表
                </button>
                <button type="submit"
                        className="inline-block bg-primary text-white font-bold rounded-md px-4 py-2.5 hover:bg-primary-500 active:bg-primary-700 hover:cursor-pointer">發表文章
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <FooterComponent />

      {/* 發表結果的 modal */}
      <dialog className="modal" ref={postSuccessModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCheckmarkCircleOutline className="text-success text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">發表成功！</h3>
          </div>
          <p className="py-4">即將為您跳轉 ...</p>
        </div>
      </dialog>

      <dialog className="modal" ref={postFailureModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCloseCircleOutline className="text-error text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">發表失敗！</h3>
          </div>
          <p className="py-4">請稍後重試。</p>
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

      {/* 取消發表的 modal */}
      <dialog className="modal" ref={confirmCancelModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <RiErrorWarningLine className="text-warning text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">確認</h3>
          </div>
          <p className="py-4">確定要取消發表嗎？</p>
          <div className="modal-action m-0">
            <form method="dialog">
              <button className="btn border border-black rounded-md me-4"
                      onClick={() => router.push('/posts')}
              >
                取消發表
              </button>
              <button className="btn bg-primary rounded-md text-white hover:bg-primary-500 active:bg-primary-700">
                繼續發表
              </button>

            </form>
          </div>
        </div>
      </dialog>
    </>
  )
    ;
}