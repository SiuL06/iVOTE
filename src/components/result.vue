<template>
    <div>
      <header>
        <h1>Live Nomination Results</h1>
      </header>
      <main>
        <section class="nominee-list">
          <!-- Display nominee results -->
          <div class="nominee" v-for="nominee in nominees" :key="nominee.name">
            <h2>{{ nominee.name }}</h2>
            <p>Votes: {{ nominee.votes }}</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 iVote. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name:  'ResultsPage',

    data() {
      return {
        nominees: [
          { name: 'Nominee 1', votes: 120 },
          { name: 'Nominee 2', votes: 80 }
        ]
      };
    },
    beforeRouteEnter(to, from, next) {
      const hasVoted = localStorage.getItem('voted');
      if (hasVoted === 'true') {
        next();  // Allow access if voted
      } else {
        next({ name: 'Live' });  // Redirect to live page if not voted
      }
    }
  };
  </script>
  