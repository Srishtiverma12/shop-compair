import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleCompare = () => {
    if (!url.trim()) return;
    navigate('/compare', { state: { url } });
  };

  const platforms = [
    { name: 'Amazon', emoji: '📦', color: '#ff9900' },
    { name: 'Flipkart', emoji: '🛒', color: '#2874f0' },
    { name: 'Myntra', emoji: '👗', color: '#ff3f6c' },
    { name: 'AJIO', emoji: '👠', color: '#8b5cf6' },
    { name: 'Nykaa', emoji: '💄', color: '#fc2779' },
    { name: 'Reliance Digital', emoji: '📱', color: '#0066cc' },
  ];

  const features = [
    { icon: '⚡', title: 'Instant Results', desc: 'Get price comparisons in seconds across all platforms' },
    { icon: '🤖', title: 'AI Powered', desc: 'Smart scraping engine fetches real-time data automatically' },
    { icon: '🏆', title: 'Best Deal Badge', desc: 'Automatically highlights the cheapest option for you' },
    { icon: '🚚', title: 'Delivery Info', desc: 'Compare delivery times alongside prices instantly' },
    { icon: '❤️', title: 'Wishlist', desc: 'Save products and track price drops over time' },
    { icon: '🔒', title: 'Secure Account', desc: 'Your data is protected with JWT + OTP verification' },
  ];

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        minHeight: '95vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow effects */}
        <div style={{ position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)', width:'600px', height:'600px', background:'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', left:'10%', width:'300px', height:'300px', background:'radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'20%', right:'10%', width:'250px', height:'250px', background:'radial-gradient(ellipse, rgba(20,184,166,0.06) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        {/* Grid lines bg */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:`linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
          backgroundSize:'60px 60px',
          pointerEvents:'none',
        }} />

        <div style={{ maxWidth:'780px', textAlign:'center', position:'relative', zIndex:1, animation:'fadeInUp 0.8s ease' }}>

          {/* Badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            background:'rgba(139,92,246,0.1)',
            border:'1px solid rgba(139,92,246,0.3)',
            color:'#a78bfa', padding:'8px 20px',
            borderRadius:'100px', fontSize:'13px', fontWeight:'600',
            marginBottom:'32px',
            boxShadow:'0 0 20px rgba(139,92,246,0.1)',
          }}>
            <span style={{ width:'6px', height:'6px', background:'#8b5cf6', borderRadius:'50%', animation:'pulse 2s infinite' }} />
            AI-Powered Price Comparison Engine
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize:'clamp(40px, 6vw, 72px)',
            fontWeight:'800', lineHeight:'1.1',
            marginBottom:'24px', letterSpacing:'-1px',
            color:'#f1f0ff',
          }}>
            Find The{' '}
            <span style={{
              background:'linear-gradient(135deg, #a78bfa, #8b5cf6, #ec4899)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}>Cheapest Price</span>
            {' '}Instantly
          </h1>

          <p style={{
            fontSize:'18px', color:'#a0a0b8',
            marginBottom:'52px', lineHeight:'1.8',
            maxWidth:'580px', margin:'0 auto 52px',
          }}>
            Paste any product URL and instantly compare prices across Amazon, Flipkart, Myntra, Nykaa & more.
          </p>

          {/* Search Box */}
          <div style={{
            background: focused ? 'rgba(139,92,246,0.08)' : 'rgba(22,22,31,0.9)',
            border: focused ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(139,92,246,0.2)',
            borderRadius:'20px',
            padding:'8px 8px 8px 20px',
            display:'flex', alignItems:'center', gap:'12px',
            maxWidth:'680px', margin:'0 auto 20px',
            transition:'all 0.3s ease',
            boxShadow: focused ? '0 0 40px rgba(139,92,246,0.15)' : 'none',
          }}>
            <span style={{ fontSize:'18px', opacity:0.7 }}>🔗</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
              placeholder="Paste product URL here..."
              style={{
                flex:1, background:'transparent', border:'none',
                color:'#f1f0ff', fontSize:'15px', outline:'none',
              }}
            />
            <button
              onClick={handleCompare}
              style={{
                background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color:'white', padding:'14px 28px',
                borderRadius:'14px', fontSize:'14px', fontWeight:'700',
                whiteSpace:'nowrap', cursor:'pointer',
                boxShadow:'0 4px 20px rgba(139,92,246,0.4)',
                transition:'all 0.3s ease',
                border:'none',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Compare Now →
            </button>
          </div>

          <p style={{ color:'#6b6b80', fontSize:'13px' }}>
            Supports Amazon • Flipkart • Myntra • AJIO • Nykaa • Reliance Digital
          </p>
        </div>
      </div>

      {/* Platforms */}
      <div style={{ padding:'80px 24px', background:'#0d0d14' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <h2 style={{ fontSize:'36px', fontWeight:'800', color:'#f1f0ff', marginBottom:'12px', letterSpacing:'-0.5px' }}>
              Supported Platforms
            </h2>
            <p style={{ color:'#a0a0b8', fontSize:'16px' }}>
              We compare across all major Indian shopping websites
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'16px' }}>
            {platforms.map((p) => (
              <div key={p.name} style={{
                background:'#16161f',
                border:'1px solid rgba(139,92,246,0.1)',
                borderRadius:'16px', padding:'24px 16px',
                textAlign:'center', cursor:'pointer',
                transition:'all 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,92,246,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize:'36px', marginBottom:'10px', animation:'float 3s ease-in-out infinite' }}>{p.emoji}</div>
                <div style={{ fontWeight:'600', color:'#f1f0ff', fontSize:'13px' }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding:'80px 24px', background:'#0a0a0f' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <h2 style={{ fontSize:'36px', fontWeight:'800', color:'#f1f0ff', marginBottom:'12px', letterSpacing:'-0.5px' }}>
              Why Shop-Compair?
            </h2>
            <p style={{ color:'#a0a0b8', fontSize:'16px' }}>Everything you need to shop smarter</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px' }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                background:'#16161f',
                border:'1px solid rgba(139,92,246,0.1)',
                borderRadius:'20px', padding:'28px',
                transition:'all 0.3s ease',
                animation:`fadeInUp 0.6s ease ${i * 0.1}s both`,
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width:'48px', height:'48px',
                  background:'rgba(139,92,246,0.1)',
                  border:'1px solid rgba(139,92,246,0.2)',
                  borderRadius:'12px',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'22px', marginBottom:'16px',
                }}>{f.icon}</div>
                <h3 style={{ fontSize:'17px', fontWeight:'700', color:'#f1f0ff', marginBottom:'8px' }}>{f.title}</h3>
                <p style={{ color:'#a0a0b8', fontSize:'14px', lineHeight:'1.7' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding:'100px 24px', textAlign:'center',
        background:'linear-gradient(135deg, #0d0820, #130d2e)',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <h2 style={{ fontSize:'44px', fontWeight:'800', color:'#f1f0ff', marginBottom:'16px', letterSpacing:'-0.5px' }}>
            Start Saving Money Today
          </h2>
          <p style={{ color:'#a0a0b8', fontSize:'18px', marginBottom:'44px' }}>
            Join thousands of smart shoppers using Shop-Compair
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/signup')} style={{
              background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color:'white', padding:'16px 36px',
              borderRadius:'14px', fontSize:'16px', fontWeight:'700',
              border:'none', cursor:'pointer',
              boxShadow:'0 8px 32px rgba(139,92,246,0.4)',
              transition:'all 0.3s ease',
            }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Create Free Account 🚀
            </button>
            <button onClick={() => navigate('/compare')} style={{
              background:'transparent',
              color:'#a78bfa', padding:'16px 36px',
              borderRadius:'14px', fontSize:'16px', fontWeight:'700',
              border:'1px solid rgba(139,92,246,0.3)',
              cursor:'pointer', transition:'all 0.3s ease',
            }}>
              Try Without Account →
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;