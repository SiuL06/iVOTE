<template>
  <div class="container">
    <header>
      <h1>Live Nomination</h1>
    </header>
    <main>
      <section class="nominees">
        <div class="nominee" v-for="nominee in nominees" :key="nominee.id">
          <h2>{{ nominee.name }}</h2>
          <p>Votes: <span>{{ nominee.score }}</span></p>
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
import { collection, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore'; // For Firestore
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

export default {
  name: 'LivePage',
  data() {
    return {
      nominees: [],
      chatMessages: [],
      newMessage: '',
      socket: null,
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

    // Load existing chat messages from Firestore
    const chatCollection = collection(db, 'chatMessages'); // Reference to chatMessages collection in Firestore
    onSnapshot(chatCollection, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Retrieve messages
      this.updateChatMessages(messages); // Update chat messages without duplicates
    });

    // Listen for chat messages from the server
    this.socket.on('chatMessage', (messageData) => {
      this.updateChatMessages([messageData]); // Update chat messages with the new message
    });
  },
  methods: {
    async fetchUserName(userId) {
      if (userId) {
        const userDoc = doc(db, 'users', userId); // Reference to the user document
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          this.username = userData.firstName || 'User'; // Set username to firstName or default to 'User'
        } else {
          console.error("No such user document!");
          this.username = 'User'; // Fallback username
        }
      } else {
        console.error("No authenticated user found!");
        this.username = 'User'; // Fallback if no user is authenticated
      }
    },
    async sendMessage() {
      if (this.newMessage.trim()) {
        const messageData = {
          user: this.username, // Ensure user is included
          message: this.newMessage,
          timestamp: Date.now() // Add timestamp for ordering
        };
        this.socket.emit('chatMessage', messageData); // Emit chat message to the server
        this.newMessage = ''; // Clear the input field
        
        // Save message to Firestore as well
        await this.saveMessageToFirestore(messageData);
      }
    },
    async saveMessageToFirestore(messageData) {
      const chatCollection = collection(db, 'chatMessages'); // Reference to chatMessages collection in Firestore
      try {
        await addDoc(chatCollection, messageData); // Add new message to Firestore
        console.log("Message saved successfully to Firestore");
      } catch (error) {
        console.error("Error saving message to Firestore:", error);
      }
    },
    updateChatMessages(newMessages) {
      newMessages.forEach((newMessage) => {
        const exists = this.chatMessages.some(message => message.timestamp === newMessage.timestamp && message.user === newMessage.user && message.message === newMessage.message);
        if (!exists) {
          this.chatMessages.push(newMessage); // Add the new message if it doesn't already exist
        }
      });
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
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
