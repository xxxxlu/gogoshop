<template>
  <div class="checkout-success">
    <div class="container">
      <div class="success-card">
        <div class="success-icon">
          <div class="checkmark-circle">
            <div class="checkmark"></div>
          </div>
        </div>
        <h1>Thank You for Your Order! <span class="heart-icon">❤️</span></h1>
        <p class="order-number">Order #{{ orderId }} <span class="sparkle">✨</span></p>

        <div class="success-message">
          <p>Your order has been placed successfully and is being processed. <span class="emoji">🎉</span></p>
          <p>A confirmation email has been sent to <strong>{{ customerInfo.email }}</strong>. <span class="emoji">📧</span></p>
        </div>

        <div class="order-details">
          <h2>Order Details</h2>

          <div class="details-section">
            <h3>Shipping Information</h3>
            <div class="info-item">
              <span class="label">Name:</span>
              <span class="value">{{ customerInfo.fullName }}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">{{ customerInfo.address }}</span>
            </div>
            <div class="info-item">
              <span class="label">City:</span>
              <span class="value">{{ customerInfo.city }}</span>
            </div>
            <div class="info-item" v-if="customerInfo.postalCode">
              <span class="label">Postal Code:</span>
              <span class="value">{{ customerInfo.postalCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">{{ customerInfo.phone }}</span>
            </div>
          </div>

          <div class="details-section">
            <h3>Payment Information</h3>
            <div class="info-item">
              <span class="label">Payment Method:</span>
              <span class="value">{{ paymentMethod }}</span>
            </div>
          </div>

          <div class="details-section">
            <h3>Order Summary</h3>
            <div class="summary-items">
              <div class="summary-item" v-for="item in cart" :key="item.id">
                <span class="item-name">{{ item.name }} × {{ item.quantity }}</span>
                <span class="item-price">Rs. {{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>

            <div class="summary-totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>Rs. {{ formatPrice(orderTotal.subtotal) }}</span>
              </div>
              <div class="total-row">
                <span>Shipping:</span>
                <span>Rs. {{ formatPrice(orderTotal.shipping) }}</span>
              </div>
              <div class="total-row grand-total">
                <span>Total:</span>
                <span>Rs. {{ formatPrice(orderTotal.total) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          <router-link to="/" class="continue-btn">Continue Shopping <span class="shop-icon">🛍️</span></router-link>
          <button class="print-btn" @click="printOrder">Print Receipt <span class="print-icon">🖨️</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CheckoutSuccess',
  data() {
    return {
      orderId: this.generateOrderId(),
      customerInfo: {},
      orderTotal: {
        subtotal: 0,
        shipping: 0,
        total: 0
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    paymentMethod() {
      const methods = {
        'cod': 'Cash on Delivery',
        'bank': 'Bank Transfer'
      }
      return methods[this.customerInfo.paymentMethod] || this.customerInfo.paymentMethod
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    generateOrderId() {
      // Generate a random order ID
      const prefix = 'SYM'
      const timestamp = new Date().getTime().toString().slice(-6)
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      return `${prefix}${timestamp}${random}`
    },
    printOrder() {
      window.print()
    }
  },
  created() {
    // Retrieve customer information and order details from local storage
    const customerInfoStr = localStorage.getItem('customerInfo')
    const orderTotalStr = localStorage.getItem('orderTotal')

    if (customerInfoStr) {
      this.customerInfo = JSON.parse(customerInfoStr)
    } else {
      // Redirect if no customer info is found
      this.$router.push('/cart')
    }

    if (orderTotalStr) {
      this.orderTotal = JSON.parse(orderTotalStr)
    }

    // Clear the cart after successful checkout
    this.$store.commit('clearCart')
  }
}
</script>

<style scoped>
.checkout-success {
  padding: 48px 0;
  background-color: #fff5f5;
}

.success-card {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.15);
  padding: 48px;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid #fecaca;
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.success-icon {
  text-align: center;
  margin-bottom: 24px;
}

.checkmark-circle {
  width: 80px;
  height: 80px;
  background-color: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.checkmark {
  width: 40px;
  height: 20px;
  border-left: 5px solid white;
  border-bottom: 5px solid white;
  transform: rotate(-45deg);
}

h1 {
  text-align: center;
  color: #dc2626;
  font-size: 32px;
  margin-bottom: 24px;
  font-weight: bold;
}

.heart-icon {
  display: inline-block;
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  from { transform: scale(1) rotate(-10deg); }
  to { transform: scale(1.3) rotate(10deg); }
}

.sparkle {
  display: inline-block;
  animation: twinkle 1.2s infinite;
}

@keyframes twinkle {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

.emoji {
  display: inline-block;
  margin-left: 5px;
  transform-origin: center;
  animation: wiggle 2s infinite;
}

@keyframes wiggle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}

.order-number {
  text-align: center;
  font-size: 18px;
  color: #ef4444;
  margin-bottom: 32px;
  font-weight: 600;
}

.success-message {
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.8;
  color: #475569;
}

.order-details {
  margin-bottom: 40px;
}

.order-details h2 {
  font-size: 24px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #fecaca;
  color: #dc2626;
  position: relative;
}

.order-details h2::after {
  content: '✨';
  position: absolute;
  right: 0;
}

.details-section {
  margin-bottom: 32px;
}

.details-section h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #ef4444;
  padding-left: 10px;
  border-left: 3px solid #fecaca;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
}

.label {
  font-weight: 600;
  width: 140px;
  flex-shrink: 0;
  color: #991b1b;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 10px 15px;
  border-bottom: 1px solid #fecaca;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.summary-item:hover {
  background-color: #fff5f5;
  transform: translateX(5px);
}

.summary-totals {
  padding-top: 18px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.grand-total {
  font-size: 20px;
  font-weight: 700;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 2px dashed #fecaca;
  color: #dc2626;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.continue-btn, .print-btn {
  padding: 14px 28px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.shop-icon, .print-icon {
  display: inline-block;
  animation: float 2s infinite ease-in-out;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.continue-btn {
  background-color: #ef4444;
  color: white;
}

.print-btn {
  background-color: #fff5f5;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.continue-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 10px rgba(220, 38, 38, 0.3);
}

.print-btn:hover {
  background-color: #fecaca;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 10px rgba(220, 38, 38, 0.2);
}

.continue-btn:active, .print-btn:active {
  transform: translateY(1px);
}

@media (max-width: 768px) {
  .success-card {
    padding: 24px;
  }

  .info-item {
    flex-direction: column;
  }

  .label {
    width: 100%;
    margin-bottom: 6px;
  }

  .actions {
    flex-direction: column;
    gap: 12px;
  }

  .continue-btn, .print-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
