'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/context/Auth-context';

import { newCommentSchema, newCommentFormData } from '@/app/schemas/new-comment-schema';

import { MdSend } from 'react-icons/md';
import { LuTriangleAlert } from 'react-icons/lu';

type PropsFromParents = {
  article_id: number,
}

export default function CommentSectionComponent({ article_id }: PropsFromParents) {
  const { auth, getAuthHeader } = useAuth();
  const router = useRouter();

  // 使用 react-hook-form 與 zodResolver 處理表單驗證
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<newCommentFormData>({
    resolver: zodResolver(newCommentSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: newCommentFormData) => {
    try {
      const header = {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      };
      const res = await fetch('http://localhost:3001/api/posts/new-comment', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ article_id: article_id, content: data.content })
      });

      if (res.ok) {
        reset();
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {!!auth.token ?
        (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mb-2">
                <textarea className="textarea w-full me-2"
                          placeholder="留點什麼吧..."
                          defaultValue=""
                          {...register('content')}
                />
                <button className="btn border-0 text-primary text-xl"><MdSend /></button>
              </div>
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
            </form>

          </>

        ) :
        (
          <p className="text-sm text-gray-500 mb-4">請先<Link
            className="text-primary underline underline-offset-2" href="/login">登入</Link>才能留言喔~</p>
        )
      }
    </>
  );
}