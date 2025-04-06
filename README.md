# Receipt Tracker AI

A modern receipt management application built with Next.js 15, React 19, and Convex. This application allows users to efficiently manage and track their receipts with real-time updates, AI-powered features, and background processing capabilities.

## 🚀 Features

- **Real-time Receipt Management**: Create, view, and delete receipts instantly
- **AI-Powered Analysis**: Intelligent receipt data extraction and categorization
- **Authentication**: Secure user authentication powered by Clerk
- **Real-time Database**: Built with Convex for real-time data synchronization
- **Background Processing**: Utilizes Inngest for reliable background job processing
- **Modern UI**: Built with Tailwind CSS and modern React components
- **Type Safety**: Full TypeScript support throughout the application
- **Drag & Drop**: Intuitive receipt organization with DnD-kit
- **Stripe Integration**: Secure payment processing capabilities

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.2, React 19
- **Authentication**: Clerk
- **Database**: Convex
- **Background Jobs**: Inngest
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Components**: Radix UI, Lucide React
- **Payment Processing**: Stripe
- **Drag & Drop**: DnD Kit

## 📦 Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm
- Convex account
- Clerk account
- Inngest account
- Stripe account

## 🚀 Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/devLeopar/AI-receipt-tracker.git
cd receipt-tracker-ai
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up environment variables:**
Copy the `.env.example` file to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables include:
- Convex deployment settings
- Clerk authentication keys
- Anthropic API key
- OpenAI API key
- Schematic configuration

Check `.env.example` for the complete list of required variables and their format.

4. **Start the development server:**
```bash
pnpm dev
```

This will start:
- Next.js frontend server
- Convex backend server
- Inngest development server

## 📝 Development Scripts

- `pnpm dev`: Start all development servers
- `pnpm build`: Build the production application
- `pnpm start`: Start the production server
- `pnpm lint`: Run ESLint

## 🏗️ Project Structure

```
receipt-tracker-ai/
├── app/                  # Next.js app directory
├── actions/             # Server actions
├── components/          # Reusable React components
├── convex/              # Convex backend functions and schema
├── inngest/            # Inngest functions and configurations
├── lib/                # Utility functions and configurations
└── public/             # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Bug Reports

If you discover any bugs, please create an issue in the GitHub repository.

## 📄 License

This project is proprietary software. All rights reserved.
