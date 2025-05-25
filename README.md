

### ✅ COPY EVERYTHING BELOW INTO YOUR `README.md`:

```markdown
# 🎙️ Voice & Text Calculator

A modern calculator app that supports both **voice** and **text** commands. It uses:

- 🧠 A **Python Flask** backend to handle and evaluate commands.
- 🎨 A **Next.js + Tailwind CSS** frontend for the UI.
- 🎤 The **Web Speech API** for real-time voice recognition in supported browsers.

---

## 🚀 Live Demo (if deployed)

Coming Soon / [Add your Vercel or Netlify link here]

---

## 📂 Project Structure

```

project-root/
│
├── Backend/          # Flask backend
│   └── app.py
│
├── frontend/         # Next.js frontend
│   └── app/page.js (main UI)
│
└── README.md

````

---

## ✅ Requirements

- **Python 3.x**
- **Node.js v18+**
- A modern browser (Chrome recommended for voice recognition)

---

## 🧪 How to Run This Project Locally

### 📦 Step 1 – Run the Backend (Python Flask)

1. Open a terminal and navigate to the backend folder:

```bash
cd Backend
````

2. Install Flask:

```bash
pip install flask
```

3. Start the Flask server:

```bash
python app.py
```

✅ Flask should now be running at: `http://127.0.0.1:5000`

---

### 🎨 Step 2 – Run the Frontend (Next.js)

1. Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

✅ The frontend will run at: `http://localhost:3000`

---

## 🔄 How It Works

* **Text Command:** Type a command like `5 + 3` and click **Submit**.
* **Voice Command:** Click **Start Voice Command**, speak a command like `7 times 6`, and it will process it automatically.

---

## 🧠 Flask API Endpoints

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | `/test-command` | Handles text input  |
| POST   | `/command`      | Handles voice input |

Both expect JSON like:

```json
{
  "text": "5 + 3"
}
```

---

## ⚠️ Troubleshooting

* Make sure **both frontend and backend are running**.
* If your backend is not on `http://127.0.0.1:5000`, update the fetch URLs in `frontend/app/page.js`.
* If voice recognition doesn’t work, use **Google Chrome** and ensure microphone permissions are allowed.

---

## 📸 UI Preview

> *Add screenshots here if needed*

---

## 👨‍💻 Author

Made with ❤️ by \[Your Name Here]

---

## 📄 License

This project is free and open-source under the MIT License.

```

---

```
