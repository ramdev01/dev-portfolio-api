# dev-portfolio-api

dev-portfolio-api is a lightweight, RESTful API backend built to power a developer portfolio or personal website. The portfolio-api includes a dedicated endpoint for handling contact form submissions from your frontend portfolio site. This backend can be connected to any frontend — React, Next.js, Vue, or even mobile apps — for seamless data-driven portfolio experiences.

**Live Deployment:**
Hosted on Render.com
🔗 https://dev-portfolio-api-t6xe.onrender.com

**API Endpoints:**

**API Test**
Endpoint: GET /api/v1/form/test
Use this to confirm that the API is up and running.

**Contact Form Submission**
Endpoint: POST /api/v1/form/contact-us
Description:
Send contact form data — such as name, email, and message — from your frontend to this endpoint. The backend will handle the data (e.g. forward it via email).

Payload Format (JSON):
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "Hi, I'm interested in collaborating on a project!"
}
Headers:
Content-Type: application/json



