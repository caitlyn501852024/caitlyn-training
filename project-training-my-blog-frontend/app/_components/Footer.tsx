import Image from 'next/image';

export default function FooterComponent() {
  return (
    <>
      <footer className="footer footer-center gap-1 p-3 mt-8">
        <div className="m-0">
          <span className="inline-flex align-middle items-center font-bold text-3xl">
            <Image src="/imgs/logo.png" alt="My Blog logo"
                   width={40}
                   height={40}
                   className={'me-2'}
            />
            <span className="text-primary">M</span>y Blog
          </span>
          <p className="text-gray">Copyright &copy; {new Date().getFullYear()} Caitlyn</p>
        </div>
      </footer>
    </>
  );
}