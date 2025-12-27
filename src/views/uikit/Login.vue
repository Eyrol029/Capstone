<template>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Healthcare System Login</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body>
<div id="app">
  <div class="login-container">
    <h1>Healthcare System</h1>
    <p class="subtitle">Select role and login</p>

    <div v-if="error" class="error">{{ error }}</div>

    <!-- USER TYPE -->
    <div class="user-type-grid">
      <div
        class="user-card"
        :class="{ active: role === 'admin' }"
        @click="role = 'admin'"
      >Admin</div>

      <div
        class="user-card"
        :class="{ active: role === 'midwife' }"
        @click="role = 'midwife'"
      >Midwife</div>

      <div
        class="user-card"
        :class="{ active: role === 'doctor' }"
        @click="role = 'doctor'"
      >Doctor</div>

      <div
        class="user-card"
        :class="{ active: role === 'patient' }"
        @click="role = 'patient'"
      >Patient</div>
    </div>

    <!-- LOGIN FORM -->
    <div class="form-group">
      <label>Username</label>
      <input type="text" v-model="username">
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" v-model="password">
    </div>

    <button @click="login">Login</button>
  </div>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      role: 'admin',
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      this.error = '';

      if (!this.username || !this.password) {
        this.error = 'Please enter both username and password.';
        return;
      }

      // Simulate login process
      alert(`Logging in as ${this.role} with username: ${this.username}`);
    }
  }
}).mount('#app');
</script>

</body>
</html>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 420px;
  background: #fff;
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

h1 {
  text-align: center;
  margin-bottom: 10px;
}

p.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 25px;
}

.user-type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.user-card {
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}

.user-card.active {
  border-color: #667eea;
  background: #eef2ff;
}

.user-card:hover {
  border-color: #667eea;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 12px;
  background: #667eea;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #5a67d8;
}

.error {
  background: #fee2e2;
  color: #b91c1c;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}
</style>