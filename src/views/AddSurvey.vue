<template>
  <div class="add-survey">
    <Sidebar v-if="showSidebar" />

    <div class="content">
      <div class="card-container">
        <h2>Add Survey</h2>
        <div v-for="(card, index) in cards" :key="index" class="card">
          <form @submit.prevent="submitSurvey(card)">
            <div class="form-group">
              <label for="name">Input Name:</label>
              <input type="text" v-model="card.name" required>
            </div>
            <div class="form-group">
              <label for="title">Input Title:</label>
              <input type="text" v-model="card.title" required>
            </div>
            <div class="form-group">
              <label for="type">Input Type:</label>
              <input type="text" v-model="card.type" required readonly placeholder="Text" style="color: #808080;" />
            </div>
          </form>
        </div>
        <button @click="addCard">+</button>

        <div class="table-container">
          <h1>Assigned Users:</h1>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody v-if="users.length > 0">
              <tr v-for="(user, userIndex) in users" :key="userIndex">
                <td>{{ user.email }}</td>
                <td>
                  <input type="checkbox" v-model="selectedUsers" :value="user.email" />
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="2">Loading users...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button @click="logSurveyData">Add Survey</button>
      </div>
      <div id="survey"></div>
      <SurveyCreator />

    </div>


  </div>
</template>

<script>
import { SurveyCreatorComponent } from "survey-creator-vue";
const SurveyCreator = SurveyCreatorComponent;
import "survey-core/defaultV2.min.css";
import { StylesManager } from "survey-core";
import { Survey } from 'survey-knockout-ui';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios';
StylesManager.applyTheme("defaultV2");

export default {
  components:{
    Sidebar,
  },
  data() {
    return {
      showSidebar: true,
      cards: [{ name: '', title: '', type: 'text' }],
      users: [],
      selectedUsers: [],
      surveyDataArray: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://feedback.waelchafei.workers.dev/getUsers');
        const usersData1 = response.data; // Axios automatically handles JSON parsing
        const usersData = JSON.parse(usersData1.users);
        this.users = usersData.users;
        console.log("users", this.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async submitSurvey(card) {
      const surveyData = {
        name: card.name,
        title: card.title,
        type: card.type,
      };

      console.log('Submitting survey:', surveyData);

      card.name = '';
      card.title = '';
      card.type = '';
    },

    addCard() {
      this.cards.push({ name: '', title: '', type: '' });
    },

    async logSurveyData() {
      const surveyData = this.cards.map(card => ({
        name: card.name,
        title: card.title,
        type: card.type,
      }));

      const postData = {
        survey3: {
          questions: surveyData,
          users: this.selectedUsers,
        },
      };

      console.log('Survey Data:', postData);

      try {
        const surveysResponse = await axios.get('https://feedback.waelchafei.workers.dev/showSurvey');
        const surveys = JSON.parse(surveysResponse.data.surveys);
        const lastSurvey = Object.keys(surveys[surveys.length - 1])[0];
        const lastSurveyNumber = parseInt(lastSurvey.replace("survey", ""));
        const nextSurveyNumber = lastSurveyNumber + 1;
        const nextSurveyName = "survey" + nextSurveyNumber;

        const postData = {
          [nextSurveyName]: {
            questions: surveyData,
            users: this.selectedUsers,
          },
        };

        const createSurveyResponse = await axios.post('https://feedback.waelchafei.workers.dev/createSurvey', postData);
        console.log('Survey creation response:', createSurveyResponse.data);

        const emailData = {
          to: this.selectedUsers.map(user => ({ "email": user, "name": "test" })),
        };

        const emailResponse = await axios.post('https://feedback.waelchafei.workers.dev/sendMail', emailData);
        console.log('Email sending response:', emailResponse.data);

        alert('Survey has been added successfully! Email has been sent to selected users.');
        this.$router.push('/surveys');
      } catch (error) {
        console.error('Error:', error);
        alert('Error during the process. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the AddSurvey component here */
.add-survey {
  display: flex;
}

.sidebar {
  background-color: #012901;
  /* Dark green color */
  color: #fff;
  /* Text color */
  width: 250px;
  padding-top: 20px;
  height: 250vh;
  /* 100% of the viewport height */
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
  /* Dark green color on hover */
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
  /* Set the maximum width of the card */
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
  /* Added margin at the top of the button */
}
</style>
