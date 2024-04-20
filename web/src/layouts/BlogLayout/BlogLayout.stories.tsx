import BlogLayout from './BlogLayout'

export const loggedIn = () => {
  mockCurrentUser({ email: 'rob@redwoodjs.com', id: '1' })

  return <BlogLayout />
}

export const loggedOut = () => {
  return <BlogLayout />
}

export default { title: 'Layouts/BlogLayout' }
