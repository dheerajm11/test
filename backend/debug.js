const fs = require('fs');
const path = require('path');

console.log("Current directory:", process.cwd());
console.log("Files in models:", fs.readdirSync('./models'));
try {
    const User = require('./models/User');
    console.log("User model loaded successfully");
} catch (error) {
    console.error("Error loading User model:", error);
}

try {
    const authController = require('./controllers/authController');
    console.log("Auth controller loaded successfully");
} catch (error) {
    console.error("Error loading Auth controller:", error);
}
