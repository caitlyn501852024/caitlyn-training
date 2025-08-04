import NavbarComponent from '@/app/_components/Navbar';
import FooterComponent from '@/app/_components/Footer';
import ArticleCardComponent from '@/app/_components/Article-card';

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <h2 className='text-primary text-xl font-bold'>最新文章</h2>
      <ArticleCardComponent />
      <FooterComponent />
    </>
  );
}
