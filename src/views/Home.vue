<template>
  <div class="home">
    <!-- Hero Banner Section -->
    <div class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <h1>Welcome to GOGO Shop <span class="heart-icon">❤️</span></h1>
          <p>Discover amazing products at great prices</p>
          <router-link to="/products" class="shop-now-btn">Shop Now <span class="emoji">🛍️</span></router-link>
        </div>
        <div class="hero-image">
          <img src="https://cdn.pixabay.com/photo/2017/12/12/21/17/doll-figures-3015495_1280.jpg" alt="Featured Products" />
        </div>
      </div>
    </div>
    
    <!-- Categories Section -->
    <div class="categories-section">
      <div class="container">
        <h2 class="section-title">Shop by Category</h2>
        <div class="categories-grid">
          <div class="category-card" v-for="category in categories" :key="category.id">
            <router-link :to="`/products?category=${category.slug}`">
              <div class="category-icon">
                <img :src="getCategoryImage(category.slug)" :alt="category.name">
              </div>
              <h3>{{ category.name }}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Latest Products Section -->
    <div class="latest-products">
      <div class="container">
        <h2 class="section-title">Latest Products</h2>
        <div class="product-grid">
          <product-card
            v-for="product in latestProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
    
    <!-- Feature Section -->
    <div class="features-section">
      <div class="container">
        <div class="feature">
          <div class="feature-icon">🚚</div>
          <h3>Fast Shipping</h3>
          <p>Free shipping on all orders over Rs.50</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔄</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>100% secure payment processing</p>
        </div>
        <div class="feature">
          <div class="feature-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Dedicated support team</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    ...mapState(['products', 'categories']),
    latestProducts() {
      // 限制为最新的8个产品
      return this.products.slice(0, 8)
    }
  },
  methods: {
    getCategoryImage(slug) {
      const images = {
        MenFashion: 'https://ext.same-assets.com/1141641775/1740329215.jpeg',
        MenAccessories: 'https://ext.same-assets.com/2797696504/2349423998.jpeg',
        MobilePhones: 'https://ext.same-assets.com/1465839245/354157306.jpeg',
        WomenFashion: 'https://m.media-amazon.com/images/I/81bjg36TLqL._AC_UL640_FMwebp_QL65_.jpg',
        Grocery: 'https://ext.same-assets.com/624373019/2688352450.jpeg',
        HealthBeauty: 'https://ext.same-assets.com/624373019/2787080317.jpeg',
        LaundryHousehold: 'https://ext.same-assets.com/624373019/167566417.png'
      }
      return images[slug] || 'https://ext.same-assets.com/624373019/167566417.png'
    }
  }
}
</script>

<style scoped>
.home {
  padding-bottom: 48px;
}

/* Hero Banner */
.hero-banner {
  background-color: #fff5f5;
  padding: 64px 0;
  margin-bottom: 48px;
  border-bottom: 3px dotted #fecaca;
}

.hero-banner .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  flex: 1;
  padding-right: 48px;
}

.hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  line-height: 1.2;
  position: relative;
}

.heart-icon {
  color: #ef4444;
  display: inline-block;
  animation: pulse 1.5s infinite;
  font-size: 36px;
  vertical-align: middle;
  margin-left: 10px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.hero-content p {
  font-size: 18px;
  color: #475569;
  margin-bottom: 32px;
}

.shop-now-btn {
  display: inline-block;
  background-color: #ef4444;
  color: white;
  font-weight: 600;
  padding: 14px 30px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.emoji {
  margin-left: 5px;
  display: inline-block;
  transition: transform 0.3s ease;
}

.shop-now-btn:hover {
  background-color: #dc2626;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.shop-now-btn:hover .emoji {
  transform: rotate(15deg);
}

.shop-now-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%);
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s ease;
  z-index: -1;
}

.shop-now-btn:hover::after {
  opacity: 1;
  transform: scale(1);
}

.hero-image {
  flex: 1;
  text-align: right;
}

.hero-image img {
  max-width: 100%;
  border-radius: 25px;
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2);
  border: 3px solid #fecaca;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.hero-image:hover img {
  transform: scale(1.03) rotate(1deg);
  box-shadow: 0 15px 30px rgba(239, 68, 68, 0.3);
}

/* Categories Section */
.categories-section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #991b1b;
  text-align: center;
  margin-bottom: 36px;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::before,
.section-title::after {
  content: '✨';
  display: inline-block;
  margin: 0 15px;
  color: #ef4444;
  animation: spin 3s infinite linear;
  font-size: 24px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background-color: #fff5f5;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px dashed #fecaca;
  position: relative;
}

.category-card::before {
  content: '✨';
  position: absolute;
  top: -10px;
  right: -5px;
  font-size: 20px;
  animation: twinkle 2s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.8); }
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-card a {
  text-decoration: none;
  color: inherit;
}

.category-icon {
  height: 120px;
  width: 120px;
  margin: 0 auto 16px;
  overflow: hidden;
  border-radius: 50%;
  border: 4px solid #fecaca;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.2);
  position: relative;
}

.category-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 70%);
  pointer-events: none;
}

.category-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon img {
  transform: scale(1.1);
}

.category-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #334155;
}

/* Latest Products */
.latest-products {
  margin-bottom: 48px;
}

.latest-products .container {
  max-width: 1200px;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

/* Features Section */
.features-section {
  background-color: #fff5f5;
  padding: 48px 0;
  margin-top: 48px;
  border-top: 3px dotted #fecaca;
  border-bottom: 3px dotted #fecaca;
}

.features-section .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  text-align: center;
  padding: 24px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.1);
  border: 2px solid #fecaca;
  transition: all 0.3s ease;
  margin: 10px;
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.2);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.feature h3 {
  font-size: 20px;
  font-weight: 700;
  color: #991b1b;
  margin-bottom: 8px;
  position: relative;
  display: inline-block;
}

.feature h3::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 25%;
  width: 50%;
  height: 3px;
  background-color: #fecaca;
  border-radius: 3px;
}

.feature p {
  color: #475569;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-banner .container {
    flex-direction: column;
    padding: 0 24px;
  }
  
  .hero-content {
    padding-right: 0;
    margin-bottom: 32px;
    text-align: center;
  }
  
  .hero-image {
    width: 100%;
  }
  
  .categories-section .container,
  .latest-products .container {
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 48px 0;
  }
  
  .hero-content h1 {
    font-size: 32px;
  }
  
  .section-title {
    font-size: 28px;
    margin-bottom: 24px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 28px;
  }
  
  .feature {
    padding: 16px;
  }
}
</style>
