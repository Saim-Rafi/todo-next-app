
# 📝 Todo App

A full-stack Todo application built using **Next.js** and **MongoDB**. This app offers a smooth and responsive user experience, allowing users to easily manage their daily tasks.

## 🔗 Live Demo

👉 [**todo-next-app-pink.vercel.app**](https://todo-next-app-pink.vercel.app/)


## 🚀 Tech Stack

- **Next.js** (App Router)
- **MongoDB** with **Mongoose**
- **Axios** – HTTP client for API communication
- **React Toastify** – For stylish toast notifications
- **date-fns** – To format and manipulate dates
- **Tailwind CSS**


## ✨ Features

- **➕ Create Todo**
Seamlessly create new tasks using an intuitive form. When you submit a todo, it sends a POST request to the backend using Axios, storing the title, description, and due date in a MongoDB collection via Mongoose. Each todo is timestamped and saved with precision using date-fns for consistent and human-readable formatting.

- **🗑️ Delete Todo**
Declutter your list effortlessly! With just one click, send a DELETE request through Axios to remove completed or irrelevant todos from the database. The UI updates instantly, providing a smooth user experience without unnecessary reloads.

- **✏️ Update Todo**
Need to revise your plan? Edit any existing todo item directly from the interface. A PUT request is made using Axios, allowing you to update the title, description, or due date. Changes are reflected in real-time, and thanks to date-fns, dates remain consistently formatted.

- **📱 Responsive Design**
Whether you're on a desktop, tablet, or mobile phone, the app delivers a fully responsive layout. Tailored media queries and flexible component design ensure seamless usability across all screen sizes.

- **💡 Smooth & Interactive UI**
The user interface is designed to feel intuitive and fluid. Using React Toastify, real-time toast notifications provide feedback for actions like creating, updating, or deleting todos—keeping users informed without disrupting their flow.


## 📦 Packages Used
| Package           | Purpose                                 |
|------------------|------------------------------------------|
| `axios`          | Making API requests                      |
| `mongoose`       | MongoDB object modeling                  |
| `react-toastify` | Displaying notifications                 |
| `date-fns`       | Formatting and working with dates        |
| `next`           | React framework with fullstack support   |


## 🧪 Future Enhancements 

- [x] **User Authentication** – Implement secure login/signup using [NextAuth.js](https://next-auth.js.org/)
- [ ] **Calendar View** – Visualize todos in a calendar format for better date management
- [ ] **Dark Mode Toggle** – Add a theme switcher for better accessibility and aesthetics
- [ ] **Unit and Integration Testing** – Add robust testing using tools like Jest and React Testing Library


## 🛠️ How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/Saim-Rafi/todo-nextjs-app.git
   cd todo-nextjs-app

2. **Install dependencies**
    npm install

3. **Set up environment variables**
    MONGODB_URI = mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>

4. **Run the dev server**
    npm run dev

5. Open **http://localhost:3000** in your browser 🚀


## Screenshots
<p float="left">
<img src="/ScreenShot/img1.png">
<img src="/ScreenShot/img2.png">

</p>

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


