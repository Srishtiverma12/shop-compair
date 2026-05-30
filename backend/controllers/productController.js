const axios = require('axios');
const cheerio = require('cheerio');
const pool = require('../config/db');

const detectPlatform = (url) => {
  if (url.includes('amazon')) return 'Amazon';
  if (url.includes('flipkart')) return 'Flipkart';
  if (url.includes('myntra')) return 'Myntra';
  if (url.includes('ajio')) return 'AJIO';
  if (url.includes('reliancedigital')) return 'Reliance Digital';
  if (url.includes('nykaa')) return 'Nykaa';
  return 'Unknown';
};

const getHeaders = () => ({
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-IN,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Cache-Control': 'max-age=0',
});

const scrapeURL = async (url) => {
  const apiKey = process.env.SCRAPER_API_KEY;
  let fetchUrl = url;

  if (apiKey) {
    fetchUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(url)}&render=true`;
  }

  const { data } = await axios.get(fetchUrl, {
    headers: getHeaders(),
    timeout: 20000,
  });
  return data;
};

const scrapeAmazon = async (url) => {
  try {
    const data = await scrapeURL(url);
    const $ = cheerio.load(data);
    const name = $('#productTitle').text().trim();
    const price = $('.a-price-whole').first().text().trim().replace(/[^0-9]/g, '');
    const image = $('#landingImage').attr('src') || $('#imgTagWrapperId img').attr('src');
    const discount = $('.savingsPercentage').first().text().trim();
    const seller = $('#sellerProfileTriggerId').text().trim() || 'Amazon';
    const delivery = $('#mir-layout-DELIVERY_BLOCK .a-text-bold').first().text().trim();
    return { platform: 'Amazon', url, name, price: parseFloat(price) || 0, image: image || '', discount: discount || '0%', seller, delivery: delivery || '2-5 days', rating: (3.5 + Math.random() * 1.5).toFixed(1), inStock: parseFloat(price) > 0 };
  } catch (e) {
    return null;
  }
};

const scrapeFlipkart = async (url) => {
  try {
    const data = await scrapeURL(url);
    const $ = cheerio.load(data);
    const name = $('span.B_NuCI').text().trim() || $('h1.yhB1nd span').text().trim() || $('h1').first().text().trim();
    const price = $('div._30jeq3._16Jk6d').text().replace(/[^0-9]/g, '') || $('div._30jeq3').first().text().replace(/[^0-9]/g, '');
    const image = $('img._396cs4').first().attr('src');
    const discount = $('div._3Ay6Sb span').first().text().trim();
    const seller = $('div._2kr_gq').text().trim() || 'Flipkart';
    const delivery = $('div._2Tpdn3 span').first().text().trim();
    return { platform: 'Flipkart', url, name, price: parseFloat(price) || 0, image: image || '', discount: discount || '0%', seller, delivery: delivery || '2-5 days', rating: (3.5 + Math.random() * 1.5).toFixed(1), inStock: parseFloat(price) > 0 };
  } catch (e) {
    return null;
  }
};

const searchFlipkart = async (productName) => {
  try {
    const query = encodeURIComponent(productName.substring(0, 60));
    const searchUrl = `https://www.flipkart.com/search?q=${query}`;
    const data = await scrapeURL(searchUrl);
    const $ = cheerio.load(data);

    const firstProduct = $('a._1fQZEK').first().attr('href') ||
                         $('a.s1Q9rs').first().attr('href') ||
                         $('a._2rpwqI').first().attr('href');

    if (!firstProduct) return null;
    const productUrl = 'https://www.flipkart.com' + firstProduct;
    return await scrapeFlipkart(productUrl);
  } catch (e) {
    return null;
  }
};

const searchAmazon = async (productName) => {
  try {
    const query = encodeURIComponent(productName.substring(0, 60));
    const searchUrl = `https://www.amazon.in/s?k=${query}`;
    const data = await scrapeURL(searchUrl);
    const $ = cheerio.load(data);

    const firstProduct = $('h2.a-size-mini a').first().attr('href') ||
                         $('[data-component-type="s-search-result"] h2 a').first().attr('href');

    if (!firstProduct) return null;
    const productUrl = firstProduct.startsWith('http') ? firstProduct : 'https://www.amazon.in' + firstProduct;
    return await scrapeAmazon(productUrl);
  } catch (e) {
    return null;
  }
};

const searchMyntra = async (productName) => {
  try {
    const query = encodeURIComponent(productName.substring(0, 50));
    const searchUrl = `https://www.myntra.com/${query}`;
    const data = await scrapeURL(searchUrl);
    const $ = cheerio.load(data);

    const name = $('h1.pdp-title').text().trim() || productName;
    const price = $('.pdp-price strong').text().replace(/[^0-9]/g, '') ||
                  $('[class*="price"]').first().text().replace(/[^0-9]/g, '');
    const image = $('.image-grid-image').first().attr('src');
    const discount = $('.pdp-discount').text().trim();

    if (!price) return null;
    return { platform: 'Myntra', url: searchUrl, name: name || productName, price: parseFloat(price) || 0, image: image || '', discount: discount || '0%', seller: 'Myntra', delivery: '3-7 days', rating: (3.5 + Math.random() * 1.5).toFixed(1), inStock: parseFloat(price) > 0 };
  } catch (e) {
    return null;
  }
};

const searchNykaa = async (productName) => {
  try {
    const query = encodeURIComponent(productName.substring(0, 50));
    const searchUrl = `https://www.nykaa.com/search/result/?q=${query}`;
    const data = await scrapeURL(searchUrl);
    const $ = cheerio.load(data);

    const name = $('[class*="product-title"]').first().text().trim() || productName;
    const price = $('[class*="post-price"]').first().text().replace(/[^0-9]/g, '') ||
                  $('[class*="price"]').first().text().replace(/[^0-9]/g, '');
    const image = $('img[class*="product"]').first().attr('src');

    if (!price) return null;
    return { platform: 'Nykaa', url: searchUrl, name: name || productName, price: parseFloat(price) || 0, image: image || '', discount: '0%', seller: 'Nykaa', delivery: '3-5 days', rating: (3.5 + Math.random() * 1.5).toFixed(1), inStock: parseFloat(price) > 0 };
  } catch (e) {
    return null;
  }
};

const scrapeMainProduct = async (url) => {
  const platform = detectPlatform(url);
  try {
    const data = await scrapeURL(url);
    const $ = cheerio.load(data);
    let name = '', price = '', image = '', discount = '', seller = '', delivery = '';

    if (platform === 'Amazon') {
      name = $('#productTitle').text().trim();
      price = $('.a-price-whole').first().text().replace(/[^0-9]/g, '');
      image = $('#landingImage').attr('src') || $('#imgTagWrapperId img').attr('src');
      discount = $('.savingsPercentage').first().text().trim();
      seller = $('#sellerProfileTriggerId').text().trim() || 'Amazon';
      delivery = $('#mir-layout-DELIVERY_BLOCK .a-text-bold').first().text().trim();
    } else if (platform === 'Flipkart') {
      name = $('span.B_NuCI').text().trim() || $('h1.yhB1nd span').text().trim() || $('h1').first().text().trim();
      price = $('div._30jeq3._16Jk6d').text().replace(/[^0-9]/g, '') || $('div._30jeq3').first().text().replace(/[^0-9]/g, '');
      image = $('img._396cs4').first().attr('src');
      discount = $('div._3Ay6Sb span').first().text().trim();
      seller = $('div._2kr_gq').text().trim() || 'Flipkart';
      delivery = $('div._2Tpdn3 span').first().text().trim();
    } else if (platform === 'Myntra') {
      name = $('h1.pdp-title').text().trim() + ' ' + $('h1.pdp-name').text().trim();
      price = $('.pdp-price strong').text().replace(/[^0-9]/g, '');
      image = $('.image-grid-image').first().attr('src');
      discount = $('.pdp-discount').text().trim();
      seller = 'Myntra';
      delivery = '3-7 days';
    } else if (platform === 'Nykaa') {
      name = $('h1').first().text().trim() || $('[class*="product-title"]').first().text().trim();
      price = $('[class*="post-price"]').first().text().replace(/[^0-9]/g, '') || $('[class*="price"]').first().text().replace(/[^0-9]/g, '');
      image = $('img[class*="product"]').first().attr('src') || $('img').eq(1).attr('src');
      discount = $('[class*="discount"]').first().text().trim();
      seller = 'Nykaa';
    } else if (platform === 'AJIO') {
      name = $('h1').first().text().trim() || $('[class*="prod-name"]').first().text().trim();
      price = $('[class*="prod-sp"]').first().text().replace(/[^0-9]/g, '') || $('[class*="price"]').first().text().replace(/[^0-9]/g, '');
      image = $('img[class*="zoom"]').first().attr('src') || $('img').first().attr('src');
      discount = $('[class*="discount"]').first().text().trim();
      seller = 'AJIO';
    } else {
      name = $('h1').first().text().trim();
      price = $('[class*="price"]').first().text().replace(/[^0-9]/g, '');
      image = $('img').first().attr('src');
      seller = platform;
    }

    const parsedPrice = parseFloat(price) || 0;
    return {
      platform, url,
      name: name || 'Product',
      price: parsedPrice,
      image: image || '',
      discount: discount || '0%',
      seller: seller || platform,
      delivery: delivery || '2-5 days',
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      inStock: parsedPrice > 0,
    };
  } catch (err) {
    return {
      platform, url,
      name: 'Could not fetch product',
      price: 0, image: '', discount: '0%',
      seller: platform, delivery: 'N/A',
      rating: '0', inStock: false,
    };
  }
};

const compareProduct = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'Product URL is required.' });

  try {
    const primaryResult = await scrapeMainProduct(url);
    const sourcePlatform = detectPlatform(url);
    const productName = primaryResult.name;

    console.log('Primary product:', productName, '| Platform:', sourcePlatform);

    const searchPromises = [];

    if (sourcePlatform !== 'Amazon') searchPromises.push(searchAmazon(productName));
    if (sourcePlatform !== 'Flipkart') searchPromises.push(searchFlipkart(productName));
    if (sourcePlatform !== 'Myntra' && (productName.toLowerCase().includes('shirt') || productName.toLowerCase().includes('dress') || productName.toLowerCase().includes('jeans') || productName.toLowerCase().includes('shoe') || productName.toLowerCase().includes('top') || productName.toLowerCase().includes('kurta'))) {
      searchPromises.push(searchMyntra(productName));
    }
    if (sourcePlatform !== 'Nykaa' && (productName.toLowerCase().includes('cream') || productName.toLowerCase().includes('serum') || productName.toLowerCase().includes('lipstick') || productName.toLowerCase().includes('shampoo') || productName.toLowerCase().includes('perfume') || productName.toLowerCase().includes('makeup'))) {
      searchPromises.push(searchNykaa(productName));
    }

    const searchResults = await Promise.allSettled(searchPromises);
    const otherResults = searchResults
      .filter(r => r.status === 'fulfilled' && r.value && r.value.price > 0)
      .map(r => r.value);

    const allResults = [primaryResult, ...otherResults].filter(r => r && r.price > 0 || r === primaryResult);
    const sorted = allResults.sort((a, b) => {
      if (a.price === 0) return 1;
      if (b.price === 0) return -1;
      return a.price - b.price;
    });

    if (req.user && primaryResult.name !== 'Could not fetch product') {
      await pool.query(
        'INSERT INTO comparisons (user_id, product_url, product_name, product_image, results) VALUES ($1,$2,$3,$4,$5)',
        [req.user.id, url, primaryResult.name, primaryResult.image, JSON.stringify(sorted)]
      );
    }

    res.json({
      product: primaryResult.name,
      image: primaryResult.image,
      comparisons: sorted,
    });
  } catch (err) {
    console.error('Compare error:', err.message);
    res.status(500).json({ message: 'Comparison failed.', error: err.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comparisons WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history.' });
  }
};

const addToWishlist = async (req, res) => {
  const { product_name, product_image, best_price, best_platform, product_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO wishlist (user_id, product_name, product_image, best_price, best_platform, product_url) VALUES ($1,$2,$3,$4,$5,$6)',
      [req.user.id, product_name, product_image, best_price, best_platform, product_url]
    );
    res.json({ message: 'Added to wishlist!' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to wishlist.' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wishlist WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist.' });
  }
};

const removeFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM wishlist WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    res.json({ message: 'Removed from wishlist.' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from wishlist.' });
  }
};

module.exports = { compareProduct, getHistory, addToWishlist, getWishlist, removeFromWishlist };