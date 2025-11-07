// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <h1 className="text-6xl font-black mb-6">Knowledge Hub</h1>
      <p className="text-xl text-gray-300 mb-6 text-center max-w-xl">
        A full-stack content hub powered by Strapi 5 and TanStack Start.
      </p>
      <a
        href="/articles"
        className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-lg"
      >
        Browse Articles
      </a>
    </div>
  )
}
