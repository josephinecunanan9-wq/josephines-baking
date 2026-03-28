import Link from 'next/link'

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="recipe-card">
      <div className="recipe-card-img">
        {recipe.coverImage && (
          <img
            src={recipe.coverImage}
            alt={recipe.title}
            loading="lazy"
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
