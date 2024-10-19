<template>
  <div class="container">
    <!-- Logo -->
    <img src="@/assets/ivotelogo.png" alt="Logo" class="logo" />

    <!-- Header -->
    <h1 class="header">COMMISSION ON STUDENT ELECTIONS - VIEW NOMINEES</h1>

    <!-- Nominees Label -->
    <h2 class="nominees-label">Nominees:</h2>

    <!-- Nominee Cards Container with radio buttons -->
    <div class="nominees-container">
      <div v-for="nominee in nominees" :key="nominee.id" class="card">
        <input
          type="radio"
          v-model="selectedNominee"
          :value="nominee.name"
        />
        <label class="nominee-title">{{ nominee.name }}</label>
        <div class="score">{{ nominee.score }}</div>
      </div>
    </div>

    <!-- Submit Button -->
    <button class="btn submit-votes" @click="submitVote">Submit Vote</button>

    <!-- Year Text -->
    <p class="year">2024</p>

    <!-- Footer Text -->
    <p class="footer">Group 7(iVOTE)</p>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore

export default {
  name: 'ViewNomineesPage',
  data() {
    return {
      nominees: [], // Array to store nominees
      selectedNominee: '', // Variable to store the selected nominee for voting
      socket: null, // Socket.io connection
      db: null // Firestore reference
    };
  },
  mounted() {
    // Connect to the Socket.io server
    this.socket = io('http://localhost:3000');

    // Initialize Firestore
    this.db = getFirestore();

    // Listen for nominee updates from the server
    this.socket.on('nomineeUpdate', (updatedNominees) => {
      this.nominees = updatedNominees; // Update nominees in real-time
    });
  },
  methods: {
    async submitVote() {
      // Check if a nominee is selected
      if (!this.selectedNominee) {
        alert('Please select a nominee to vote for.');
        return;
      }

      // Create a vote object with the selected nominee
      const voteData = {
        vote: this.selectedNominee,
        timestamp: new Date() // Optional: store when the vote was cast
      };

      try {
        // Save the vote in Firestore
        const voteRef = doc(this.db, 'votes', 'userVote'); // Store each vote in a 'votes' collection
        await setDoc(voteRef, voteData);
        console.log('Vote submitted successfully');
        alert('Your vote has been submitted successfully!');
      } catch (error) {
        console.error('Error submitting vote:', error);
        alert('Error submitting vote, please try again.');
      }
    }
  },
  beforeUnmount() {
    // Clean up the socket connection when the component is destroyed
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #3b3b50;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.logo {
  width: 200px;
  height: 100px;
  margin-top: 20px;
}

.header {
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.nominees-label {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}

.nominees-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
}

.card {
  background-color: #4a4a61;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  width: 45%;
  max-width: 200px;
}

.nominee-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.score {
  font-size: 48px;
  margin: 20px 0;
}

.btn {
  padding: 10px 20px;
  width: 140px;
  height: 50px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  background-color: #007bff; /* Submit votes button color */
  color: #fff;
  margin-top: 20px;
}

.year {
  margin-top: auto;
  font-size: 16px;
  margin-bottom: 5px;
}

.footer {
  margin: 0;
  font-size: 14px;
}
</style>

Please record every votes of the user in firestore