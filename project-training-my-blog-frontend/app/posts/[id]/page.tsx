import Link from 'next/link';
import Image from 'next/image';

import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import CommentDetailCardComponent from '@/app/posts/[id]/_components/Comment-detail-card';

export default function PostDetailPage() {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow">
        <div className="container">
          <div className="breadcrumbs text-sm text-gray-400 my-2">
            <ul>
              <li><Link href="/">首頁</Link></li>
              <li><Link href="/posts">文章列表</Link></li>
              <li>文章標題</li>
            </ul>
          </div>
          <div className="grid grid-cols-12 gap-8 mb-4">
            <div className="col-span-9">
              <h2
                className="text-xl font-bold mb-4">文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題</h2>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <p className="bg-secondary text-white px-3 py-1.5 me-4">主題</p>
                  <div className="flex justify-between items-center">
                    <div className="avatar me-2">
                      <div className=" w-8 rounded-full">
                        <Image src="/imgs/cat.png"
                               alt="作者大頭貼圖"
                               width={32}
                               height={32}
                        />
                      </div>
                    </div>
                    <p className="text-primary">adsl8877</p>
                  </div>

                </div>
                <p className="text-gray-400">發表於 2025/7/30 12:34</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-9 ">
              <section>
                <p>
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti explicabo id pariatur possimus quidem quo totam vero. Commodi ea eius enim et, harum natus numquam odio saepe, sequi sint unde?</span><span>Beatae doloribus eligendi hic laudantium natus, numquam, quam quia quod rerum vel veritatis voluptas? Asperiores beatae cumque deleniti dolorem eos iure iusto, possimus quas recusandae repellendus sapiente tempore ut voluptatem.</span><span>Ab assumenda consectetur consequuntur cupiditate delectus excepturi facilis hic iure neque pariatur quas, rem voluptatem. Accusamus beatae delectus, dolor, earum esse id iste odit quae quam rerum temporibus vero, voluptate.</span><span>A accusantium alias aliquam architecto consectetur culpa cupiditate debitis deleniti deserunt dolor ducimus exercitationem expedita impedit itaque magni nam, non officiis omnis optio quibusdam quidem reiciendis rem rerum unde, veritatis.</span><span>Adipisci autem commodi consectetur debitis dignissimos dolor dolore dolorum excepturi expedita fugiat, hic illo nam necessitatibus nesciunt odit provident quasi quia quidem quis ratione rerum sequi tempore tenetur velit voluptatum.</span><span>Aliquid architecto beatae cumque dolorum ea eligendi expedita harum hic iure iusto laudantium, molestias natus nemo nesciunt optio praesentium quae qui, quidem rem repudiandae sint sit soluta totam? Architecto, dolorem.</span><span>Blanditiis doloribus eaque fugit laborum voluptate! Ab accusantium asperiores ea expedita illum itaque modi, nam natus neque non omnis optio placeat possimus quas quo recusandae tempore temporibus vitae voluptates voluptatibus!</span><span>Doloribus eius eligendi exercitationem magni mollitia necessitatibus nemo quae qui sed voluptatem. A aspernatur eaque harum ipsam ipsum itaque natus necessitatibus nemo, odio rem, repellendus, rerum similique vel velit veniam.</span><span>Adipisci aperiam dolores doloribus ipsa labore, magni minima mollitia numquam odio omnis perspiciatis quidem quis quo sint vero voluptate voluptates! Animi fuga iusto similique sint sunt suscipit unde. Delectus, voluptas.</span><span>Atque autem beatae blanditiis illo quibusdam repellendus reprehenderit sapiente sunt! At atque culpa delectus doloribus enim, et explicabo, fugit incidunt ipsam iure labore magni officia omnis porro quae ratione vero?</span>
                </p>
              </section>
              <div className="h-px bg-gradient-to-r from-black to-primary my-8"></div>
              <section>
                <h3 className="text-primary text-xl font-bold mb-4">留言</h3>
                <textarea className="textarea textarea-primary w-full mb-4" placeholder="留點什麼吧"></textarea>
                <CommentDetailCardComponent />
                <CommentDetailCardComponent />
                <CommentDetailCardComponent />
                <CommentDetailCardComponent />
                <CommentDetailCardComponent />
              </section>
            </div>
            <aside className="col-span-3">
              <section className="mb-4">
                <h3 className="text-primary font-bold text-xl mb-2">此作者最新文章</h3>
                <ul>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}
                      className="hover:font-bold"
                    >文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}
                      className="hover:font-bold"
                    >文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                </ul>
              </section>
              <section>
                <h3 className="text-primary font-bold text-xl mb-2">主題 最新文章</h3>
                <ul>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                  <li className="line-clamp-3 leading-tight mb-2">
                    <Link
                      href={`/posts/`}>文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </Link>
                  </li>
                </ul>
              </section>
            </aside>

          </div>
        </div>

      </main>
      <FooterComponent />
    </>
  );
}