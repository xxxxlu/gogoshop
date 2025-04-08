<template>
  <div class="checkout-page">
    <div class="container">
      <div class="page-header">
        <h1>Checkout <span class="heart-icon">❤️</span></h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <router-link to="/cart">Shopping Cart</router-link> /
          <span>Checkout</span>
        </div>
      </div>

      <div class="checkout-content" v-if="cart.length > 0">
        <div class="customer-details">
          <h2>Customer Information</h2>
          <form @submit.prevent="proceedToPayment">
            <div class="form-group">
              <label for="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                v-model="customerInfo.fullName"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input
                type="email"
                id="email"
                v-model="customerInfo.email"
                required
              />
            </div>

            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                v-model="customerInfo.phone"
                required
              />
            </div>

            <div class="form-group">
              <label for="address">Shipping Address *</label>
              <textarea
                id="address"
                v-model="customerInfo.address"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="city">City *</label>
              <input
                type="text"
                id="city"
                v-model="customerInfo.city"
                required
              />
            </div>

            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                v-model="customerInfo.postalCode"
              />
            </div>

            <div class="form-group">
              <label for="notes">Order Notes (Optional)</label>
              <textarea
                id="notes"
                v-model="customerInfo.notes"
              ></textarea>
            </div>

            <h2>Payment Method</h2>
            <div class="payment-methods">
              <div class="payment-method">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  value="cod"
                  v-model="customerInfo.paymentMethod"
                />
                <label for="cashOnDelivery"></label>
                <img src="../assets/easypaisa.png" alt="" style="width: 100px; height: 80px;">
              </div>
              <div class="payment-method">
                <input
                  type="radio"
                  id="bankTransfer"
                  value="bank"
                  v-model="customerInfo.paymentMethod"
                />
                <label for="bankTransfer"></label>
                <img src="../assets/Frame.png" alt="" style="width: 100px; height: 80px;">
              </div>
            </div>

            <div class="form-actions">
              <router-link to="/cart" class="back-to-cart">Back to Cart</router-link>
              <button type="submit" class="place-order-btn">Place Order ✨</button>
            </div>
          </form>
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            <div class="summary-item" v-for="item in cart" :key="item.id">
              <div class="item-image">
                <img
                  :src="item.image"
                  :alt="item.name"
                  @error="handleImageError"
                />
              </div>
              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <div class="item-price-qty">
                  <span>Rs. {{ formatPrice(item.price) }} x {{ item.quantity }}</span>
                </div>
              </div>
              <div class="item-total">
                Rs. {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <div class="summary-totals">
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
          </div>
        </div>
      </div>

      <div class="empty-checkout" v-else>
        <div class="empty-checkout-content">
          <h2>Your cart is empty <span class="sad-icon">😢</span></h2>
          <p>You need to add products to your cart before checkout.</p>
          <router-link to="/products" class="continue-shopping-btn">Continue Shopping ✨</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Checkout',
  data() {
    return {
      shippingFee: 399,
      customerInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        paymentMethod: 'cod'
      }
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
    proceedToPayment() {
      // Save customer info in session/local storage
      localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo))
      localStorage.setItem('orderTotal', JSON.stringify({
        subtotal: this.cartTotal,
        shipping: this.shippingFee,
        total: this.cartTotal + this.shippingFee
      }))

      // In a real app, you would send this data to your server
      // For now, just redirect to success page
      this.$router.push('/checkout-success')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  },
  created() {
    // Redirect if cart is empty
    if (this.cart.length === 0) {
      this.$router.push('/cart')
    }

    // If returning from payment, don't clear the form
    const savedInfo = localStorage.getItem('customerInfo')
    if (savedInfo) {
      this.customerInfo = JSON.parse(savedInfo)
    }
  }
}
</script>

<style scoped>
.checkout-page {
  margin-bottom: 40px;
  background-color: #fff5f5;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #dc2626;
  font-weight: bold;
}

.heart-icon {
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.sad-icon {
  display: inline-block;
  animation: wobble 2s infinite;
}

@keyframes wobble {
  0% { transform: translateX(0); }
  15% { transform: translateX(-5px) rotate(-5deg); }
  30% { transform: translateX(5px) rotate(5deg); }
  45% { transform: translateX(-5px) rotate(-3deg); }
  60% { transform: translateX(5px) rotate(3deg); }
  75% { transform: translateX(-5px) rotate(-1deg); }
  100% { transform: translateX(0); }
}

.breadcrumbs {
  color: #777;
  font-size: 14px;
}

.breadcrumbs a {
  color: #ef4444;
  text-decoration: none;
  transition: all 0.3s ease;
}

.breadcrumbs a:hover {
  color: #991b1b;
  text-decoration: underline;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
}

.customer-details, .order-summary {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(220, 38, 38, 0.1);
  padding: 25px;
  border: 1px solid #fecaca;
  transition: all 0.3s ease;
}

.customer-details:hover, .order-summary:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(220, 38, 38, 0.15);
}

.customer-details h2, .order-summary h2 {
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #fecaca;
  color: #dc2626;
  position: relative;
}

.customer-details h2::after, .order-summary h2::after {
  content: '✨';
  position: absolute;
  right: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #fecaca;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.payment-methods {
  margin-bottom: 30px;
}

.payment-method {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.payment-method input {
  margin-right: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.back-to-cart {
  color: #dc2626;
  text-decoration: underline;
  position: relative;
  transition: all 0.3s ease;
  padding: 8px 15px;
  border-radius: 30px;
}

.back-to-cart:hover {
  background-color: #fecaca;
  text-decoration: none;
}

.place-order-btn {
  padding: 12px 25px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
}

.place-order-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 10px rgba(220, 38, 38, 0.3);
}

.place-order-btn:active {
  transform: translateY(1px);
}

.summary-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #fecaca;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 10px;
}

.summary-item:hover {
  background-color: #fff5f5;
  transform: translateX(5px);
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 14px;
  margin-bottom: 5px;
}

.item-price-qty {
  font-size: 13px;
  color: #777;
}

.item-total {
  font-weight: bold;
  margin-left: 15px;
}

.summary-totals {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px dashed #fecaca;
  font-size: 18px;
  font-weight: bold;
  color: #dc2626;
}

.empty-checkout {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(220, 38, 38, 0.1);
  padding: 40px 20px;
  text-align: center;
  border: 1px solid #fecaca;
}

.empty-checkout h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #dc2626;
}

.empty-checkout p {
  color: #777;
  margin-bottom: 30px;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #ef4444;
  color: white;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
}

.continue-shopping-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 10px rgba(220, 38, 38, 0.3);
}

@media (max-width: 992px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    order: -1;
    margin-bottom: 20px;
  }
}
</style>
