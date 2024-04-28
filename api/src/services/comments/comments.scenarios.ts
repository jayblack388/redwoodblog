import type { Prisma, Comment } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

import { standard as userScenario } from 'src/services/users/users.scenarios'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  user: userScenario.user,
  comment: {
    jane: (scenario) => ({
      data: {
        name: 'Jane Doe',
        body: 'I like trees',
        post: {
          create: {
            title: 'Redwood Leaves',
            body: 'The quick brown fox jumped over the lazy dog.',
            slug: 'redwood-leaves',
            id: '1',
            userId: scenario.user.one.id,
          },
        },
      },
    }),
    john: (scenario) => ({
      data: {
        name: 'John Doe',
        body: 'Hug a tree today',
        post: {
          create: {
            title: 'Root Systems',
            body: 'The five boxing wizards jump quickly.',
            slug: 'root-systems',
            userId: scenario.user.one.id,
          },
        },
      },
    }),
  },
})

export const postOnly = defineScenario<Prisma.PostCreateArgs>({
  user: userScenario.user,
  post: {
    bark: (scenario) => ({
      data: {
        title: 'Bark',
        body: "A tree's bark is worse than its bite",
        slug: 'bark',
        userId: scenario.user.one.id,
      },
    }),
  },
})

export type StandardScenario = ScenarioData<Comment, 'comment'>
export type PostOnlyScenario = typeof postOnly
