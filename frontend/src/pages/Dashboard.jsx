import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('history');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: 'Bearer ' + token };
      const [histRes, wishRes] = await Promise.all([
        axios.get('http://localhost:5000/api/product/history', { headers }),
        axios.get('http://localhost:5000/api/product/wishlist', { headers }),
      ]);
      setHistory(histRes.data);
      setWishlist(wishRes.data);
    } catch (err) {
      toast.error('Could not load data');
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/product/wishlist/' + id, {
        headers: { Authorization: 'Bearer ' + token },
      });
      setWishlist(wishlist.filter((w) => w.id !== id));
      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error('Could not remove');
    }
  };

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return '🌅 Good Morning';
    if (h < 17) return '☀️ Good Afternoon';
    return '🌙 Good Evening';
  };

  const stats = [
    { icon: '🔍', label: 'Total Comparisons', value: history.length, color: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)', textColor: '#a78bfa' },
    { icon: '❤️', label: 'Wishlist Items', value: wishlist.length, color: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.3)', textColor: '#f472b6' },
    { icon: '💰', label: 'Deals Found', value: history.length * 3 || 0, color: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', textColor: '#fbbf24' },
    { icon: '🏆', label: 'Money Saved', value: '₹' + (history.length * 240 || 0), color: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.3)', textColor: '#2dd4bf' },
  ];

  return (
    <div style={{ background: '#080810', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* Top Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0d0820 0%, #130d2e 50%, #1a0a3d 100%)',
        padding: '52px 24px 120px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow orbs */}
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'5%', width:'300px', height:'300px', background:'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', left:'40%', width:'200px', height:'200px', background:'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }} />

        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>
          {/* User Info */}
          <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'52px', animation:'fadeInUp 0.6s ease' }}>
            <div style={{
              width:'76px', height:'76px',
              background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'30px', fontWeight:'800', color:'white',
              border:'2px solid rgba(139,92,246,0.4)',
              boxShadow:'0 0 32px rgba(139,92,246,0.4), 0 0 64px rgba(139,92,246,0.15)',
              flexShrink:0, animation:'glow 3s ease-in-out infinite',
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ color:'#a78bfa', fontSize:'13px', marginBottom:'6px', fontWeight:'500', letterSpacing:'0.5px' }}>
                {greet()}
              </p>
              <h1 style={{ color:'#f1f0ff', fontSize:'28px', fontWeight:'800', marginBottom:'4px', letterSpacing:'-0.5px' }}>
                {user?.name}
              </h1>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ width:'6px', height:'6px', background:'#2dd4bf', borderRadius:'50%', display:'inline-block' }} />
                <p style={{ color:'#6b6b80', fontSize:'13px' }}>{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: s.color,
                border: `1px solid ${s.border}`,
                borderRadius:'18px', padding:'22px',
                backdropFilter:'blur(10px)',
                animation:`fadeInUp 0.6s ease ${i * 0.1}s both`,
                transition:'all 0.3s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${s.border}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize:'28px', marginBottom:'12px' }}>{s.icon}</div>
                <div style={{ color:s.textColor, fontSize:'26px', fontWeight:'800', marginBottom:'4px', letterSpacing:'-0.5px' }}>
                  {s.value}
                </div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px', fontWeight:'500', letterSpacing:'0.3px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth:'1200px', margin:'-60px auto 0', padding:'0 24px 80px', position:'relative', zIndex:2 }}>

        {/* Quick Compare Card */}
        <div style={{
          background:'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(109,40,217,0.1))',
          border:'1px solid rgba(139,92,246,0.25)',
          borderRadius:'22px', padding:'28px 32px',
          marginBottom:'28px',
          display:'flex', alignItems:'center',
          justifyContent:'space-between', flexWrap:'wrap', gap:'20px',
          backdropFilter:'blur(20px)',
          boxShadow:'0 8px 32px rgba(139,92,246,0.1)',
          animation:'fadeInUp 0.6s ease 0.2s both',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{
              width:'54px', height:'54px',
              background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              borderRadius:'14px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'24px',
              boxShadow:'0 8px 20px rgba(139,92,246,0.4)',
            }}>🚀</div>
            <div>
              <h3 style={{ color:'#f1f0ff', fontSize:'17px', fontWeight:'700', marginBottom:'4px' }}>
                Compare a New Product
              </h3>
              <p style={{ color:'#a0a0b8', fontSize:'13px' }}>
                Paste any Amazon, Flipkart, Myntra, Nykaa URL
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/compare')} style={{
            background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            color:'white', padding:'12px 28px',
            borderRadius:'12px', fontSize:'14px', fontWeight:'700',
            border:'none', cursor:'pointer',
            boxShadow:'0 4px 20px rgba(139,92,246,0.4)',
            transition:'all 0.3s ease', whiteSpace:'nowrap',
          }}
            onMouseEnter={(e) => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 8px 28px rgba(139,92,246,0.5)'; }}
            onMouseLeave={(e) => { e.target.style.transform='translateY(0)'; e.target.style.boxShadow='0 4px 20px rgba(139,92,246,0.4)'; }}
          >
            Compare Now →
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display:'flex', gap:'6px', marginBottom:'28px',
          background:'rgba(22,22,31,0.8)',
          border:'1px solid rgba(139,92,246,0.12)',
          padding:'6px', borderRadius:'16px',
          width:'fit-content',
          backdropFilter:'blur(10px)',
        }}>
          {[
            { id:'history', label:'Comparison History', icon:'📊', count: history.length },
            { id:'wishlist', label:'My Wishlist', icon:'❤️', count: wishlist.length },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding:'10px 20px', borderRadius:'12px',
              fontSize:'13px', fontWeight:'600',
              cursor:'pointer', border:'none',
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
                : 'transparent',
              color: activeTab === tab.id ? 'white' : '#6b6b80',
              transition:'all 0.3s ease',
              display:'flex', alignItems:'center', gap:'8px',
              boxShadow: activeTab === tab.id ? '0 4px 16px rgba(139,92,246,0.3)' : 'none',
            }}>
              {tab.icon} {tab.label}
              <span style={{
                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(139,92,246,0.15)',
                color: activeTab === tab.id ? 'white' : '#8b5cf6',
                padding:'2px 8px', borderRadius:'20px',
                fontSize:'11px', fontWeight:'700',
              }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign:'center', padding:'80px' }}>
            <div style={{
              width:'52px', height:'52px',
              border:'3px solid rgba(139,92,246,0.15)',
              borderTopColor:'#8b5cf6',
              borderRadius:'50%',
              animation:'spin 0.8s linear infinite',
              margin:'0 auto 20px',
            }} />
            <p style={{ color:'#a78bfa', fontWeight:'500' }}>Loading your data...</p>
          </div>
        ) : (
          <>
            {/* History Tab */}
            {activeTab === 'history' && (
              <div style={{ animation:'fadeInUp 0.4s ease' }}>
                {history.length === 0 ? (
                  <div style={{
                    background:'rgba(16,16,25,0.8)',
                    border:'1px solid rgba(139,92,246,0.12)',
                    borderRadius:'24px', padding:'72px 40px',
                    textAlign:'center', backdropFilter:'blur(10px)',
                  }}>
                    <div style={{
                      width:'80px', height:'80px',
                      background:'rgba(139,92,246,0.1)',
                      border:'1px solid rgba(139,92,246,0.2)',
                      borderRadius:'20px',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'36px', margin:'0 auto 20px',
                    }}>🔍</div>
                    <h3 style={{ fontSize:'20px', fontWeight:'700', color:'#f1f0ff', marginBottom:'10px' }}>
                      No comparisons yet
                    </h3>
                    <p style={{ color:'#6b6b80', marginBottom:'32px', fontSize:'14px' }}>
                      Start comparing products to see history here
                    </p>
                    <button onClick={() => navigate('/compare')} style={{
                      background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                      color:'white', padding:'13px 32px',
                      borderRadius:'12px', fontSize:'14px', fontWeight:'700',
                      border:'none', cursor:'pointer',
                      boxShadow:'0 4px 20px rgba(139,92,246,0.4)',
                    }}>
                      🚀 Start Comparing
                    </button>
                  </div>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                    {history.map((item, i) => (
                      <div key={item.id} style={{
                        background:'rgba(16,16,25,0.9)',
                        border:'1px solid rgba(139,92,246,0.1)',
                        borderRadius:'16px', padding:'18px 22px',
                        display:'flex', alignItems:'center',
                        gap:'16px', flexWrap:'wrap',
                        backdropFilter:'blur(10px)',
                        transition:'all 0.3s ease',
                        animation:`fadeInUp 0.4s ease ${i * 0.05}s both`,
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor='rgba(139,92,246,0.3)'; e.currentTarget.style.transform='translateX(4px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor='rgba(139,92,246,0.1)'; e.currentTarget.style.transform='translateX(0)'; }}
                      >
                        <div style={{
                          width:'48px', height:'48px',
                          background:'rgba(139,92,246,0.1)',
                          border:'1px solid rgba(139,92,246,0.15)',
                          borderRadius:'12px',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          flexShrink:0, overflow:'hidden',
                        }}>
                          {item.product_image
                            ? <img src={item.product_image} alt="" style={{ width:'40px', height:'40px', objectFit:'contain' }} onError={(e) => { e.target.style.display='none'; }} />
                            : <span style={{ fontSize:'20px' }}>📦</span>
                          }
                        </div>
                        <div style={{ flex:1, minWidth:'200px' }}>
                          <p style={{
                            fontWeight:'600', color:'#e2e2f0', fontSize:'14px',
                            marginBottom:'5px', overflow:'hidden',
                            textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'400px',
                          }}>
                            {item.product_name || 'Unknown Product'}
                          </p>
                          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                            <span style={{ color:'#6b6b80', fontSize:'11px' }}>
                              🕐 {new Date(item.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                            </span>
                            <span style={{
                              background:'rgba(139,92,246,0.1)',
                              color:'#a78bfa', padding:'2px 8px',
                              borderRadius:'20px', fontSize:'10px', fontWeight:'600',
                            }}>Compared</span>
                          </div>
                        </div>
                        <Link to="/compare" state={{ url: item.product_url }} style={{
                          background:'rgba(139,92,246,0.1)',
                          border:'1px solid rgba(139,92,246,0.2)',
                          color:'#a78bfa', padding:'8px 16px',
                          borderRadius:'10px', fontSize:'12px', fontWeight:'600',
                          textDecoration:'none', whiteSpace:'nowrap',
                          transition:'all 0.2s ease',
                        }}>
                          🔄 Compare Again
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div style={{ animation:'fadeInUp 0.4s ease' }}>
                {wishlist.length === 0 ? (
                  <div style={{
                    background:'rgba(16,16,25,0.8)',
                    border:'1px solid rgba(139,92,246,0.12)',
                    borderRadius:'24px', padding:'72px 40px',
                    textAlign:'center', backdropFilter:'blur(10px)',
                  }}>
                    <div style={{
                      width:'80px', height:'80px',
                      background:'rgba(236,72,153,0.1)',
                      border:'1px solid rgba(236,72,153,0.2)',
                      borderRadius:'20px',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'36px', margin:'0 auto 20px',
                    }}>❤️</div>
                    <h3 style={{ fontSize:'20px', fontWeight:'700', color:'#f1f0ff', marginBottom:'10px' }}>
                      Wishlist is empty
                    </h3>
                    <p style={{ color:'#6b6b80', marginBottom:'32px', fontSize:'14px' }}>
                      Save products while comparing to track prices
                    </p>
                    <button onClick={() => navigate('/compare')} style={{
                      background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                      color:'white', padding:'13px 32px',
                      borderRadius:'12px', fontSize:'14px', fontWeight:'700',
                      border:'none', cursor:'pointer',
                      boxShadow:'0 4px 20px rgba(139,92,246,0.4)',
                    }}>
                      🛍️ Find Products
                    </button>
                  </div>
                ) : (
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'18px' }}>
                    {wishlist.map((item, i) => (
                      <div key={item.id} style={{
                        background:'rgba(16,16,25,0.9)',
                        border:'1px solid rgba(139,92,246,0.12)',
                        borderRadius:'20px', padding:'20px',
                        backdropFilter:'blur(10px)',
                        transition:'all 0.3s ease',
                        animation:`fadeInUp 0.4s ease ${i * 0.1}s both`,
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor='rgba(139,92,246,0.35)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(139,92,246,0.15)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(139,92,246,0.12)'; e.currentTarget.style.boxShadow='none'; }}
                      >
                        <div style={{
                          background:'rgba(139,92,246,0.06)',
                          border:'1px solid rgba(139,92,246,0.1)',
                          borderRadius:'14px', height:'150px',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          marginBottom:'16px', overflow:'hidden',
                        }}>
                          {item.product_image
                            ? <img src={item.product_image} alt={item.product_name} style={{ maxHeight:'130px', maxWidth:'100%', objectFit:'contain' }} onError={(e) => e.target.style.display='none'} />
                            : <span style={{ fontSize:'48px' }}>🛍️</span>
                          }
                        </div>

                        <p style={{
                          fontWeight:'600', color:'#e2e2f0', fontSize:'13px',
                          marginBottom:'14px', lineHeight:'1.5',
                          display:'-webkit-box', WebkitLineClamp:2,
                          WebkitBoxOrient:'vertical', overflow:'hidden',
                        }}>
                          {item.product_name}
                        </p>

                        <div style={{
                          background:'rgba(139,92,246,0.08)',
                          border:'1px solid rgba(139,92,246,0.15)',
                          borderRadius:'12px', padding:'12px 14px',
                          marginBottom:'14px',
                        }}>
                          <p style={{ color:'#a78bfa', fontWeight:'800', fontSize:'22px', marginBottom:'3px' }}>
                            ₹{parseFloat(item.best_price).toLocaleString()}
                          </p>
                          <p style={{ color:'#6b6b80', fontSize:'11px', fontWeight:'500' }}>
                            Best on {item.best_platform}
                          </p>
                        </div>

                        <div style={{ display:'flex', gap:'8px' }}>
                          <Link to="/compare" state={{ url: item.product_url }} style={{
                            flex:1, textAlign:'center',
                            background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                            color:'white', padding:'10px',
                            borderRadius:'10px', fontSize:'12px', fontWeight:'700',
                            textDecoration:'none',
                            boxShadow:'0 4px 12px rgba(139,92,246,0.3)',
                          }}>
                            🔍 Compare
                          </Link>
                          <button onClick={() => removeWishlist(item.id)} style={{
                            padding:'10px 13px',
                            background:'rgba(239,68,68,0.08)',
                            border:'1px solid rgba(239,68,68,0.2)',
                            color:'#f87171',
                            borderRadius:'10px', fontSize:'15px',
                            cursor:'pointer',
                          }}>
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;