import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../api';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ name: '', phone: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${API_URL}/api/user/profile`,
        profile,
        { headers: { Authorization: 'Bearer ' + token } }
      );
      updateUser({ ...user, ...profile });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `${API_URL}/api/user/change-password`,
        { oldPassword: passwords.oldPassword, newPassword: passwords.newPassword },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      toast.success('Password changed!');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    try {
      await axios.delete(`${API_URL}/api/user/delete-account`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      toast.success('Account deleted');
      logout();
    } catch (err) {
      toast.error('Could not delete account');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    borderRadius: '12px', border: '2px solid #e5e7eb',
    fontSize: '15px', fontFamily: 'Inter, sans-serif',
    outline: 'none', boxSizing: 'border-box',
    background: '#f9f6f0',
  };

  const tabStyle = (tab) => ({
    padding: '10px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #5b21b6)' : 'transparent',
    color: activeTab === tab ? 'white' : '#6b7280',
    transition: 'all 0.3s ease',
  });

  return (
    <div>
      <Navbar />

      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #2d1b69)',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Settings
        </h1>
        <p style={{ color: '#a78bfa', fontSize: '16px' }}>
          Manage your account preferences
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>

        <div style={{
          display: 'flex', gap: '8px',
          background: '#f9f6f0', padding: '6px',
          borderRadius: '14px', width: 'fit-content',
          marginBottom: '36px', flexWrap: 'wrap',
        }}>
          <button style={tabStyle('profile')} onClick={() => setActiveTab('profile')}>Profile</button>
          <button style={tabStyle('password')} onClick={() => setActiveTab('password')}>Password</button>
          <button style={tabStyle('danger')} onClick={() => setActiveTab('danger')}>Danger Zone</button>
        </div>

        {activeTab === 'profile' && (
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '36px', border: '1px solid #e5e7eb',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e1b4b', marginBottom: '28px' }}>
              Profile Information
            </h2>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              marginBottom: '32px', padding: '20px',
              background: '#f9f6f0', borderRadius: '16px',
            }}>
              <div style={{
                width: '72px', height: '72px',
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', fontWeight: '700', color: 'white',
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontWeight: '700', fontSize: '18px', color: '#1e1b4b', marginBottom: '4px' }}>
                  {user?.name}
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                />
                <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Email cannot be changed</p>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+91 XXXXXXXXXX"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                  color: 'white', padding: '14px 32px',
                  borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1, border: 'none',
                }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'password' && (
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '36px', border: '1px solid #e5e7eb',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e1b4b', marginBottom: '28px' }}>
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                  placeholder="Enter current password"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  required
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                  color: 'white', padding: '14px 32px',
                  borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1, border: 'none',
                }}
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'danger' && (
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '36px', border: '2px solid #fee2e2',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#991b1b', marginBottom: '12px' }}>
              Danger Zone
            </h2>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '28px' }}>
              Once you delete your account, all your data will be permanently removed. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white', padding: '14px 32px',
                borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                cursor: 'pointer', border: 'none',
              }}
            >
              Delete My Account
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Settings;