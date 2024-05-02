'use client';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { message, Button, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Khởi tạo useRouter

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.username, values.password);
      message.success('Đăng nhập thành công!');

      // Kiểm tra "Remember Me" và xử lý Local Storage
      if (values.rememberMe) {
        localStorage.setItem('rememberedUsername', values.username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // Chuyển hướng sau khi đăng nhập thành công
      router.push('/dashboard'); // Chuyển hướng tới trang Dashboard
    } catch (error: any) {
      message.error('Sai tên đăng nhập hoặc mật khẩu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <Form
        name="login_form"
        onFinish={onFinish}
        initialValues={{ rememberMe: false }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Tên đăng nhập"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox>Nhớ tôi</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
