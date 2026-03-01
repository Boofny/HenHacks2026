## HenHacks
# AI Resume Ranking System

An AI-powered web application that evaluates and ranks resumes based on customizable hiring criteria.

This project allows users to upload resumes and dynamically adjust weighted evaluation parameters such as leadership, experience, hard skills, and education. The system builds a structured prompt and sends it to an AI model to generate ranked results.

---

## Features

- Upload multiple resumes
- Adjustable weighted scoring system
- Expandable advanced criteria for each category
- Dynamic prompt generation
- Configurable number of resumes to return
- Clean, responsive UI built with Tailwind CSS
- Client-side state management using React hooks

---

##  How It Works

1. The user uploads resumes.
2. The user sets evaluation weights:
   - Leadership
   - Experience
   - Hard Skills
   - Education
3. Optional advanced criteria can be added for each category.
4. Parameters are converted into a structured string.
5. The prompt is sent to an AI model.
6. The AI returns ranked resumes based on the defined weights.

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- Gemini API (for AI evaluation)

---

## ACTIVE DEMO 

host Vercel:

https://skill-scan-six.vercel.app/
