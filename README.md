

🚘 Car Rental System

---

📖 Project Description

The Car Rental System is a full-stack application designed to streamline the process of renting vehicles by connecting customers (users) with car owners.

This platform enables users to explore available cars, make bookings based on availability, and manage their rental history. On the other side, car owners can list their vehicles, manage availability, and track booking requests efficiently.

The system is built with a focus on scalability, clean architecture, and real-world usability, making it suitable for practical deployment and academic demonstration.

---

🔗 Live URL

👉 https://rdcrs.vercel.app

---

🛠️ Tech Stack

🔹 Backend

- Java
- Spring Boot
- Spring Data JPA (Hibernate)
- Spring Security
- Spring Validation
- RESTful APIs

🔹 Frontend

- NextJs
- TypeScript

🔹 Database

- PostgreSQL
  
🔹 Cloud

- Cloudinary

---

📚 Libraries & Dependencies

- Spring Web
- Spring Boot Starter Data JPA
- PostgreSQL Connector
- Lombok (for reducing boilerplate code)
- Jackson (JSON processing)

---

🚀 Key Features

👤 User Module

- Secure Registration & Login
- Browse and search available cars
- Filter cars based on price and availability
- Book cars for specific dates
- View booking history

🚗 Car Owner Module

- Owner registration & authentication
- Add and manage car listings
- Update availability status
- View and manage booking requests

---

🧩 System Design Highlights

- Layered architecture (Controller → Service → Repository)
- REST API-based communication
- Separation of concerns for maintainability
- Scalable backend structure using Spring Boot

---

⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-username/car-rental-system.git
cd car-rental-system

2️⃣ Configure Database

Create a PostgresSQL database and update the configuration:

spring.datasource.url=jdbc:postgres://localhost:5431/car_rental
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

3️⃣ Run Backend

http://localhost:8080

4️⃣ Run Frontend

- cd frontend
- npm install
- NEXT_PUBLIC_API_URL=http://localhost:8080
- npm run dev

---

📸 Screenshots
<img width="1894" height="916" alt="image" src="https://github.com/user-attachments/assets/8f14f07b-610d-4328-accd-4cced9731d12" />

<img width="1887" height="907" alt="image" src="https://github.com/user-attachments/assets/fca77881-a527-42b6-b32a-6154a06240ee" />

<img width="1886" height="909" alt="image" src="https://github.com/user-attachments/assets/4e93d448-c715-41bd-82a9-59abc391f044" />


---

📁 Project Structure

car-rental-system/

│

├── backend-crs/        # Spring Boot backend

│   ├── src/main/java/

│   │   ├── controller/

│   │   ├── service/

│   │   ├── repository/

│   │   ├── model/

│   │

│   ├── src/main/resources/

│   │   └── application.properties

│   └── pom.xml

│

├── frontend-crs/       # Next.js frontend

│   ├── src/

│   ├── public/

│   ├── package.json

│   └── .env.local

│


---

🔮 Future Enhancements

- Payment Gateway Integration (Razorpay/Stripe)
- Real-time availability tracking
- Rating & Review System
- Location-based car search (Maps API)
- Dynamic pricing model

---

🤝 Contribution

Contributions, issues, and feature requests are welcome.
Feel free to fork the repository and submit a pull request.

---

📬 Contact

For collaboration or queries:
📧 raghvendra0550@gmail.com

---
