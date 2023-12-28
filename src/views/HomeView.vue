<template>
  <div class="home">
    <Sidebar v-if="showSidebar" />


    <div class="content">
      <div v-if="users.length" class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.name">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddUser @refresh-users="fetchUserData"></AddUser>
    </div>
  </div>
</template>

<script>
 import AddUser from '@/components/AddUser.vue';
 import Sidebar from '@/components/Sidebar.vue';
  import axios from 'axios';
export default {
  name: 'AddUserView',
  components: {
    AddUser,Sidebar
  },
  data() {
    return {
      showSidebar: true,

      users: [],
    };
  },
  mounted() {
     this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
    try {
      const response = await axios.get('https://feedback.waelchafei.workers.dev/getUsers');
        console.log("response",response);
      if (response.ok) {
        const clonedResponse = response.clone();  
        console.log("clonedResponse",clonedResponse);
        const result = await clonedResponse.json();
        console.log("results",result);
         const usersData1 = JSON.parse(result);

        console.log("userssdata",usersData1);

        const usersData = JSON.parse(usersData1.users);
        this.users = usersData.users;
      } else {
        console.error('API request failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  },
  },
};
</script>

<style scoped>
 .home {
  display: flex;
}

.sidebar {
  background-color: #012901; 
  color: #fff;  
  width: 250px;
  padding-top: 20px;
  height: 150vh;  
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
}
</style>
