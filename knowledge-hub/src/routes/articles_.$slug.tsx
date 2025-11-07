import { createFileRoute } from '@tanstack/react-router'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

type ArticleType = {
  id: number
  title: string
  content: any
  category?: { name: string } | null
}

export const Route = createFileRoute('/articles_/$slug')({
  loader: async ({ params }) => {
    const res = await fetch(
      `http://localhost:1337/api/articles?filters[slug][$eq]=${params.slug}&populate=category`
    )
    const json = await res.json()
    const articleData = json.data[0]

    if (!articleData) throw new Error('Article not found')

    return {
      article: {
        id: articleData.id,
        title: articleData.attributes.title,
        content: articleData.attributes.content,
        category: articleData.attributes.category?.data?.attributes || null,
      },
    }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: ArticleType }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      {article.category && (
        <p className="text-gray-400 mb-4">Category: {article.category.name}</p>
      )}
      <div className="prose mt-6">
        <BlocksRenderer content={article.content} />
      </div>
      <a
        href="/articles"
        className="mt-6 inline-block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
      >
        ← Back to Articles
      </a>
    </div>
  )
}
