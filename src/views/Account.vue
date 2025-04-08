<template>
  <div class="account-page">
    <div class="container">
      <h1>Account <span class="heart-icon">❤️</span></h1>
      <div v-if="!isLoggedIn">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="login-btn">Login ✨</button>
        </form>
      </div>
      <div v-else>
        <p>Welcome, {{ username }}! <span class="emoji">🎉</span></p>
        <button @click="logout" class="logout-btn">Logout 🚪</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      username: localStorage.getItem('username') || '',
      password: '',
      isLoggedIn: !!localStorage.getItem('username')
    }
  },
  methods: {
    login() {
      localStorage.setItem('username', this.username)
      this.isLoggedIn = true
      
      // 跳转到首页
      this.$router.push('/')
      
      // 刷新页面以更新顶部导航栏中的用户名显示
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    logout() {
      localStorage.removeItem('username')
      this.username = ''
      this.password = ''
      this.isLoggedIn = false
    }
  }
}
</script>

<style scoped>
.account-page {
  padding: 48px 0;
  text-align: center;
  background-color: #fff5f5;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 8px 15px rgba(220, 38, 38, 0.15);
  border: 1px solid #fecaca;
  animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
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

.emoji {
  display: inline-block;
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-5px); }
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #991b1b;
  position: relative;
  padding-left: 5px;
}

label::before {
  content: '❤';
  position: absolute;
  left: -15px;
  font-size: 10px;
  opacity: 0.7;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #fecaca;
  border-radius: 15px;
  background-color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(220, 38, 38, 0.05);
}

input:focus {
  border-color: #ef4444;
  outline: none;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

.login-btn, .logout-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
  position: relative;
  overflow: hidden;
}

.login-btn:hover, .logout-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px);
  box-shadow: 0 7px 10px rgba(220, 38, 38, 0.3);
}

.login-btn:active, .logout-btn:active {
  transform: translateY(1px);
}

.login-btn::after, .logout-btn::after {
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
</style>
