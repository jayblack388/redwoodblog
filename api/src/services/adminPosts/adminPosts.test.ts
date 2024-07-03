import type { Post } from '@prisma/client'

import { standard as userScenario } from 'src/services/users/users.scenarios'

import {
  adminPosts,
  adminPost,
  createPost,
  updatePost,
  deletePost,
} from './adminPosts'
import type { StandardScenario } from './adminPosts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('adminPosts', () => {
  beforeEach(() => {
    mockCurrentUser({ ...userScenario.user.one.data })
  })
  scenario('returns all posts for a user', async (scenario) => {
    mockCurrentUser(scenario.user.one)
    const results = await adminPosts()
    const userOnesPosts = Object.values(scenario.post).filter(
      (p: Post) => p.userId === scenario.user.one.id
    )
    expect(results).toEqual(userOnesPosts)
  })

  scenario('returns a single post', async (scenario: StandardScenario) => {
    const result = await adminPost({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })

  scenario('creates a post', async (scenario) => {
    mockCurrentUser(scenario.user.one)
    const result = await createPost({
      input: {
        title: 'String',
        body: 'String',
      },
    })

    expect(result.title).toEqual('String')
    expect(result.body).toEqual('String')
    expect(result.slug).toEqual('string')
  })

  scenario('updates a post', async (scenario: StandardScenario) => {
    const original = (await adminPost({ id: scenario.post.one.id })) as Post
    const result = await updatePost({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a post', async (scenario: StandardScenario) => {
    const original = (await deletePost({ id: scenario.post.one.id })) as Post
    const result = await adminPost({ id: original.id })

    expect(result).toEqual(null)
  })
})
