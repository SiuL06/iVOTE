// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/home.vue'; // Update with your actual path
import LandingPage from './components/landing.vue'; // Correct path for LandingPage
import LoginPage from './components/login.vue'; // Update with your actual path
import AboutPage from './components/about.vue';  // Update with your actual path
import LivePage from './components/live.vue'; // Update with your actual path
import RegisterPage from './components/register.vue'; // Update with your actual path
import ResultsPage from './components/result.vue'; // Update with your actual path
import ContactPage from './components/contact.vue';  // Update with your actual path
import VoterComponent from '@/components/voters.vue'; // Adjust the path as necessary


const routes = [
  { path: '/', component: LandingPage }, // Set LandingPage as the default route
  { path: '/about', component: AboutPage }, // About page route
  { path: '/live', component: LivePage }, // Live nomination page route
  { path: '/register', component: RegisterPage }, // Register page route
  { path: '/home', component: Home },  // Home page route
  { path: '/login', component: LoginPage }, // Login page route
  { path: '/contact', component: ContactPage }, // Result page route
  { path: '/voters', component: VoterComponent }, // Result page route
  {
    path: '/result',
    component: ResultsPage,
    beforeEnter: (to, from, next) => {
      // Check if the user has voted
      const hasVoted = localStorage.getItem('voted');
      if (hasVoted === 'true') {
        next(); // Allow access to results page if user has voted
      } else {
        next('/live'); // Redirect to live page if user hasn't voted
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;