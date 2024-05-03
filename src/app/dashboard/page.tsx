'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { message, Button } from 'antd';

type User = {
  email: string;
  // Khai báo các thuộc tính khác của User nếu cần thiết
};

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push('/login');
      } else {
        setUser({ email: authUser.email } as User);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      message.error('Đã xảy ra lỗi khi đăng xuất');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;