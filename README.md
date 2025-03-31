# Weather Dashboard

A fast, modern weather dashboard built with [Next.js](https://nextjs.org), leveraging JAMstack principles to deliver a seamless, interactive user experience. The dashboard fetches real-time weather data from OpenWeatherMap and displays comprehensive details including temperature, weather description, humidity, wind, local time, sunrise, sunset, and more.

## Features

- **Real-Time Weather Data:**  
  Fetches current weather data for any city using a serverless API route.
  
- **Comprehensive Information:**  
  Displays temperature, humidity, pressure, wind speed and direction, local time (adjusted for timezone), sunrise, and sunset times. Optionally, shows rain and snow information if available.

- **JAMstack Architecture:**  
  Pre-rendered static markup enhanced with dynamic API calls, ensuring fast performance, security, and scalability.

- **Modern UI:**  
  Styled with Tailwind CSS for a clean, responsive, and modern design.

## Technologies Used

- [Next.js](https://nextjs.org) (with TypeScript)
- Tailwind CSS
- OpenWeatherMap API
- Serverless functions (Next.js API routes)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (or yarn/pnpm)

### Installation

1. **Clone the Repository:**

   ```
   git clone https://github.com/Ethiopian-boy/weather-dashboard.git
   cd weather-dashboard

   ```
2. **Install Dependencies:**
```
npm install
# or using yarn
yarn install

```

3. **Set Up Environment Variables:**
Create a .env.local file in the project root and add your OpenWeatherMap API key:
```
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key

```
**Running the Development Server**
Start the development server:

```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 in your browser to see the Weather Dashboard in action.