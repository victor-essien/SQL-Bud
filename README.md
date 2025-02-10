# AI-Powered SQL Error Assistant (SQL-BUD) PWA APP

## 🚀 Overview
The **SQL-BUD** is a web application designed to assist developers in debugging SQL errors efficiently. Instead of uploading files, the app captures a **screenshot of the SQL Workbench** when it is pulled to the far right of the user's screen. The captured image is then analyzed using AI, which provides suggestions to help fix SQL errors.

## ✨ Features
- **Screenshot Capture**: Detects when SQL Workbench is pulled to the far right and captures a screenshot.
- **AI-Powered Debugging**: AI analyzes the SQL error and provides step-by-step guidance to resolve it.
- **Categorized Feedback**:
  - 🔄 **Syntax Errors**
  - 🔍 **Query Optimization**
  - ✅ **Best Practices**
  - 🚀 **Performance Improvements**
- **Progressive Web App (PWA) Support**: Installable and works offline.

## 🛠️ Technologies Used
### **Frontend**
- **React** (TypeScript)
- **Tailwind CSS**
- **Vite** (for fast development)
- **PWA support** (Service Workers)

### **Backend**
- **Node.js** (TypeScript)
- **Express.js**
- **Gemini AI API** (for SQL debugging)
- **Multer** (for handling screenshots)


## ⚙️ Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/victor-essien/SQL-Bud.git
cd sql-bud
```

### **2. Install Dependencies**
#### Frontend:
```sh
cd client
npm install
```
#### Backend:
```sh
cd ../server
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the `server/` directory:
```env

API_KEY=your_gemini_api_key
```

### **4. Run the Project**
#### **Run Backend**
```sh
cd server
npm run dev
```
#### **Run Frontend**
```sh
cd client
npm run dev
```

### **5. Open in Browser**
Navigate to: `http://localhost:5173`

## 📱 PWA Support
To install as a PWA, click on the **install** button in the browser or manually install via Chrome DevTools.

