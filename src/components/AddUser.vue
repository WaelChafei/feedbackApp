<template>
  <div class="add-user">
    <h2>Add User</h2>
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="newUser.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="newUser.email" required />
      </div>

      <div class="form-group">
        <label for="role">Role:</label>
        <input type="text" v-model="newUser.role" required />
      </div>

      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      newUser: {
        name: '',
        email: '',
        role: '',
      },
    };
  },
  methods: {
    async addUser() {
      try {
        const response = await axios.post(
          'https://feedback.waelchafei.workers.dev/postUsers',
          {
            name: this.newUser.name,
            email: this.newUser.email,
            role: this.newUser.role,
          }
        );

        if (response.status === 200) {
          console.log('User added successfully!');
          this.$emit('refresh-users');
        } else {
          console.error('Failed to add user:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during API request:', error);
      }
    },
  },
};
</script>

<style scoped>
.add-user {
  max-width: 400px;
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

.form-group {
  margin-bottom: 16px;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 10px;
}

button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}
</style>
