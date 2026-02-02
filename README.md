# Design Investment Calculator

A Next.js application for calculating design and development investment with projected ROI metrics.

## Features

- Interactive pricing calculator for brand, interface, and website services
- Real-time ROI projections (Time Efficiency, Brand Value, Conversion Lift)
- Prerequisite validation for service dependencies
- Responsive design with Tailwind CSS
- Built with Next.js 15 and React 18

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/design-investment-calculator)

### Manual Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Your app will be live in minutes at `https://your-project.vercel.app`

## Project Structure

```
├── app/
│   ├── page.tsx          # Main calculator component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles with Tailwind
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

No environment variables required for basic functionality.

## License

MIT
