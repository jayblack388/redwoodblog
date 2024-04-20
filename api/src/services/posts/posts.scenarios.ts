import type { Prisma, Post } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: { data: { title: 'String', body: 'String', slug: 'string' } },
    two: { data: { title: 'String', body: 'String', slug: 'string' } },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
