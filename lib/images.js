// Cards and grids load a small pre-generated thumbnail instead of the full photo.
// A recipes page showing 250+ cards pulled roughly a gigabyte of full-size images
// before this; the thumbnails are about 90 KB each.
//
// Thumbnails live under /photos/thumbs with the same base name as the original and
// are always .jpg, whatever the source was. Regenerate them with scripts/thumbs.sh
// after adding a photo.
export function thumbFor(src) {
  if (!src || !src.startsWith('/photos/recipes/')) return src
  return src.replace('/photos/recipes/', '/photos/thumbs/').replace(/\.[^./]+$/, '.jpg')
}
