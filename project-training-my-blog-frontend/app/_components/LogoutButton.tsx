'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButtonComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      router.refresh();
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <>
      <li
        className="hover:underline underline-offset-2 hover:cursor-pointer"
        onClick={handleLogout}
      >
        登出
      </li>
    </>
  );
}