<template>
  <div class="cart-page">
    <div class="container">
      <div class="page-header">
        <h1>Shopping Cart <span class="heart-icon">❤️</span></h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> <span class="breadcrumb-separator">♥</span>
          <span>Shopping Cart</span>
        </div>
      </div>

      <div class="cart-content" v-if="cart.length > 0">
        <div class="cart-items">
          <div class="cart-item" v-for="item in cart" :key="item.id">
            <div class="item-image">
              <img
                :src="item.image"
                :alt="item.name"
                @error="handleImageError"
              />
            </div>
            <div class="item-details">
              <h3 class="item-title">
                <router-link :to="`/product/${item.id}`">{{ item.name }}</router-link>
              </h3>
              <div class="item-price">
                <span class="current-price">Rs. {{ formatPrice(item.price) }}</span>
                <span class="original-price" v-if="item.originalPrice > item.price">
                  Rs. {{ formatPrice(item.originalPrice) }}
                </span>
              </div>
            </div>
            <div class="item-quantity">
              <div class="quantity-controls">
                <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  :max="item.stock"
                  @change="updateQuantity(item.id, item.quantity)"
                />
                <button @click="increaseQuantity(item.id)" :disabled="item.quantity >= item.stock">+</button>
              </div>
              <button class="remove-btn" @click="removeItem(item.id)">Remove</button>
            </div>
            <div class="item-total">
              Rs. {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>Rs. {{ formatPrice(cartTotal) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping Fee</span>
            <span>Rs. {{ formatPrice(shippingFee) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>Rs. {{ formatPrice(cartTotal + shippingFee) }}</span>
          </div>
          <button class="checkout-btn" @click="proceedToCheckout">Proceed to Checkout</button>
          <div class="continue-shopping">
            <router-link to="/products">Continue Shopping</router-link>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <div class="empty-cart-content">
          <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Empty Cart" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <router-link to="/products" class="continue-shopping-btn">Continue Shopping</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      shippingFee: 399
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity < item.stock) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity + 1 })
      }
    },
    decreaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity > 1) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity - 1 })
      }
    },
    updateQuantity(id, quantity) {
      const item = this.cart.find(item => item.id === id)
      if (item) {
        // Ensure quantity is valid
        let validQuantity = Math.max(1, Math.min(item.stock, quantity))
        this.$store.commit('updateCartItem', { id, quantity: validQuantity })
      }
    },
    removeItem(id) {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        this.$store.commit('removeFromCart', id)
      }
    },
    proceedToCheckout() {
      this.$router.push('/checkout')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.cart-page {
  padding: 40px 0;
  background-color: #ffffff;
  background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 16a1 1 0 100-2 1 1 0 000 2zm-6-5a1 1 0 102 0 1 1 0 00-2 0zm12 0a1 1 0 100-2 1 1 0 000 2z" fill="%23fecaca" /></svg>');
}

.page-header {
  margin-bottom: 32px;
  text-align: center;
  position: relative;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  color: #991b1b;
  margin-bottom: 16px;
  display: inline-block;
  position: relative;
}

.heart-icon {
  color: #ef4444;
  display: inline-block;
  animation: pulse 1.5s infinite;
  font-size: 28px;
  vertical-align: middle;
  margin-left: 10px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.breadcrumbs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 15px;
  color: #64748b;
  background-color: #fff5f5;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-flex;
  box-shadow: 0 3px 6px rgba(254, 202, 202, 0.3);
}

.breadcrumb-separator {
  color: #ef4444;
  display: inline-block;
  font-size: 12px;
  margin: 0 5px;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  position: relative;
}

.cart-items {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 24px;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8fafc;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
  border: 2px solid #fecaca;
}

.item-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-image:hover img {
  transform: scale(1.05);
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  line-height: 1.4;
}

.item-title a {
  color: #1e293b;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
}

.item-title a:hover {
  color: #ef4444;
  transform: translateX(3px);
}

.item-price {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-weight: 700;
  color: #ef4444;
  font-size: 20px;
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
  font-size: 15px;
  text-decoration: line-through;
  color: #94a3b8;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 2px solid #fecaca;
  border-radius: 30px;
  overflow: hidden;
  width: 120px;
  margin-bottom: 16px;
  box-shadow: 0 3px 6px rgba(239, 68, 68, 0.1);
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff5f5;
  border: none;
  color: #991b1b;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #fecaca;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 50px;
  height: 36px;
  border: none;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
  background-color: #ffffff;
  -moz-appearance: textfield;
  appearance: textfield;
}

.quantity-controls input::-webkit-outer-spin-button,
.quantity-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 0;
  transition: color 0.2s ease;
}

.remove-btn:hover {
  color: #dc2626;
}

.item-total {
  font-weight: 600;
  font-size: 18px;
  color: #1e293b;
}

.cart-summary {
  background-color: #ffffff;
  border-radius: 25px;
  border: 2px solid #fecaca;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.15);
  position: relative;
}

.cart-summary::before {
  content: '💝';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  background: white;
  padding: 0 10px;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(239, 68, 68, 0.2);
}

.cart-summary h3 {
  font-size: 22px;
  font-weight: 700;
  color: #991b1b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px dashed #fecaca;
  text-align: center;
  position: relative;
}

.cart-summary h3::before,
.cart-summary h3::after {
  content: '♥';
  color: #ef4444;
  font-size: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.cart-summary h3::before {
  left: 0;
}

.cart-summary h3::after {
  right: 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #475569;
  font-size: 15px;
}

.summary-row.total {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 2px dashed #fecaca;
  font-weight: 700;
  font-size: 22px;
  color: #991b1b;
}

.checkout-btn {
  width: 100%;
  padding: 16px 24px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 24px 0 16px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.checkout-btn::before {
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

.checkout-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.checkout-btn:hover::before {
  left: 100%;
}

.continue-shopping {
  text-align: center;
}

.continue-shopping a {
  color: #64748b;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.2s ease;
  position: relative;
  display: inline-block;
}

.continue-shopping a::after {
  content: '→';
  margin-left: 5px;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.continue-shopping a:hover {
  color: #ef4444;
}

.continue-shopping a:hover::after {
  opacity: 1;
  transform: translateX(0);
}

.empty-cart {
  background-color: #ffffff;
  border-radius: 25px;
  border: 2px dashed #fecaca;
  padding: 60px 32px;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.1);
  position: relative;
}

.empty-cart::before,
.empty-cart::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff5f5;
  border: 2px solid #fecaca;
  z-index: -1;
}

.empty-cart::before {
  top: -15px;
  left: 30%;
}

.empty-cart::after {
  top: -15px;
  right: 30%;
}

.empty-cart-content img {
  width: 120px;
  height: 120px;
  opacity: 0.4;
  margin-bottom: 24px;
  transition: opacity 0.2s ease;
}

.empty-cart-content:hover img {
  opacity: 0.6;
}

.empty-cart-content h2 {
  font-size: 28px;
  font-weight: 700;
  color: #991b1b;
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
}

.empty-cart-content h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 25%;
  width: 50%;
  height: 3px;
  background-color: #fecaca;
  border-radius: 3px;
}

.empty-cart-content p {
  color: #64748b;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 16px 32px;
  background-color: #ef4444;
  color: white;
  border-radius: 30px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.continue-shopping-btn::after {
  content: '🛍️';
  margin-left: 8px;
  transition: transform 0.3s ease;
  display: inline-block;
}

.continue-shopping-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

.continue-shopping-btn:hover::after {
  transform: rotate(15deg);
}

@media (max-width: 1200px) {
  .cart-content {
    grid-template-columns: 1fr 350px;
    gap: 24px;
  }
}

@media (max-width: 992px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 100px 1fr;
    grid-template-areas:
      "image details"
      "image quantity"
      "total total";
    gap: 16px;
    padding: 20px;
  }

  .item-image {
    grid-area: image;
  }

  .item-image img {
    width: 100px;
    height: 100px;
  }

  .item-details {
    grid-area: details;
  }

  .item-quantity {
    grid-area: quantity;
  }

  .item-total {
    grid-area: total;
    text-align: right;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #e2e8f0;
  }
}

@media (max-width: 480px) {
  .cart-page {
    padding: 24px 0;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .cart-item {
    padding: 16px;
  }

  .item-title {
    font-size: 15px;
  }

  .current-price {
    font-size: 16px;
  }

  .quantity-controls {
    width: 100%;
    margin-bottom: 8px;
  }

  .remove-btn {
    width: 100%;
    text-align: center;
    padding: 8px 0;
    background-color: #fef2f2;
    border-radius: 6px;
    color: #ef4444;
  }

  .empty-cart {
    padding: 40px 20px;
  }

  .empty-cart-content h2 {
    font-size: 24px;
  }

  .empty-cart-content p {
    font-size: 15px;
  }
}
</style>
