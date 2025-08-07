'use client';
import { useState } from 'react';
import MyPostsComponent from '@/app/profile/_components/My-posts';
import MyCommentsComponent from '@/app/profile/_components/My-comments';


export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <>
      <div role="tablist" className="tabs tabs-border text-primary font-bold mb-6">
        <a role="tab"
           className={`tab ${activeTab === 'posts' ? 'tab-active' : ''} text-base`}
           onClick={() => setActiveTab('posts')}
        >
          我的文章
        </a>
        <a role="tab"
           className={`tab ${activeTab === 'comments' ? 'tab-active' : ''} text-base`}
           onClick={() => setActiveTab('comments')}
        >
          我的留言
        </a>
      </div>
      <div>
        {activeTab === 'posts' && <MyPostsComponent />}
        {activeTab === 'comments' && <MyCommentsComponent />}
      </div>
    </>
  );
}