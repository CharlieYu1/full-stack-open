const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((total, like) => total + like, 0)
}

const favoiteBlog = (blogs) => {
  if (blogs.length === 0) { return {} }
  const mostfavoritedBlog = blogs.reduce((currentMostLikedBlog, blog) => {
    if (currentMostLikedBlog) {
      return (blog.likes > currentMostLikedBlog.likes) ? blog : currentMostLikedBlog
    } else {
      return blog
    }
  })
  return mostfavoritedBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return {} }
  let authorBlogCount = {}
  let maxBlogCount = 0
  let maxBlogAuthor = ''
  blogs.forEach(blog => {
    let author = blog.author
    if (author in authorBlogCount) {
      authorBlogCount[author] += 1
    } else {
      authorBlogCount[author] = 1
    }

    if (authorBlogCount[author] > maxBlogCount) {
      maxBlogAuthor = author
      maxBlogCount = authorBlogCount[author]
    }
  })

  return {author: maxBlogAuthor, blogs: maxBlogCount}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return {} }
  let authorLikesCount = {}
  let maxLikesCount = 0
  let maxLikesAuthor = ''
  blogs.forEach(blog => {
    let author = blog.author
    if (author in authorLikesCount) {
      authorLikesCount[author] += blog.likes
    } else {
      authorLikesCount[author] = blog.likes
    }

    if (authorLikesCount[author] > maxLikesCount) {
      maxLikesAuthor = author
      maxLikesCount = authorLikesCount[author]
    }
  })

  return {author: maxLikesAuthor, blogs: maxLikesCount}
}

module.exports = {
  dummy, totalLikes, favoiteBlog, mostBlogs, mostLikes
}