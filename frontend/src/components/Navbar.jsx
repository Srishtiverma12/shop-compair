import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(139,92,246,0.15)',
      position: 'sticky', top: 0, zIndex: 1000,
      padding: '0 24px',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '68px',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: '800', fontSize: '16px',
            boxShadow: '0 4px 12px rgba(139,92,246,0.4)',
          }}>S</div>
          <span style={{
            fontSize: '18px', fontWeight: '800',
            background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.3px',
          }}>Shop-Compair</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/compare', label: 'Compare' },
            ...(user ? [{ path: '/dashboard', label: 'Dashboard' }] : []),
          ].map((item) => (
            <Link key={item.path} to={item.path} style={{
              padding: '8px 16px', borderRadius: '10px',
              fontSize: '14px', fontWeight: '500',
              color: isActive(item.path) ? '#a78bfa' : '#a0a0b8',
              background: isActive(item.path) ? 'rgba(139,92,246,0.12)' : 'transparent',
              transition: 'all 0.2s ease',
              border: isActive(item.path) ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
            }}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user ? (
            <>
              <Link to="/settings" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.2)',
                padding: '7px 14px', borderRadius: '10px',
                fontSize: '13px', fontWeight: '500', color: '#a78bfa',
                transition: 'all 0.2s ease',
              }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '11px', fontWeight: '700',
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                {user.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} style={{
                background: 'transparent',
                border: '1px solid rgba(139,92,246,0.25)',
                color: '#a0a0b8', padding: '7px 16px',
                borderRadius: '10px', fontSize: '13px', fontWeight: '500',
                transition: 'all 0.2s ease',
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                color: '#a0a0b8', padding: '7px 16px',
                borderRadius: '10px', fontSize: '13px', fontWeight: '500',
                border: '1px solid rgba(139,92,246,0.2)',
                transition: 'all 0.2s ease',
              }}>Login</Link>
              <Link to="/signup" style={{
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color: 'white', padding: '7px 16px',
                borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
                transition: 'all 0.2s ease',
              }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;