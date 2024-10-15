<template>
  <div class="container">
    <!-- Logo -->
    <img src="@/assets/ivotelogo.png" alt="Logo" class="logo" />

    <!-- Header -->
    <h1 class="header">COMMISSION ON STUDENT ELECTIONS</h1>

    <!-- Nominees Label -->
    <h2 class="nominees-label">Nominees:</h2>

    <!-- Buttons Layout -->
    <div class="buttons-container">
      <button class="btn add-nominee" @click="addNominee">Add Nominee</button>
      <button class="btn reset" @click="resetAndRemoveNominees">Reset</button>
      <button class="btn submit-votes" @click="submitVotes">Submit Votes</button>
    </div>

    <!-- Nominee Cards Container -->
    <div class="nominees-container">
      <div v-for="nominee in nominees" :key="nominee.id" class="card">
        <h3 class="nominee-title">{{ nominee.name }}</h3>
        <div class="score">{{ nominee.score }}</div>

        <!-- Rename and Reset buttons for each nominee -->
        <button class="btn rename" @click="renameNominee(nominee.id)">Rename</button>
        <button class="btn reset" @click="resetNomineeScore(nominee.id)">Reset</button>

        <div class="adjust-buttons">
          <button class="btn minus" @click="adjustScore(nominee.id, -1)">-</button>
          <button class="btn plus" @click="adjustScore(nominee.id, 1)">+</button>
        </div>
      </div>
    </div>

    <!-- Year Text -->
    <p class="year">2024</p>

    <!-- Footer Text -->
    <p class="footer">Group 7(iVOTE)</p>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

export default {
  name: 'HomePage',
  data() {
    return {
      nominees: [], // Start with an empty array
      nextId: 1, // Keep track of the next nominee's ID
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
    addNominee() {
      const name = prompt("Enter nominee's name:");
      if (name) {
        this.nominees.push({ id: this.nextId, name, score: 0 });
        this.nextId++; // Increment the next ID
        this.updateNominees(); // Emit update to the server
      }
    },
    resetAndRemoveNominees() {
      this.nominees = []; // Clear the nominees array to remove all nominees
      this.nextId = 1; // Reset the nextId back to 1
      this.updateNominees(); // Emit update to the server
      console.log('All nominees have been reset and removed');
    },
    renameNominee(nomineeId) {
      const nominee = this.nominees.find(n => n.id === nomineeId);
      if (nominee) {
        const newName = prompt("Enter the new name:");
        if (newName) {
          nominee.name = newName;
          this.updateNominees(); // Emit update to the server
          console.log(`Nominee renamed to: ${newName}`);
        }
      }
    },
    resetNomineeScore(nomineeId) {
      const nominee = this.nominees.find(n => n.id === nomineeId);
      if (nominee) {
        nominee.score = 0;
        this.updateNominees(); // Emit update to the server
        console.log(`Score reset for: ${nominee.name}`);
      }
    },
    adjustScore(nomineeId, change) {
      const nominee = this.nominees.find(n => n.id === nomineeId);
      if (nominee) {
        nominee.score += change;
        this.updateNominees(); // Emit update to the server
        console.log('Adjust Score for Nominee', nomineeId, 'Change:', change);
      }
    },
    updateNominees() {
      // Emit the updated nominees to the server
      this.socket.emit('nomineeUpdate', this.nominees);
    },
    async submitVotes() {
      console.log('Submit Votes button clicked'); // Log to confirm the method is triggered
      alert("Submit Votes button clicked!"); // Confirming the button click

      // Create an object to hold nominees' names and their scores
      const votesData = {};
      this.nominees.forEach(nominee => {
        votesData[nominee.name] = nominee.score; // Create an object mapping nominee names to scores
      });

      try {
        // Set the votes in Firestore
        const votesRef = doc(this.db, 'votes', 'electionVotes'); // Create a document in the 'votes' collection
        await setDoc(votesRef, votesData); // Save the votes to the document
        console.log('Votes submitted successfully');
      } catch (error) {
        console.error('Error submitting votes:', error);
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

.buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
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
}

.add-nominee {
  background-color: #ffc107;
  color: #000;
}

.reset {
  background-color: #ff0000;
  color: #fff;
}

.submit-votes {
  background-color: #007bff; /* Style for submit votes button */
  color: #fff;
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

.rename,
.reset {
  background-color: #007bff;
  color: #fff;
  margin: 5px 0;
}

.adjust-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.plus,
.minus {
  background-color: #28a745;
  color: #fff;
  width: 40px;
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
