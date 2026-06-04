import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      login(res.data.user, res.data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b, #2d1b69)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '24px', fontWeight: '700', color: 'white',
          }}>S</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e1b4b', marginBottom: '8px' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Login to your Shop-Compair account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block', fontSize: '14px',
              fontWeight: '600', color: '#374151', marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              style={{
                width: '100%', padding: '12px 16px',
                borderRadius: '12px', border: '2px solid #e5e7eb',
                fontSize: '15px', fontFamily: 'Inter, sans-serif',
                outline: 'none', boxSizing: 'border-box',
                background: '#f9f6f0',
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block', fontSize: '14px',
              fontWeight: '600', color: '#374151', marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              style={{
                width: '100%', padding: '12px 16px',
                borderRadius: '12px', border: '2px solid #e5e7eb',
                fontSize: '15px', fontFamily: 'Inter, sans-serif',
                outline: 'none', boxSizing: 'border-box',
                background: '#f9f6f0',
              }}
            />
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <Link to="/forgot-password" style={{
                color: '#7c3aed', fontSize: '13px', fontWeight: '500'
              }}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              color: 'white', borderRadius: '12px',
              fontSize: '16px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              border: 'none',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{
          textAlign: 'center', marginTop: '24px',
          fontSize: '14px', color: '#6b7280'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#7c3aed', fontWeight: '600' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;