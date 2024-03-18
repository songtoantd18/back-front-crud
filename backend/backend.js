const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// Giả sử bạn có một cơ sở dữ liệu để lưu trữ thông tin người dùng
app.use(cors());
const users = [
  { username: "admin", password: "admin123", tennhanvien: "Admin" },
  { username: "user", password: "user123", tennhanvien: "Regular User" },
];

// Middleware để xử lý dữ liệu gửi từ frontend
app.use(bodyParser.json());
app.get("/users", (req, res) => {
  res.json(users);
});

app.put("/users", (req, res) => {
  const { username } = req.body;
  const updatedUser = req.body; // Dữ liệu người dùng đã được cập nhật từ yêu cầu PUT
  console.log("🚀 ~ app.put ~ updatedUser:", updatedUser);

  // Tìm kiếm người dùng trong danh sách dựa trên username
  const index = users.findIndex((user) => user.username === username);
  if (index !== -1) {
    // Nếu tìm thấy người dùng, cập nhật thông tin của người dùng
    users[index] = updatedUser;
    res.json({ message: "User updated successfully", updatedUser });
  } else {
    // Nếu không tìm thấy người dùng, thêm người dùng mới vào danh sách
    users.push(updatedUser);
    res.status(201).json({ message: "User created successfully", updatedUser });
  }
});

// Route xử lý yêu cầu đăng nhập từ frontend
app.post("/user/dms/mobilelogin", (req, res) => {
  const { username, password, token, os } = req.body;

  // Tìm kiếm người dùng trong cơ sở dữ liệu
  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (foundUser) {
    // Nếu tìm thấy người dùng, trả về thông tin của người dùng
    res.json({
      success: true,
      username: foundUser.username,
      tennhanvien: foundUser.tennhanvien,
    });
  } else {
    // Nếu không tìm thấy người dùng, trả về thông báo lỗi
    res.status(401).json({ message: "Username or Password is incorrect" });
  }
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
