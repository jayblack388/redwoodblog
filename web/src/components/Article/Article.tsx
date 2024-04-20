import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { truncate } from 'src/lib/formatters'

export const TRUNCATION_LENGTH = 100

interface Props {
  article: Omit<Post, 'createdAt'>
  summary?: boolean
}

const Article = ({ article, summary = false }: Props) => {
  return (
    <article>
      <header>
        <h2 className="text-xl font-semibold text-blue-700">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
      </header>
      <div className="mt-2 font-light text-gray-900">
        {summary ? truncate(article.body, TRUNCATION_LENGTH) : article.body}
      </div>
    </article>
  )
}

export default Article
