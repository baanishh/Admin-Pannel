const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


dotenv.config();
const app = express();
connectDB();


app.use('/uploads', express.static('uploads'));

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}
));


app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', userRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
