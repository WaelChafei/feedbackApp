<template>
        <nav class="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-title">Your Feedback</span>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addsurvey" class="nav-link">Add survey</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/surveys" class="nav-link">Surveys</router-link>
        </li>
       </ul>
    </nav>
</template>
<script>
</script>
<style scoped>
.add-survey {
  display: flex;
}

.sidebar {
  background-color: #012901;
  color: #fff;
  width: 250px;
  padding-top: 20px;
  height: 250vh;
}

.sidebar-header {
  text-align: center;
}

.sidebar-logo {
  width: 50px;
  height: 50px;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

.nav-link {
  color: #fff;
  padding: 10px;
  text-decoration: none;
  display: block;
}

.nav-link:hover {
  background-color: #008000;
}

.content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  max-width: 400px;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
}
</style>