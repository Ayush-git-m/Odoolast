const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dashboardRoutes = require("./routes/dashboardRoutes");
const transferRoutes = require("./routes/transferRoutes");
const stockRoutes = require("./routes/stockRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/transfers",transferRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.get("/", (req,res)=>{
    res.send("GodaamFlow API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});