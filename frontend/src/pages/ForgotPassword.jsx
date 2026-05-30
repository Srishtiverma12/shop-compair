import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      toast.success('OTP sent to your email!');
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
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
        textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px',
          background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '24px', color: 'white',
        }}>🔒</div>

        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e1b4b', marginBottom: '8px' }}>
          Forgot Password
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>
          Enter your email and we will send you an OTP to reset your password
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%', padding: '12px 16px',
                borderRadius: '12px', border: '2px solid #e5e7eb',
                fontSize: '15px', fontFamily: 'Inter, sans-serif',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
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
            }}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
          Remember your password?{' '}
          <Link to="/login" style={{ color: '#7c3aed', fontWeight: '600' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;