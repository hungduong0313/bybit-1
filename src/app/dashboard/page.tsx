'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '/firebaseConfig';
import { message } from 'antd';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase Auth
      message.success('Đăng xuất thành công!');
      router.push('/'); // Chuyển hướng về trang đăng nhập
    } catch (error) {
      message.error('Lỗi khi đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default Dashboard;
