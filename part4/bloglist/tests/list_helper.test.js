const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    },
  ]  

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(18)
  })  
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
  ]

  const listWithThreeBlogs = [
    {
      title: 'Unpopular post',
      author: 'Charlie',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'Even worse post',
      author: 'Charlie',
      likes: -3,
    },
  ]  

  test('of empty list is empty', () => {
    const result = listHelper.favoiteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only one blog, returns itself', () => {
    const result = listHelper.favoiteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })

  test('of a bigger list is returned right', () => {
    const result = listHelper.favoiteBlog(listWithThreeBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })  
})

describe('author with most blogs', () => {
  const listWithOneBlog = [
    {
      title: 'some blog',
      author: 'Charlie',
    }
  ]

  const listWithFourBlogs = [
    {
      title: 'Unpopular post',
      author: 'Charlie',
    },
    {
      title: 'Blog 1',
      author: 'Robert C. Martin',
    },
    {
      title: 'Blog 2',
      author: 'Robert C. Martin',
    },
    {
      title: 'Blog 3',
      author: 'Robert C. Martin',
    },
  ]

  test('of empty list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has only one blog, returns 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Charlie',
      blogs: 1
    })
  })

  test('of a bigger list is returned right', () => {
    const result = listHelper.mostBlogs(listWithFourBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })  
})

describe('author with most likes', () => {

  const listWithOneBlog = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
  ]

  const listWithThreeBlogs = [
    {
      title: 'Unpopular post',
      author: 'Charlie',
      likes: -1,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'another good post',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
  ]  

  test('of empty list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has only one blog, returns its likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 12
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 17
    })
  })  
})