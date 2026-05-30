import React from 'react'

function ProductCard({ result, isBest }) {
  const linkStyle = {
    display:'block',
    textAlign:'center',
    marginTop:'16px',
    background: isBest ? '#7c3aed' : '#f0ebe0',
    color: isBest ? 'white' : '#1e1b4b',
    padding:'10px',
    borderRadius:'10px',
    fontSize:'14px',
    fontWeight:'600',
    textDecoration:'none'
  }

  return (
    <div style={{background:'white',borderRadius:'20px',padding:'24px',border: isBest ? '2px solid #7c3aed' : '1px solid #e5e7eb',position:'relative'}}>

      {isBest && (
        <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#7c3aed',color:'white',padding:'4px 16px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',whiteSpace:'nowrap'}}>
          Best Deal
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px'}}>
        <span style={{background:'#ede9fe',color:'#5b21b6',padding:'6px 14px',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>
          {result.platform}
        </span>
        <span style={{background: result.inStock ? '#d1fae5' : '#fee2e2',color: result.inStock ? '#065f46' : '#991b1b',padding:'4px 10px',borderRadius:'20px',fontSize:'12px'}}>
          {result.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {result.image && (
        <div style={{display:'flex',justifyContent:'center',marginBottom:'16px',background:'#f9f6f0',borderRadius:'12px',padding:'12px',height:'160px',alignItems:'center'}}>
          <img
            src={result.image}
            alt={result.name}
            style={{maxHeight:'136px',maxWidth:'100%',objectFit:'contain'}}
            onError={(e) => { e.target.style.display='none' }}
          />
        </div>
      )}

      <h3 style={{fontSize:'14px',fontWeight:'600',color:'#1e1b4b',marginBottom:'12px',lineHeight:'1.5'}}>
        {result.name}
      </h3>

      <div style={{fontSize:'28px',fontWeight:'700',color:'#7c3aed',marginBottom:'8px'}}>
        {result.price > 0 ? 'Rs.' + result.price.toLocaleString() : 'Price N/A'}
      </div>

      {result.discount && result.discount !== '0%' && (
        <div style={{display:'inline-block',background:'#fef3c7',color:'#92400e',padding:'3px 10px',borderRadius:'20px',fontSize:'12px',marginBottom:'12px'}}>
          {result.discount} off
        </div>
      )}

      <div style={{display:'flex',flexDirection:'column',gap:'8px',marginTop:'12px'}}>
        {result.seller && (
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px'}}>
            <span style={{color:'#6b7280'}}>Seller</span>
            <span style={{fontWeight:'500'}}>{result.seller}</span>
          </div>
        )}
        {result.delivery && (
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px'}}>
            <span style={{color:'#6b7280'}}>Delivery</span>
            <span style={{fontWeight:'500'}}>{result.delivery}</span>
          </div>
        )}
        {result.rating && (
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px'}}>
            <span style={{color:'#6b7280'}}>Rating</span>
            <span style={{color:'#f59e0b'}}>{result.rating}/5</span>
          </div>
        )}
      </div>

      <a href={result.url} target="_blank" rel="noreferrer" style={linkStyle}>
        View on {result.platform}
      </a>

    </div>
  )
}

export default ProductCard