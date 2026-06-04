import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      toast.success('Email verified! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
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
        }}>📧</div>

        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e1b4b', marginBottom: '8px' }}>
          Verify Email
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>
          We sent a 6-digit code to
        </p>
        <p style={{ color: '#7c3aed', fontWeight: '600', fontSize: '15px', marginBottom: '32px' }}>
          {email}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            required
            style={{
              width: '100%', padding: '16px',
              borderRadius: '12px', border: '2px solid #e5e7eb',
              fontSize: '24px', fontFamily: 'Inter, sans-serif',
              outline: 'none', boxSizing: 'border-box',
              textAlign: 'center', letterSpacing: '8px',
              marginBottom: '24px',
            }}
          />

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
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;