import type { Prisma, Post } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

import { standard as userScenario } from 'src/services/users/users.scenarios'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  user: userScenario.user,
  post: {
    one: (scenario) => ({
      data: {
        title: 'Title 1',
        body: 'Body 1',
        slug: 'title-1',
        createdAt: new Date('01-01-2024'),
        userId: scenario.user.one.id,
      },
    }),
    two: (scenario) => ({
      data: {
        title: 'Title 2',
        body: 'Body 2',
        slug: 'title-2',
        createdAt: new Date('01-01-2024'),
        userId: scenario.user.one.id,
      },
    }),
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
