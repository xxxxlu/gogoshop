<template>
  <div id="app">
    <header>
      <div class="header-top">
        <div class="container">
          <div class="logo">
            <router-link to="/">
              <img src="./assets/image.png" alt="gogoshop" />
            </router-link>
          </div>
          <div class="header-actions">
            <div class="account">
              <router-link v-if="username" to="/account">Welcome, {{ username }}!</router-link>
              <router-link v-else to="/account">My Account</router-link>
            </div>
            <div class="cart">
              <router-link to="/cart">
                <span class="cart-icon">
                  <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Cart" />
                  <span class="cart-count">{{ cartCount }}</span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <nav class="main-nav">
        <div class="container">
          <ul class="nav-items">
            <li>
              <router-link to="/contact">Contact Us</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column">
            <h3>CUSTOMER SERVICE</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>email</h3>
            <ul>
              <li><a href="#">gogoshop@gogoshop.today</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>PAYMENT METHOD</h3>
            <div class="payment-icons">
              <img src="./assets/easypaisa.png" alt="Payment easypaisa" />
              <img src="./assets/Frame.png" alt="Payment Frame" />
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>
            Copyright © 2025 gogoshop Store. Powered by Data Tech Solutions (SMC-Private) Limited
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      username: localStorage.getItem('username') || ''
    }
  },
  computed: {
    ...mapState(['categories']),
    ...mapGetters(['cartCount'])
  },
  created() {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

body {
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #2d3436;
  background-color: #ffffff;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

a {
  text-decoration: none;
  color: #2d3436;
  transition: all 0.3s ease;
}

ul {
  list-style: none;
}

/* Header Styles */
header {
  background-color: #fff5f5;
  border-bottom: 1px solid #fecaca;
  box-shadow: 0 4px 12px rgba(254, 202, 202, 0.2);
}

.header-top {
  padding: 20px 0;
}

.header-top .container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
}

.logo img {
  height: 50px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.account a {
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 20px;
  background-color: #fff5f5;
  color: #475569;
  box-shadow: 0 3px 6px rgba(254, 202, 202, 0.3);
  border: 2px solid #fecaca;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.account a:hover {
  background-color: #fef2f2;
  color: #1e293b;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(254, 202, 202, 0.4);
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-icon img {
  height: 28px;
  filter: brightness(0.2);
  transition: transform 0.3s ease;
}

.cart-icon:hover img {
  transform: scale(1.1);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: white;
  border-radius: 20px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  padding: 0 6px;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Navigation Styles */
.main-nav {
  background-color: #ffffff;
  border-bottom: 1px solid #fecaca;
  padding: 14px 0;
}

.nav-items {
  display: flex;
  gap: 32px;
}

.nav-items a {
  color: #64748b;
  font-weight: 600;
  position: relative;
  padding: 8px 0;
  font-size: 16px;
}

.nav-items a:hover {
  color: #ef4444;
}

.nav-items a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #ef4444;
  transition: width 0.3s ease;
  border-radius: 3px;
}

.nav-items a:hover::after {
  width: 100%;
}

/* Main Content Styles */
main {
  min-height: 600px;
  padding: 40px 0;
  background-color: #ffffff;
}

/* Footer Styles */
footer {
  background-color: #fff5f5;
  color: #475569;
  padding: 60px 0 30px;
  border-top: 3px dotted #fecaca;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  color: #991b1b;
  position: relative;
  display: inline-block;
}

.footer-column h3::after {
  content: '♥';
  font-size: 14px;
  margin-left: 8px;
  color: #ef4444;
}

.footer-column ul li {
  margin-bottom: 14px;
}

.footer-column ul li a {
  color: #64748b;
  font-size: 16px;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block;
}

.footer-column ul li a:hover {
  color: #ef4444;
  transform: translateX(5px);
}

.payment-icons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.payment-icons img {
  height: 40px;
  opacity: 0.9;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 5px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.payment-icons img:hover {
  opacity: 1;
  transform: translateY(-5px);
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #fecaca;
  color: #94a3b8;
  font-size: 15px;
}

.copyright p::before,
.copyright p::after {
  content: '❤️';
  display: inline-block;
  margin: 0 10px;
  font-size: 12px;
  animation: heartbeat 1.5s infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  .header-top .container {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }

  .header-actions {
    justify-content: center;
  }

  .nav-items {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }

  .payment-icons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
