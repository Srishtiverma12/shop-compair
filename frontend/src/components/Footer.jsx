import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{
    background:'#0d0d14',
    borderTop:'1px solid rgba(139,92,246,0.1)',
    padding:'60px 24px 32px',
  }}>
    <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'40px', marginBottom:'48px' }}>

        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
            <div style={{
              width:'34px', height:'34px',
              background:'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              borderRadius:'8px', display:'flex', alignItems:'center',
              justifyContent:'center', fontWeight:'800', fontSize:'16px', color:'white',
            }}>S</div>
            <span style={{ fontSize:'16px', fontWeight:'800', color:'#f1f0ff' }}>Shop-Compair</span>
          </div>
          <p style={{ color:'#6b6b80', fontSize:'13px', lineHeight:'1.8' }}>
            AI-powered price comparison. Find the best deals across all major shopping platforms instantly.
          </p>
        </div>

        {[
          { title:'Navigation', links:[{to:'/', label:'Home'},{to:'/compare', label:'Compare'},{to:'/dashboard', label:'Dashboard'},{to:'/settings', label:'Settings'}] },
          { title:'Platforms', links:[{to:'/compare', label:'Amazon'},{to:'/compare', label:'Flipkart'},{to:'/compare', label:'Myntra'},{to:'/compare', label:'Nykaa'}] },
          { title:'Account', links:[{to:'/login', label:'Login'},{to:'/signup', label:'Sign Up'},{to:'/forgot-password', label:'Forgot Password'}] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ color:'#f1f0ff', fontWeight:'700', fontSize:'14px', marginBottom:'16px', letterSpacing:'0.5px' }}>
              {col.title}
            </h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {col.links.map((l) => (
                <Link key={l.label} to={l.to} style={{
                  color:'#6b6b80', fontSize:'13px',
                  transition:'color 0.2s ease',
                }}
                  onMouseEnter={(e) => e.target.style.color = '#a78bfa'}
                  onMouseLeave={(e) => e.target.style.color = '#6b6b80'}
                >{l.label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        borderTop:'1px solid rgba(139,92,246,0.1)',
        paddingTop:'24px',
        display:'flex', justifyContent:'space-between',
        alignItems:'center', flexWrap:'wrap', gap:'12px',
      }}>
        <p style={{ color:'#6b6b80', fontSize:'13px' }}>© 2024 Shop-Compair. All rights reserved.</p>
        <p style={{ color:'#6b6b80', fontSize:'13px' }}>Made with ❤️ for smart shoppers</p>
      </div>
    </div>
  </footer>
);

export default Footer;