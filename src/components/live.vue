<template>
  <div class="container">
    <header>
      <h1>Live Nomination</h1>
    </header>
    <main>
      <section class="nominees">
        <div class="nominee" v-for="nominee in nominees" :key="nominee.id">
          <h2>{{ nominee.name }}</h2>
          <p>Votes: <span>{{ nominee.score }}</span></p> <!-- Display the number of votes -->
        </div>
      </section>
      <section class="live-chat">
        <h2>Live Chat</h2>
        <div class="chat-box">
          <div class="chat-message" 
               v-for="(message, index) in chatMessages" 
               :key="index" 
               :class="{ 'other-message': message.user !== username }">
            <strong>{{ message.user }}</strong>: <span>{{ message.message }}</span>
          </div>
        </div>
        <input type="text" v-model="newMessage" placeholder="Type your message..." />
        <button @click="sendMessage">Send</button>
      </section>
    </main>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { db } from '@/firebase'; // Adjust the path as necessary
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'; // For Firestore
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

export default {
  name: 'LivePage',
  data() {
    return {
      nominees: [],  // Store nominees with their vote counts
      chatMessages: [], // Store chat messages
      newMessage: '', // Input for new chat message
      socket: null, // Socket.io connection
      username: 'User', // Default username
    };
  },
  async mounted() {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null; // Get current user ID

    // Fetch the user's first name from Firestore
    await this.fetchUserName(userId);

    this.socket = io('http://localhost:3000');

    // Listen for nominee updates from the server
    this.socket.on('nomineeUpdate', (updatedNominees) => {
      this.nominees = updatedNominees; // Update nominees in real-time
    });

    // Listen for chat messages
    this.socket.on('chatMessage', (message) => {
      this.chatMessages.push(message);
    });

    // Fetch initial nominees from Firestore
    const nomineesCollection = collection(db, 'nominees');
    onSnapshot(nomineesCollection, (snapshot) => {
      this.nominees = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include the score field
    });
  },
  methods: {
    async fetchUserName(userId) {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        this.username = userDoc.data().firstName; // Get user's first name
      }
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;

      const message = {
        user: this.username,
        message: this.newMessage,
      };

      this.socket.emit('chatMessage', message);
      this.newMessage = ''; // Clear the input after sending
    },
  },
  beforeUnmount() {
    // Clean up the socket connection when the component is destroyed
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.nominees {
  margin: 20px;
}

.nominee {
  background-color: #4a4a61;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.live-chat {
  margin-top: 20px;
}

.chat-box {
  height: 300px;
  overflow-y: auto;
  background-color: #f8f8f8;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column; /* New messages will appear at the bottom */
}

.chat-message {
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 5px;
  max-width: 60%; /* Limit the width of the message */
  word-wrap: break-word; /* Ensure long messages break properly */
  background-color: #f1f1f1; /* Color for all messages */
}

.other-message {
  color: black;
  text-align: left; /* Align text to the left for all messages */
}

input[type="text"] {
  width: 70%;
  padding: 10px;
}

button {
  padding: 10px;
}
</style>
