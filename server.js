import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url'; // Import for getting the file path
import { dirname, join } from 'path'; // Import for handling file paths

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const nominees = []; // Store nominees here

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist'))); // Adjust the path as needed

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html')); // Serve index.html from dist
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send current nominees to the newly connected client
    socket.emit('nomineeUpdate', nominees);

    // Listen for nominee updates
    socket.on('nomineeUpdate', (updatedNominees) => {
        nominees.length = 0; // Clear existing nominees
        nominees.push(...updatedNominees); // Update nominees
        // Broadcast the updated nominees to all connected clients
        io.emit('nomineeUpdate', nominees);
    });

    // Handle chat messages
    socket.on('chatMessage', (message) => {
        // Broadcast the chat message to all connected clients
        io.emit('chatMessage', message);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = 3000; // You can change this port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
