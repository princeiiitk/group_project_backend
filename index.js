const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const serverConfig = require('./config/serverConfig');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

// Initialize express app
const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api', chatRoutes);
app.use('/api', userRoutes);

// Example protected route
app.use('/api/protected/chats', authMiddleware, chatRoutes);

// Global error handling middleware
app.use(errorMiddleware);

// Connect to the database
connectDB();

// Start the server
app.get('/',(req,res) => {
  return res.send('hello world')
})
const PORT = serverConfig.port;
app.listen(PORT, () => {
  console.log(`Server is running in ${serverConfig.env} mode on port ${PORT}`);
});
