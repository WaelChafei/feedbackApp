<template>
  <div>
    <h2>Survey Details</h2>
    <p>{{ id }}</p>
     <div id="survey" ></div>

  </div>
</template>

<script>
import { Survey } from 'survey-knockout-ui';
import axios from 'axios';
export default {

    props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
        survey: [],
    };
  },
  mounted() {
    this.loadSurvey();
  },
  methods: {
  async loadSurvey(){

        const response = await axios.get('https://feedback.waelchafei.workers.dev/showSurvey');
        const clonedResponse = response.clone(); 
        const result = await clonedResponse.json();
        console.log("results",result);
         const surveyData1 = JSON.parse(result);
  
        console.log("surveyData1",surveyData1);
        const surveyId=this.id;
        const allsurveys=surveyData1.surveys
        const jsonallsurveys = JSON.parse(allsurveys);

        console.log("surveyId",surveyId);
        const surveyFinded = jsonallsurveys.find(entry => Object.keys(entry)[0] === surveyId);
        const extractedJson = surveyFinded ? JSON.stringify(surveyFinded, null, 2) : null;
        console.log("extractedJson",extractedJson);
        const parsedExtractedJson=JSON.parse(extractedJson);
        console.log("parsedExtractedJson",parsedExtractedJson);
        const questionsArray = parsedExtractedJson[surveyId].questions;
        const newJsonVariable = {
        elements: questionsArray
        };
        console.log("newJsonVariable",newJsonVariable);
   
        this.survey = newJsonVariable;


        const survey = new Survey(this.survey);
    survey.render("survey");
    },
}
};
</script>
