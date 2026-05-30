import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Compare = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [focused, setFocused] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.url) {
      setUrl(location.state.url);
      handleCompare(location.state.url);
    }
  }, []);

  const handleCompare = async (inputUrl) => {
    const compareUrl = inputUrl || url;
    if (!compareUrl.trim()) { toast.error('Please enter a product URL'); return; }
    setLoading(true);
    setResults(null);
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: 'Bearer ' + token } : {};
      const res = await axios.post('http://localhost:5000/api/product/compare', { url: compareUrl }, { headers });
      setResults(res.data);
      toast.success('Comparison complete!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (!results) return;
    const token = localStorage.getItem('token');
    if (!token) { toast.error('Please login to save to wishlist'); return; }
    try {
      const best = results.comparisons[0];
      await axios.post('http://localhost:5000/api/product/wishlist', {
        product_name: results.product,
        product_image: results.image,
        best_price: best.price,
        best_platform: best.platform,
        product_url: url,
      }, { headers: { Authorization: 'Bearer ' + token } });
      toast.success('Added to wishlist!');
    } catch (err) {
      toast.error('Could not add to wishlist');
    }
  };

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* Header */}
      <div style={{
        padding: '60px 24px 80px',
        background: 'linear-gradient(135deg, #0d0820, #130d2e)',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:`linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
          backgroundSize:'60px 60px', pointerEvents:'none',
        }} />

        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            background:'rgba(139,92,246,0.1)',
            border:'1px solid rgba(139,92,246,0.3)',
            color:'#a78bfa', padding:'6px 16px',
            borderRadius:'100px', fontSize:'12px', fontWeight:'600',
            marginBottom:'20px',
          }}>
            <span style={{ width:'6px', height:'6px', background:'#8b5cf6', borderRadius:'50%' }} />
            Smart Price Comparison
          </div>

          <h1 style={{
            fontSize:'clamp(32px, 5vw, 52px)',
            fontWeight:'800', color:'#f1f0ff',
            marginBottom:'12px', letterSpacing:'-0.5px',
          }}>
            Compare Prices Instantly
          </h1>
          <p style={{ color:'#a0a0b8', fontSize:'16px', marginBottom:'40px' }}>
            Paste any product URL to find the best deal across all platforms
          </p>

          {/* Search */}
          <div style={{
            background: focused ? 'rgba(139,92,246,0.08)' : 'rgba(22,22,31,0.9)',
            border: focused ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(139,92,246,0.2)',
            borderRadius:'18px',
            padding:'8px 8px 8px 20px',
            display:'flex', alignItems:'center', gap:'12px',
            maxWidth:'700px', margin:'0 auto',
            transition:'all 0.3s ease',
            boxShadow: focused ? '0 0 40px rgba(139,92,246,0.15)' : 'none',
          }}>
            <span style={{ fontSize:'18px', opacity:0.6 }}>🔗</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
              placeholder="Paste Amazon, Flipkart, Myntra, Nykaa URL..."
              style={{
                flex:1, background:'transparent', border:'none',
                color:'#f1f0ff', fontSize:'15px', outline:'none',
              }}
            />
            <button
              onClick={() => handleCompare()}
              disabled={loading}
              style={{
                background: loading ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color:'white', padding:'12px 24px',
                borderRadius:'12px', fontSize:'14px', fontWeight:'700',
                cursor: loading ? 'not-allowed' : 'pointer',
                border:'none', whiteSpace:'nowrap',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(139,92,246,0.4)',
                transition:'all 0.3s ease',
              }}
            >
              {loading ? 'Comparing...' : 'Compare Now →'}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'48px 24px 80px' }}>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign:'center', padding:'80px', animation:'fadeIn 0.5s ease' }}>
            <div style={{
              width:'60px', height:'60px',
              border:'3px solid rgba(139,92,246,0.2)',
              borderTopColor:'#8b5cf6',
              borderRadius:'50%',
              animation:'spin 0.8s linear infinite',
              margin:'0 auto 24px',
            }} />
            <p style={{ color:'#a78bfa', fontSize:'16px', fontWeight:'500' }}>
              Fetching product details...
            </p>
            <p style={{ color:'#6b6b80', fontSize:'13px', marginTop:'8px' }}>
              This may take a few seconds
            </p>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div style={{ animation:'fadeInUp 0.5s ease' }}>

            {/* Product Header */}
            <div style={{
              background:'#16161f',
              border:'1px solid rgba(139,92,246,0.15)',
              borderRadius:'20px', padding:'24px 28px',
              marginBottom:'32px',
              display:'flex', alignItems:'center',
              justifyContent:'space-between', flexWrap:'wrap', gap:'16px',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
                {results.image && (
                  <div style={{
                    width:'64px', height:'64px',
                    background:'rgba(139,92,246,0.08)',
                    borderRadius:'12px', overflow:'hidden',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0,
                  }}>
                    <img src={results.image} alt="" style={{ width:'56px', height:'56px', objectFit:'contain' }} onError={(e) => e.target.style.display='none'} />
                  </div>
                )}
                <div>
                  <h2 style={{
                    fontSize:'18px', fontWeight:'700', color:'#f1f0ff',
                    marginBottom:'6px', maxWidth:'500px',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                  }}>
                    {results.product}
                  </h2>
                  <p style={{ color:'#6b6b80', fontSize:'13px' }}>
                    Found {results.comparisons.length} result(s)
                  </p>
                </div>
              </div>
              <button onClick={handleWishlist} style={{
                background:'rgba(139,92,246,0.1)',
                border:'1px solid rgba(139,92,246,0.3)',
                color:'#a78bfa', padding:'10px 20px',
                borderRadius:'10px', fontSize:'13px', fontWeight:'600',
                cursor:'pointer', display:'flex', alignItems:'center', gap:'6px',
                transition:'all 0.2s ease',
              }}>
                ❤️ Save to Wishlist
              </button>
            </div>

            {/* Cards */}
            {results.comparisons.length > 0 ? (
              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
                gap:'20px',
              }}>
                {results.comparisons.map((result, index) => (
                  <div key={index} style={{
                    background:'#16161f',
                    borderRadius:'20px', padding:'24px',
                    border: index === 0 ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(139,92,246,0.1)',
                    position:'relative',
                    boxShadow: index === 0 ? '0 8px 32px rgba(139,92,246,0.15)' : 'none',
                    transition:'all 0.3s ease',
                    animation:`fadeInUp 0.5s ease ${index * 0.1}s both`,
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = index === 0 ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.1)';
                    }}
                  >
                    {/* Best Deal Badge */}
                    {index === 0 && (
                      <div style={{
                        position:'absolute', top:'-12px', left:'50%',
                        transform:'translateX(-50%)',
                        background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                        color:'white', padding:'4px 16px',
                        borderRadius:'100px', fontSize:'11px', fontWeight:'700',
                        whiteSpace:'nowrap', boxShadow:'0 4px 12px rgba(139,92,246,0.4)',
                        letterSpacing:'0.5px',
                      }}>
                        🏆 BEST DEAL
                      </div>
                    )}

                    {/* Platform Badge */}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                      <span style={{
                        background:'rgba(139,92,246,0.12)',
                        border:'1px solid rgba(139,92,246,0.2)',
                        color:'#a78bfa', padding:'5px 12px',
                        borderRadius:'100px', fontSize:'12px', fontWeight:'700',
                      }}>{result.platform}</span>
                      <span style={{
                        background: result.inStock ? 'rgba(20,184,166,0.1)' : 'rgba(239,68,68,0.1)',
                        color: result.inStock ? '#14b8a6' : '#ef4444',
                        border: `1px solid ${result.inStock ? 'rgba(20,184,166,0.2)' : 'rgba(239,68,68,0.2)'}`,
                        padding:'4px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:'600',
                      }}>
                        {result.inStock ? '● In Stock' : '● Out of Stock'}
                      </span>
                    </div>

                    {/* Image */}
                    {result.image && (
                      <div style={{
                        background:'rgba(139,92,246,0.05)',
                        borderRadius:'12px', padding:'12px',
                        height:'160px', display:'flex',
                        alignItems:'center', justifyContent:'center',
                        marginBottom:'16px',
                        border:'1px solid rgba(139,92,246,0.08)',
                      }}>
                        <img src={result.image} alt={result.name}
                          style={{ maxHeight:'136px', maxWidth:'100%', objectFit:'contain' }}
                          onError={(e) => e.target.style.display='none'}
                        />
                      </div>
                    )}

                    {/* Name */}
                    <h3 style={{
                      fontSize:'14px', fontWeight:'500', color:'#d4d4e8',
                      marginBottom:'16px', lineHeight:'1.5',
                      display:'-webkit-box', WebkitLineClamp:2,
                      WebkitBoxOrient:'vertical', overflow:'hidden',
                    }}>{result.name}</h3>

                    {/* Price */}
                    <div style={{
                      background:'rgba(139,92,246,0.06)',
                      border:'1px solid rgba(139,92,246,0.12)',
                      borderRadius:'12px', padding:'14px 16px',
                      marginBottom:'14px',
                    }}>
                      <div style={{ fontSize:'28px', fontWeight:'800', color:'#a78bfa', marginBottom:'2px' }}>
                        {result.price > 0 ? '₹' + result.price.toLocaleString() : 'Price N/A'}
                      </div>
                      {result.discount && result.discount !== '0%' && (
                        <span style={{
                          background:'rgba(251,191,36,0.1)',
                          border:'1px solid rgba(251,191,36,0.2)',
                          color:'#f59e0b', padding:'2px 8px',
                          borderRadius:'100px', fontSize:'11px', fontWeight:'600',
                        }}>
                          🏷️ {result.discount} off
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'16px' }}>
                      {result.seller && (
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px' }}>
                          <span style={{ color:'#6b6b80' }}>Seller</span>
                          <span style={{ color:'#d4d4e8', fontWeight:'500' }}>{result.seller}</span>
                        </div>
                      )}
                      {result.delivery && (
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px' }}>
                          <span style={{ color:'#6b6b80' }}>Delivery</span>
                          <span style={{ color:'#14b8a6', fontWeight:'500' }}>{result.delivery}</span>
                        </div>
                      )}
                      {result.rating && (
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px' }}>
                          <span style={{ color:'#6b6b80' }}>Rating</span>
                          <span style={{ color:'#f59e0b', fontWeight:'500' }}>⭐ {result.rating}/5</span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <a href={result.url} target="_blank" rel="noreferrer" style={{
                      display:'block', textAlign:'center',
                      background: index === 0
                        ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
                        : 'rgba(139,92,246,0.08)',
                      color: index === 0 ? 'white' : '#a78bfa',
                      border: index === 0 ? 'none' : '1px solid rgba(139,92,246,0.2)',
                      padding:'11px', borderRadius:'10px',
                      fontSize:'13px', fontWeight:'600',
                      textDecoration:'none', transition:'all 0.2s ease',
                      boxShadow: index === 0 ? '0 4px 16px rgba(139,92,246,0.3)' : 'none',
                    }}>
                      View on {result.platform} →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'80px' }}>
                <p style={{ fontSize:'48px', marginBottom:'16px' }}>😕</p>
                <p style={{ color:'#6b6b80', fontSize:'16px' }}>No results found. Try a different URL.</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!results && !loading && (
          <div style={{ textAlign:'center', padding:'80px', animation:'fadeIn 0.5s ease' }}>
            <div style={{
              width:'80px', height:'80px',
              background:'rgba(139,92,246,0.08)',
              border:'1px solid rgba(139,92,246,0.15)',
              borderRadius:'20px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'36px', margin:'0 auto 24px',
            }}>🔍</div>
            <h3 style={{ fontSize:'22px', fontWeight:'700', color:'#f1f0ff', marginBottom:'10px' }}>
              Ready to Compare!
            </h3>
            <p style={{ color:'#6b6b80', fontSize:'15px' }}>
              Paste a product URL above and click Compare Now
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Compare;