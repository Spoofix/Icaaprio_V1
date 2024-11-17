# ICAAPrio

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your OpenAI API key in `.env`:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

   Get your API key from [OpenAI's platform](https://platform.openai.com/api-keys).

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- ICAAP Assessment and Management
- Regulatory Compliance (OSFI, BCFSA, FSRA)
- Risk Assessment Tools
- AI-Powered ICAAP Assistant (IRIS)
- Collaborative Review Process
- Stress Testing Framework

## IRIS - AI Assistant

IRIS (Intelligent Regulatory ICAAP Support) provides expert guidance on:
- ICAAP requirements and implementation
- Regulatory frameworks
- Risk assessment
- Capital planning
- Stress testing

Note: IRIS requires an OpenAI API key to access its full capabilities. Without an API key, it will operate in offline mode with limited functionality.