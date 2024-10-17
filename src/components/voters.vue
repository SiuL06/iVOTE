<template>
  <div class="container">
    <img src="@/assets/ivotelogo.png" alt="Logo" class="logo" />
    <h1 class="header">Vote for Your Nominees</h1>

    <div v-for="nominee in nominees" :key="nominee.id" class="card">
      <h2 class="nominee-title">{{ nominee.name }}</h2>
      <div class="score">{{ nominee.score }}</div>
      <button 
        @click="submitVote(nominee.id)" 
        :disabled="hasVoted" 
        class="vote-btn">
        Vote
      </button>
    </div>

    <p class="year">2024</p>
    <p class="footer">Group 7(iVOTE)</p>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { getFirestore, doc, collection, getDocs, updateDoc, increment } from 'firebase/firestore'; // Import Firestore functions

export default {
  name: 'VoterComponent', // Multi-word component name
  data() {
    return {
      nominees: [], // Array of nominees fetched from Firestore
      hasVoted: false, // Flag to check if user has voted
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

    // Fetch nominees from Firestore on mount
    this.fetchNominees();
  },
  methods: {
    async fetchNominees() {
      try {
        const snapshot = await getDocs(collection(this.db, 'nominees'));
        this.nominees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching nominees: ", error);
      }
    },
    async submitVote(nomineeId) {
      if (!this.hasVoted) { // Ensure user hasn't already voted
        console.log('Voting for nominee:', nomineeId); // Log selected nominee
        
        // Reference to the nominee document
        const nomineeRef = doc(this.db, 'nominees', nomineeId);

        try {
          // Increment the vote count in Firestore
          await updateDoc(nomineeRef, {
            score: increment(1) // Increment score by 1
          });

          console.log('Vote submitted successfully!');
          this.hasVoted = true; // Set hasVoted to true after voting
        } catch (error) {
          console.error("Error updating vote count: ", error);
        }
      } else {
        console.log('You have already voted.');
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

.card {
  background-color: #4a4a61;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 10px 0; /* Adjust margin for spacing */
  width: 90%;
  max-width: 300px;
}

.nominee-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.score {
  font-size: 48px;
  margin: 20px 0;
}

.vote-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.vote-btn:disabled {
  background-color: #6c757d; /* Change to grey when disabled */
  cursor: not-allowed; /* Change cursor to indicate non-clickable */
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
