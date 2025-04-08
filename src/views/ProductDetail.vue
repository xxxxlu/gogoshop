<template>
  <div class="product-detail">
    <div class="container">
      <div class="breadcrumbs">
        <router-link to="/">Home</router-link>
        <span class="separator">❤️</span>
        <router-link :to="`/products?category=${product.category}`">
          {{ categoryName }}
        </router-link>
        <span class="separator">❤️</span>
        <span class="current">{{ product.name }}</span>
      </div>

      <div class="product-container" v-if="product">
        <div class="product-images">
          <div class="main-image">
            <div class="image-wrapper">
              <img
                :src="product.image"
                :alt="product.name"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-price">
            <span class="current-price">Rs. {{ formatPrice(product.price) }}</span>
            <span class="original-price" v-if="product.originalPrice > product.price">
              Rs. {{ formatPrice(product.originalPrice) }}
            </span>
            <span class="discount" v-if="discountPercentage > 0">
              {{ discountPercentage }}% OFF
            </span>
          </div>

          <div class="stock-status" :class="{ 'in-stock': product.stock > 0, 'out-of-stock': product.stock <= 0 }">
            {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
          </div>

          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <div class="quantity-controls">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input type="number" id="quantity" v-model.number="quantity" min="1" :max="product.stock" />
              <button @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
            </div>
          </div>

          <div class="action-buttons">
            <button
              class="add-to-cart-btn"
              @click="addToCart"
              :disabled="product.stock <= 0"
            >
              Add to Cart 🛒
            </button>
            <button
              class="buy-now-btn"
              @click="buyNow"
              :disabled="product.stock <= 0"
            >
              Buy Now ✨
            </button>
          </div>

          <div class="product-details">
            <h3>Product Details</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="delivery-info">
            <div class="delivery-option">
              <span>Nationwide Delivery</span>
            </div>
            <div class="delivery-option">
              <span>7 Days Replacement Warranty</span>
            </div>
          </div>
        </div>
      </div>

      <div class="loading" v-else>
        <p>Loading product details...</p>
      </div>

      <div class="related-products" v-if="relatedProducts.length > 0">
        <h2 class="section-title">Related Products <span class="heart-icon">❤️</span></h2>
        <div class="related-products-grid">
          <product-card
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    productId() {
      return parseInt(this.$route.params.id)
    },
    product() {
      return this.products.find(p => p.id === this.productId) || null
    },
    categoryName() {
      if (this.product) {
        const category = this.categories.find(cat => cat.slug === this.product.category)
        return category ? category.name : 'Products'
      }
      return 'Products'
    },
    discountPercentage() {
      if (this.product && this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    },
    relatedProducts() {
      if (!this.product) return []

      return this.products
        .filter(p => p.category === this.product.category && p.id !== this.productId)
        .slice(0, 4)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      alert('Product added to cart!')
    },
    buyNow() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      this.$router.push('/cart')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 48px 0;
  background-color: #fff5f5;
}

.breadcrumbs {
  margin-bottom: 32px;
  color: #ef4444;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #ef4444;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: bold;
}

.breadcrumbs a:hover {
  color: #dc2626;
  transform: scale(1.05);
}

.separator {
  display: inline-block;
  animation: pulse 1.5s infinite;
  font-size: 10px;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.breadcrumbs .separator {
  color: #cbd5e1;
}

.product-container {
  display: grid;
  grid-template-columns: minmax(300px, 45%) 1fr;
  gap: 64px;
  margin-bottom: 64px;
  animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.product-images {
  position: sticky;
  top: 32px;
}

.image-wrapper {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(220, 38, 38, 0.15);
  border: 2px solid #fecaca;
}

.main-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 24px;
  transition: transform 0.3s ease;
}

.main-image:hover img {
  transform: scale(1.05);
}

.product-info {
  position: relative;
}

.product-title {
  font-size: 36px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 24px;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.product-title::after {
  content: '✨';
  position: absolute;
  right: -30px;
  top: 0;
  font-size: 24px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.product-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
  padding: 24px;
  background-color: #fef2f2;
  border-radius: 20px;
  border: 1px dashed #fecaca;
  transition: all 0.3s ease;
}

.product-price:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(220, 38, 38, 0.1);
}

.current-price {
  font-size: 36px;
  font-weight: 700;
  color: #ef4444;
  line-height: 1;
  text-shadow: 1px 1px 2px rgba(239, 68, 68, 0.2);
}

.original-price {
  font-size: 20px;
  text-decoration: line-through;
  color: #94a3b8;
}

.discount {
  background-color: #fee2e2;
  color: #ef4444;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.discount::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

.stock-status {
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 15px;
}

.in-stock {
  color: #10b981;
}

.out-of-stock {
  color: #ef4444;
}

.quantity-selector {
  margin-bottom: 32px;
}

.quantity-selector label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: #475569;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid #fecaca;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(220, 38, 38, 0.1);
}

.quantity-controls button {
  width: 44px;
  height: 44px;
  border: none;
  background-color: #fef2f2;
  color: #ef4444;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #fee2e2;
  color: #dc2626;
  transform: scale(1.1);
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 60px;
  height: 44px;
  border: none;
  border-left: 1px solid #fecaca;
  border-right: 1px solid #fecaca;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #991b1b;
  -moz-appearance: textfield;
  appearance: textfield;
  background-color: #fff;
}

.quantity-controls input::-webkit-outer-spin-button,
.quantity-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  animation: bounceIn 0.8s;
}

@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

.add-to-cart-btn, .buy-now-btn {
  flex: 1;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
}

.add-to-cart-btn {
  background-color: #ffffff;
  color: #ef4444;
  border: 2px solid #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buy-now-btn {
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #fee2e2;
  transform: translateY(-3px);
  box-shadow: 0 7px 10px rgba(220, 38, 38, 0.15);
}

.buy-now-btn:hover:not(:disabled) {
  background-color: #dc2626;
  transform: translateY(-3px);
  box-shadow: 0 7px 10px rgba(220, 38, 38, 0.3);
}

.add-to-cart-btn:disabled, .buy-now-btn:disabled {
  background-color: #f1f5f9;
  color: #94a3b8;
  border-color: #e2e8f0;
  cursor: not-allowed;
}

.product-details {
  margin-bottom: 40px;
  color: #475569;
  line-height: 1.8;
}

.product-details h3 {
  font-size: 20px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 16px;
  padding-left: 10px;
  border-left: 3px solid #fecaca;
}

.delivery-info {
  background-color: #fef2f2;
  padding: 24px;
  border-radius: 20px;
  border: 1px dashed #fecaca;
  transition: all 0.3s ease;
}

.delivery-info:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(220, 38, 38, 0.1);
}

.delivery-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #fecaca;
  transition: all 0.3s ease;
}

.delivery-option:hover {
  transform: translateX(10px);
}

.delivery-option:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.delivery-option img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.delivery-option span {
  color: #475569;
  font-size: 15px;
}

.related-products {
  margin-top: 80px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 32px;
  text-align: center;
  position: relative;
}

.heart-icon {
  display: inline-block;
  animation: pulse 1.5s infinite;
  font-size: 20px;
  vertical-align: middle;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.loading {
  text-align: center;
  padding: 80px;
  color: #ef4444;
  font-size: 16px;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

@media (max-width: 1200px) {
  .product-container {
    gap: 40px;
  }

  .related-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .product-info {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-title {
    font-size: 28px;
  }

  .current-price {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .product-detail {
    padding: 24px 0;
  }

  .related-products-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .product-title {
    font-size: 24px;
  }

  .current-price {
    font-size: 24px;
  }
}
</style>
