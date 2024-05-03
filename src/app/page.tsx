'use client'; // Đảm bảo đây là Client Component nếu sử dụng hook hoặc trạng thái

import { useRouter } from 'next/navigation'; // Để chuyển hướng
import { Button } from 'antd'; // Sử dụng Ant Design để tạo giao diện
import Link from 'next/link'; // Để tạo liên kết đến các trang khác

const HomePage = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to my project</h1>
      <Button type="primary" onClick={goToLogin}> {'Đăng nhập tại đây'}
      </Button>

    </div>
  );
};

export default HomePage;
