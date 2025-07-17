import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';


export default function Login() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length === 0) return;

    setError('');
    setLoading(true);

    const safeToken = encodeURIComponent(password);
    
    try {
      await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/ping/me`,
        {headers: { Authorization: `Bearer ${safeToken}` }}
      );
      localStorage.setItem('purchasesToken', safeToken);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Неверный код доступа');
        } else {
          setError(err.response?.data?.message || err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='login-page'>
      <h1>Вход в систему</h1>

      <form
        className='login-form'
        onSubmit={handleSubmit}
      >
        <input
          type='password'
          name='password'
          placeholder='Введите код доступа'
          className='login-input'
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />

        <button type='submit' disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>

        <p className='login-error'>{error}</p>
      </form>
    </div>
  );
}
