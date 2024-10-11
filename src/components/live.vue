<template>
    <div>
      <header>
        <h1>Live Nomination</h1>
      </header>
      <main>
        <section class="nominees">
          <div class="nominee" v-for="(nominee, index) in nominees" :key="index">
            <h2>{{ nominee.name }}</h2>
            <p>Votes: <span>{{ nominee.votes }}</span></p>
          </div>
        </section>
        <section class="live-chat">
          <h2>Live Chat</h2>
          <div class="chat-box">
            <div class="chat-message" v-for="(message, index) in chatMessages" :key="index">
              <p>{{ message }}</p>
            </div>
          </div>
          <input type="text" v-model="newMessage" placeholder="Type your message..." />
          <button @click="sendMessage">Send</button>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name:  'LivePage',

    data() {
      return {
        nominees: [
          { name: 'Nominee 1', votes: 0 },
          { name: 'Nominee 2', votes: 0 }
        ],
        chatMessages: [],
        newMessage: ''
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim()) {
          this.chatMessages.push(this.newMessage);
          this.newMessage = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  header {
    text-align: center;
    padding: 20px;
    background-color: #333;
    color: #fff;
  }
  
  .nominees {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
  
  .nominee {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 30%;
    text-align: center;
  }
  
  .live-chat {
    margin-top: 40px;
    text-align: center;
  }
  
  .chat-box {
    border: 1px solid #ccc;
    height: 200px;
    margin-bottom: 20px;
    overflow-y: scroll;
    padding: 10px;
  }
  
  .chat-message {
    background-color: #f1f1f1;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
  }
  
  input[type="text"] {
    width: 70%;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #555;
  }
  </style>