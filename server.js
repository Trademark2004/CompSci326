import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());
app.use(express.static("frontend"));

const users = [{ username: "user1", password: "pass1" }];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "home.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
