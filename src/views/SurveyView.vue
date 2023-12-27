<template>
    <div class="survey-view">
      <Sidebar v-if="showSidebar" />

  
      <div class="content">
        <h2>Surveys</h2>
        <div class="survey-cards">
          <div v-for="(survey, index) in surveys" :key="index" class="card">
            <h3>{{ survey.name }}</h3>
            <p>{{ survey.description }}</p>
            <button @click="startSurvey(survey.name)">
            <router-link :to="{ name: 'survey-details', params: { id: survey.name } }" class="start-survey-link">Start Survey</router-link>
          </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';

  export default {
    components:{
    Sidebar,
  },
    data() {
      return {
        showSidebar: true,  

        surveys: [],
      };
    },
    mounted() {
      this.fetchSurveys();
    },
    methods: {
      async fetchSurveys() {
        try {
          const response = await fetch('http://localhost:3000/showSurvey');
          if (response.ok) {
            const surveysData1 = await response.json();
            const surveysData2 = JSON.parse(surveysData1);
            const surveysData = JSON.parse(surveysData2.surveys);
 

            this.surveys = surveysData.map((item) => ({
              name: Object.keys(item)[0],
              description: 'Description for ' + Object.keys(item)[0], 
            }));
          } else {
            console.error('API request failed:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error during API request:', error);
        }
      },
      startSurvey(surveyId) {
         console.log(`Starting survey with ID ${surveyId}`);
        this.$router.push(`/survey/${surveyId}`);
      },
    },
  };
  </script>
  
  <style scoped>
   </style>
  
  
  <style scoped>
   .survey-view {
    display: flex;
  }
  
  .sidebar {
    background-color: #012901; 
    color: #fff;  
    width: 250px;
    padding-top: 20px;
    height: 100vh; 
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
  
  .survey-cards {
    display: flex;
    flex-wrap: wrap;
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin: 10px;
    width: 300px;
  }
  
  h3 {
    margin-bottom: 10px;
  }
  
  button {
    padding: 8px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
  .start-survey-link{
    text-decoration: none;
    color: white;
  }
  </style>
  