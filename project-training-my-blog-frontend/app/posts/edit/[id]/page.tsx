'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/Auth-context';

import { newPostSchema, newPostFormData } from '@/app/schemas/new-post-schema';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { LuTriangleAlert } from 'react-icons/lu';
import { RiErrorWarningLine } from 'react-icons/ri';
import EditorComponent from '@/app/posts/new-post/_components/Editor';

type Data = {
  id: number,
  title: string,
  content: string,
  topic_id: number,
  created_at: string,
  updated_at: string,
  views: number,
  member_id: number,
  article_imgs: string[],
  members: {
    id: number,
    account: string,
    nickname: string,
    avatar_url: string,
  };
  topics: Topic;
  comments: [];
  authorLatestPosts: [];
  topicLatestPosts: [];
}

type Topic = {
  id: number,
  topic_name: string,
}

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { auth, getAuthHeader } = useAuth();

  const [data, setData] = useState<Data | null>(null);
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number>(data?.topic_id || 1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState('');

  const editSuccessModalRef = useRef<HTMLDialogElement | null>(null);
  const editFailureModalRef = useRef<HTMLDialogElement | null>(null);
  const confirmCancelModalRef = useRef<HTMLDialogElement | null>(null);

  // 沒登入就跳轉登入頁
  if (!auth.id || !auth.token) {
    router.push('/login');
  }

  // 使用 react-hook-form 與 zodResolver 處理表單驗證
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<newPostFormData>({
    resolver: zodResolver(newPostSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const onSubmit = async (formData: newPostFormData) => {
    // 沒有任何修改
    const isNoChange = formData.title === data?.title &&
      selectedTopic === data?.topic_id &&
      htmlContent === data?.content;

    if (data && isNoChange) {
      setErrorMessage('沒有任何修改！');
      editFailureModalRef.current?.showModal();
      return;
    }

    try {
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      };
      const res = await fetch(`http://localhost:3001/api/posts/${params.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            title: formData.title,
            content: htmlContent,
            topic_id: selectedTopic
          })
        }
      );

      const result = await res.json();
      if (res.ok) {
        setSelectedTopic(1);
        editSuccessModalRef.current?.showModal();
        setTimeout(() => {
          router.push(`/posts/${params.id}`);
        }, 1000);

      } else {
        setErrorMessage(result.error || '編輯失敗！');
        editFailureModalRef.current?.showModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 進入頁面時拿本文章資料
  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${params.id}`)
      .then(res => res.json())
      .then(result => {
        setData(result);

        reset({
          title: result.title,
          content: result.content
        });
        setSelectedTopic(result.topic_id);
        setHtmlContent(result.content);
      });
  }, [params.id, reset]);

  // 獲取主題列表
  useEffect(() => {
    fetch('http://localhost:3001/api/topics')
      .then(res => res.json())
      .then((result: Topic[]) => setAllTopics(result))
      .catch((err) => console.error(err));
  }, []);

  // 取消編輯
  const handleCancel = () => {
    confirmCancelModalRef.current?.showModal();
  };

  return (
    <>
      {/*<pre>{JSON.stringify(data, null, 4)}</pre>*/}
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li>編輯文章</li>
              <li>{data?.title}</li>
            </ul>
          </div>
          <h2 className="text-primary font-bold text-xl mb-4">編輯文章</h2>

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
              <input
                type="text"
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
            {
              data && (
                <Controller
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <>
                      <EditorComponent
                        defaultHtml={data?.content || ''}
                        onTextChange={(content, delta, source, editor) => {
                          const text = editor.getText().trim();
                          field.onChange(text);
                          setHtmlContent(editor.root.innerHTML);
                        }}
                      />
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
                    </>
                  )}
                />
              )
            }

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">按下發表文章即視為同意
                <Link href={'#'}
                      className="text-primary underline-offset-2 underline">使用條款
                </Link>
              </p>
              <div className="flex justify-center gap-5">
                <button
                  type="button"
                  className="inline-block border border-black rounded-md px-4 py-2.5 hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer"
                  onClick={handleCancel}
                >
                  取消編輯
                </button>
                <button
                  type="submit"
                  className="inline-block bg-primary text-white font-bold rounded-md px-4 py-2.5 hover:bg-primary-500 active:bg-primary-700 hover:cursor-pointer">發表文章
                </button>
              </div>
            </div>
          </form>

        </div>
      </main>
      <FooterComponent />

      {/* Modal */}
      <dialog className="modal" ref={editSuccessModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCheckmarkCircleOutline className="text-success text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">編輯成功！</h3>
          </div>
          <p className="py-4">即將為您跳轉 ...</p>
        </div>
      </dialog>

      <dialog className="modal" ref={editFailureModalRef}>
        <div className="modal-box flex flex-col items-center">
          <div className="flex items-center mb-4">
            <IoCloseCircleOutline className="text-error text-3xl inline-block me-2" />
            <h3 className="font-bold text-xl">編輯失敗！</h3>
          </div>
          <p className="py-4">{errorMessage}</p>
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
          <p className="py-4">確定要取消編輯嗎？</p>
          <div className="modal-action m-0">
            <form method="dialog">
              <button className="btn border border-black rounded-md me-4"
                      onClick={() => router.back()}
              >
                取消編輯
              </button>
              <button className="btn bg-primary rounded-md text-white hover:bg-primary-500 active:bg-primary-700">
                繼續編輯
              </button>

            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}