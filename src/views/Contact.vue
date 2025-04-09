<template>
  <div class="contact-page">
    <div class="container">
      <div class="page-header">
        <h1>Contact Us <span class="heart-icon">❤️</span></h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <span>Contact Us</span>
        </div>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h2>Get in Touch <span class="emoji">✨</span></h2>
          <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
          <div class="info-item">
            <div class="info">
              <h3>Email</h3>
              <p>gogoshop@gogoshop.today</p>
              <p>We'll respond as soon as possible</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info">
              <h3>Address</h3>
              <p>Karachi, Pakistan</p>
            </div>
          </div>

          <div class="social-media">
            <h3>Follow Us <span class="emoji">🌟</span></h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Facebook" />
              </a>
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Twitter" />
              </a>
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2>Send Us a Message <span class="emoji">📝</span></h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Full Name *</label>
              <input type="text" id="name" v-model="form.name" required />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" v-model="form.phone" />
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <input type="text" id="subject" v-model="form.subject" required />
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>

            <button type="submit" class="submit-btn">Send Message ✨</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // In a real app, you would send this data to your server
      alert('Thank you for your message! We will get back to you soon.')

      // Reset form
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
  padding: 48px 0;
  background-color: #ffffff;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 16px;
}

.breadcrumbs {
  color: #64748b;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #475569;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.breadcrumbs a:hover {
  color: #ef4444;
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info, .contact-form {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #fecaca;
  padding: 32px;
}

.contact-info h2, .contact-form h2 {
  font-size: 24px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #fecaca;
}

.contact-info > p {
  margin-bottom: 32px;
  color: #475569;
  line-height: 1.6;
  font-size: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 28px;
  padding: 20px;
  background-color: #fff5f5;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.info-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.15);
}

.info {
  flex: 1;
}

.info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 8px;
}

.info p {
  color: #475569;
  margin-bottom: 4px;
  font-size: 15px;
}

.social-media {
  margin-top: 40px;
}

.social-media h3 {
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 16px;
}

.social-icon {
  width: 44px;
  height: 44px;
  background-color: #fff5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 1px solid #fecaca;
}

.social-icon:hover {
  background-color: #3b82f6;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.15);
}

.social-icon:hover img {
  filter: brightness(0) invert(1);
}

.social-icon img {
  width: 20px;
  height: 20px;
  transition: filter 0.2s ease;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #dc2626;
  font-size: 15px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-size: 15px;
  color: #dc2626;
  background-color: #fff5f5;
  transition: all 0.2s ease;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: #ef4444;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);
  position: relative;
  overflow: hidden;
}

.submit-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(220, 38, 38, 0.4);
}

.submit-btn:active {
  transform: translateY(1px);
}

.submit-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }

  .contact-info, .contact-form {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: 32px 0;
  }

  .page-header {
    margin-bottom: 32px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .info-item {
    padding: 16px;
  }

  .form-group input, .form-group textarea {
    font-size: 14px;
  }

  .submit-btn {
    padding: 12px 24px;
    font-size: 15px;
  }
}
</style>
