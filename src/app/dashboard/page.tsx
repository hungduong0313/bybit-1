'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { message, Button } from 'antd';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất người dùng khi nút logout được nhấn
      router.push('/login'); // Chuyển hướng về trang login sau khi đăng xuất
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
      <Button onClick={handleLogout}>Logout</Button> {/* Tạo nút logout và gắn với hàm handleLogout */}
    </div>
  );
};

export default Dashboard;