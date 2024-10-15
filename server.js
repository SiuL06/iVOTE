import express from 'express'; // Import Express
import { createServer } from 'http'; // Import HTTP
import { Server } from 'socket.io'; // Import Socket.io
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname, join } from 'path'; // Import path module
import dotenv from 'dotenv'; // Import dotenv
import helmet from 'helmet'; // Import helmet

// Load environment variables from .env file
dotenv.config();

// Use fileURLToPath and dirname to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // Create an Express application
const server = createServer(app); // Create HTTP server
const io = new Server(server); // Create Socket.io server

// Sample nominees data
let nominees = [
  { id: 1, name: 'Nominee 1', score: 0 },
  { id: 2, name: 'Nominee 2', score: 0 }
];

// Use helmet to set security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "http://localhost:3000"], // Allow fonts from the same origin
      // Add other directives as necessary
    }
  }
}));

// Serve the Vue.js application
app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send initial nominees to the newly connected user
  socket.emit('nomineeUpdate', nominees);

  // Listen for nominee updates from the client
  socket.on('nomineeUpdate', (updatedNominees) => {
    nominees = updatedNominees; // Update nominees on the server
    io.emit('nomineeUpdate', nominees); // Broadcast updated nominees to all clients
    console.log('Nominees updated:', nominees); // Debug log
  });

  // Listen for chat messages
  socket.on('chatMessage', (msg) => {
    console.log('Chat message received:', msg);
    io.emit('chatMessage', msg); // Broadcast the message to all clients
  });

  // Log when a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Set the port to listen on
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`); // Log the port being listened on
});
