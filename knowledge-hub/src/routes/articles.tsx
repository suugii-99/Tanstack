import { createFileRoute, Link } from '@tanstack/react-router'

type Article = {
  id: number
  title: string
  slug: string
  category?: { name: string } | null
}

export const Route = createFileRoute('/articles')({
  loader: async () => {
    const res = await fetch('http://localhost:1337/api/articles?populate=category')
    if (!res.ok) throw new Error('Failed to fetch articles')

    const json = await res.json().catch(() => null)
    if (!json) throw new Error('Invalid JSON from Strapi')

    const articles: Article[] = (json.data || []).map((a: any) => ({
      id: a.id,
      title: a.attributes.title,
      slug: a.attributes.slug,
      category: a.attributes.category?.data?.attributes || null,
    }))

    return { articles }
  },
  component: ArticlesPage, // <-- inline component defined below
})

function ArticlesPage() {
  const { articles } = Route.useLoaderData() as { articles: Article[] }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Articles</h1>
      <ul className="space-y-2">
        {articles.map(article => (
          <li key={article.id} className="border-b pb-2">
            <a
              href={`/articles/${article.slug}`} // or use Route.path({slug: article.slug}) if using Route instance
              className="text-cyan-400 hover:underline"
            >
              {article.title}
            </a>
            {article.category && (
              <span className="ml-2 text-sm text-gray-500">
                ({article.category.name})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
