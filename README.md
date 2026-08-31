**EasyEats Application Overview: EasyEats is a multi-restaurant online food ordering system designed to connect customers with local dining options. It provides an user-friendly interface for browsing menus across multiple restaurants, managing multi-restaurant carts, and processing independent checkouts. The system incorporates secure user authentication (Signup, Login, Logout, Profile updates), role-based access control distinguishing between Customers and Restaurant Managers, and comprehensive menu and order CRUD operations. With built-in data validation and relational database mapping, the application ensures a seamless and reliable experience for both personal and commercial food service management. **

**This application **contains** the following features:**

* User Authentication (Signup, Login, Logout)
* Role-Based Access Control (Customer vs. Restaurant Manager)
* Menu Management (Full CRUD for restaruant managers, global browsing for customers)
* Order Management (Full CRUD for customers)


**Architecture Summary**

EasyEats is built on a MERN **MERN stack (MongoDB, Express.js, React, Node.js)** with a decoupled client-server architecture:
* **Frontend:** Built with React, Tailwind CSS, React Router, and AuthContext for UI, routing protection, and login state management.
* **Backend (Server):** Powered by Node.js and Express.js to provide RESTful APIs, securing authentication with JWT.
* **Database:** Uses MongoDB with Mongoose ODM.
* **Role-Based Access Control:**
   - **Customer:** Can browse all restaurant menus globally, manage carts, place independent checkouts with delivery addresses, and manage their order histories.
   - **Restaurant Manager:** Restricted to managing only their own restaurant’s menu items through full CRUD operations.


**Known Limitations**

The following features were simplified for this project:
* **Restaurant Manager Order Management**: Restaurant managers cannot yet view incoming orders or update order statuses directly from their dashboard.
* **Payment Processing**: Actual online payment integration (such as Stripe or PayPal) is simulated. Orders are placed without real financial transactions.
* **Image Support**: The application is text-based and does not support restaurant or menu item images.
* **Live Delivery Tracking & Geolocation**: Map-based live location tracking and automatic address geolocation are omitted.
* **Search & Filtering**: Advanced search bars, keyword filtering, and sorting for menus or restaurants are not yet implemented.


**Setup & Installation Instructions**

To run this project locally for development and testing, follow these steps:

1. Clone the Repository
`git clone https://github.com/HSINTINGTU/Online-Food-Ordering-System-EasyEats.git`
`cd Online-Food-Ordering-System-EasyEats`
2. Create a .env file in the backend folder and add the following configurations:
`MONGO_URI=mongodb+srv:<YOUR MONGODB CONNECTION STRING>`
`JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DXCsd3Yx8mF3Bl0kch6HYtFs=`
`PORT=5001`
3. Install the following command in root folder for backend and frontend dependencies:
`npm run install-all`
4. To start both the frontend and backend concurrently:
`npm start` OR `npm run dev`


**Deployment URL:** http://32.236.155.253:3000


---

**Prerequisite:** Please install the following software and create account in following web tools** **

* **Nodejs [**[https://nodejs.org/en](https://nodejs.org/en)]** **
* **Git [**[https://git-scm.com/](https://git-scm.com/)]** **
* **VS code editor** [[https://code.visualstudio.com/](https://code.visualstudio.com/)]** **
* **MongoDB Account** [[https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)]** - In tutorial, we have also showed how can you create account and database: follow step number 2.**
* **GitHub Account** [[https://github.com/signup?source=login](https://github.com/signup?source=login)]** **

---
