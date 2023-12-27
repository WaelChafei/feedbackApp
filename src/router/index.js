import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SurveyView from '../views/SurveyView.vue';
import AddSurvey from '../views/AddSurvey.vue';
import SurveyDetails from '../views/SurveyDetails.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/addsurvey',
    name: 'Add Survey',
    component: AddSurvey,
  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { layout: 'no-sidebar' }, // Add meta information for login view
  },
  {
    path: '/surveys',
    name: 'surveys',
    component: SurveyView,
  },
  {
    path: '/survey/:id',
    name: 'survey-details',
    component: SurveyDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
