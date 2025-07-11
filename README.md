# 📬 Resilient Email Service

A fault-tolerant and scalable **Email Sending API** built with **Node.js**, **Express**, and **MongoDB**. It smartly uses **multiple email providers with fallback**, **retry logic**, **idempotency**, and **rate limiting** to ensure that your emails are delivered — no matter what.

---

## 🧐 Assumptions

* You want to **send transactional emails reliably** from your application.
* Providers can fail, so you need **automatic fallback to backup providers**.
* Users should not be able to spam (rate-limiting is enabled).
* Duplicate email sends must be avoided using **idempotency keys**.
* You want to **track the status** of every email request (sent/failed/etc.).

---

## 🚀 Features

* ✅ **Multiple Email Providers** (e.g., SendGrid, Mailgun, EdenAI, etc.)
* 🔁 **Fallback System**: Automatically switches if one provider fails
* 🔂 **Retry Mechanism**: Retries with exponential backoff on failure
* 🛡️ **Idempotency**: Prevents duplicate email sending
* ⚡ **Rate Limiting**: Limits frequency of API calls per IP
* 🗂️ **MongoDB Email Status Tracking**
* 🛋️ **Simple REST API**
* 🧪 **Jest-based Unit Testing**

---

## 📁 Project Structure

```
email-service/
│
├── providers/           # Pluggable email provider modules
├── middlewares/         # Rate limiting, validation, etc.
├── models/              # MongoDB schemas
├── service/             # email-service logic here
├── tests/               # Jest unit tests
├── .env                 # Environment configuration
├── app.js               # Express app setup
├── index.js             # Application entry point
└── README.md            # This file
```

---

## ⚙️ Setup Instructions

### 1. 📅 Clone the Repository

```bash
git clone https://github.com/your-username/email-service.git
cd email-service
```

### 2. 📆 Install Dependencies

```bash
npm install
```

### 3. 🥪 Configure Environment Variables

Create a `.env` file in the root and add the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/email-service
RATE_LIMIT_WINDOW=15  # In minutes
RATE_LIMIT_MAX=100    # Max requests per window per IP
```

> Replace the `MONGO_URI` with your actual MongoDB connection string.

### 4. ▶️ Start the Server

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📨 API Endpoints

### `GET /`

Returns a welcome message and confirms service is running.

### `POST /send`

Sends an email using the best available provider with fallback.

#### Request Body

```json
{
  "to": "recipient@example.com",
  "subject": "Hello!",
  "message": "This is a test email from Resilient Email Service."
}
```

#### Optional Headers

```http
Idempotency-Key: unique-request-id
```

> Use `Idempotency-Key` to prevent sending the same email twice accidentally.

---

## 🧐 Email Provider Module Format

Each provider should be exported like this from `providers/ProviderX.js`:

```js
module.exports = {
  name: 'ProviderX',
  send: async (email) => {
    // simulate success or failure
  }
};
```

You can add/remove providers freely — just plug them into the provider array.

---

## 🧪 Run Unit Tests

```bash
npm test
```

> Tests use Jest to ensure reliability of fallback, retry, and rate limiting.

---

## 📟 Email Status Schema (MongoDB)

```json
{
  "to": "recipient@example.com",
  "subject": "Hello",
  "message": "This is a test.",
  "status": "sent | failed | retrying",
  "providerUsed": "ProviderA",
  "attempts": 2,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

Stored in the `emails` collection.

---

## 🧱 Rate Limiting

Limits API requests to `RATE_LIMIT_MAX` per `RATE_LIMIT_WINDOW` per IP using middleware.

---

## 📊 Improvements in the Roadmap

* 🧑‍💻 Add OAuth2 and API Key-based Auth
* 🎨 Admin Dashboard to track email logs
* 📩 HTML Email Support + Templates
* 🔁 Delivery confirmation via webhooks
* 📊 Provider performance stats

---

## 🛠 Built With

* [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
* [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
* [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
* [![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
* [![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
* [![Custom Engine](https://img.shields.io/badge/Fallback+Retry%20Engine-Custom-blue?style=for-the-badge)](#)


---

## 🙌 Contributing

PRs, Issues, and Suggestions are welcome!
If you'd like to add more providers or features, feel free to fork and enhance it.

---

## 🌐 Deployed At

The service is live and running at:

🔗 [email-service](https://email-service-u6uq.onrender.com/)

> Use `POST /send` to send emails and `GET /` to check the service status.


---

## 👤 Author

**Mohammad Zaid Khan**
## 🌐 Social Platforms

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:zk286187@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/64bitAtomic)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohammad-zaid-khan-020199260/)
[![Website](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://innospark.netlify.app/)


---
