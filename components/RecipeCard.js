import Link from 'next/link'
import { thumbFor } from '../lib/images'

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="recipe-card">
      <div className="recipe-card-img">
        {recipe.coverImage && (
          <img
            src={thumbFor(recipe.coverImage)}
            alt={recipe.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // A photo added without a thumbnail still shows, just heavier.
              if (!e.currentTarget.dataset.fullSize) {
                e.currentTarget.dataset.fullSize = '1'
                e.currentTarget.src = recipe.coverImage
              }
            }}
          />
        )}
        {recipe.category && (
          <span className="recipe-card-tag">{recipe.category}</span>
        )}
      </div>
      <div className="recipe-card-body">
        <div className="recipe-card-name">{recipe.title}</div>
        {recipe.seoDescription && (
          <div className="recipe-card-desc">
            {recipe.seoDescription.split('.')[0]}.
          </div>
        )}
      </div>
    </Link>
  )
}
