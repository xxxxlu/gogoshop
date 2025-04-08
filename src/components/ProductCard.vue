<template>
  <div class="product-card">
    <div class="product-image">
      <img
        :src="product.image"
        :alt="product.name"
        @error="handleImageError"
      />
      <div class="discount" v-if="discountPercentage > 0">
        {{ discountPercentage }}% OFF
      </div>
    </div>
    <div class="product-details">
      <h3 class="product-title">
        <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
      </h3>
      <div class="product-price">
        <span class="current-price">Rs. {{ formatPrice(product.price) }}</span>
        <span class="original-price" v-if="product.originalPrice > product.price">
          Rs. {{ formatPrice(product.originalPrice) }}
        </span>
      </div>
      <button
        class="add-to-cart-btn"
        @click="addToCart"
        :disabled="product.stock <= 0"
      >
        {{ product.stock > 0 ? 'ORDER NOW' : 'OUT OF STOCK' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    discountPercentage() {
      if (this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    addToCart() {
      this.$store.commit('addToCart', this.product)
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #fecaca;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.2);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-bottom: 3px dotted #fecaca;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.discount {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ef4444;
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(239, 68, 68, 0.3);
  transform: rotate(5deg);
  animation: wiggle 2s infinite;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(5deg); }
  50% { transform: rotate(-5deg); }
}

.product-details {
  padding: 20px;
  position: relative;
}

.product-title {
  font-size: 18px;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 48px;
  font-weight: 700;
}

.product-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.product-title a:hover {
  color: #ef4444;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.current-price {
  font-size: 20px;
  font-weight: bold;
  color: #ef4444;
  margin-right: 10px;
  position: relative;
  display: inline-block;
}

.current-price::after {
  content: '♥';
  font-size: 10px;
  position: absolute;
  top: 0;
  right: -15px;
  color: #ef4444;
}

.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: #999;
}

.add-to-cart-btn {
  width: 100%;
  padding: 10px 15px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.4s ease;
  z-index: -1;
}

.add-to-cart-btn:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(239, 68, 68, 0.3);
}

.add-to-cart-btn:hover::before {
  left: 100%;
}

.add-to-cart-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
