<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required />

      <label for="password">Password:</label>
      <input type="password" v-model="password" required />

      <button :disabled="isLoading" type="submit">Login</button>
      <div v-if="isLoading" class="loading-spinner"></div>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        this.isLoading = true;
        const response = await axios.post('https://feedback.waelchafei.workers.dev/login', {
          email: this.username,
          password: this.password,
        },);

        if (response.ok) {
          const result = await response.json();

          if (result === 'Success') {
            console.log('Success!');
            this.$router.push({ name: 'home' });
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        } else {
          console.error('API request failed:', response.status, response.statusText);
          this.errorMessage = 'Wrong credentials. please login again!';
        }
      } catch (error) {
        console.error('Error during API request:', error);
        this.errorMessage = 'Wrong credentials. please login again!';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
  
<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 12px;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.error-message {
  color: red;
  margin-top: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>
  
