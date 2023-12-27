 <template>
    <div>
      <h2>Survey Creator Page</h2>
      <SurveyCreator />
    </div>
  </template>
  
  <script>
  import { SurveyCreatorComponent } from "survey-creator-vue";
  const SurveyCreator = SurveyCreatorComponent;
  const genJson = JSON.parse(this.$route.params.genJson);
console.log("genJson",genJson);
  export default {
    components: {
      SurveyCreator,
    },
  };
  </script>
  
  <style scoped>
   </style>
  