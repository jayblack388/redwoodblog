import { slugify } from 'api/src/functions/slugify'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

const POSTS = [
  {
    title: 'Welcome to the blog!',
    body: "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
  },
  {
    title: 'A little more about me',
    body: "Raclette shoreditch before they sold out lyft. Ethical bicycle rights meh prism twee. Tote bag ennui vice, slow-carb taiyaki crucifix whatever you probably haven't heard of them jianbing raw denim DIY hot chicken. Chillwave blog succulents freegan synth af ramps poutine wayfarers yr seitan roof party squid. Jianbing flexitarian gentrify hexagon portland single-origin coffee raclette gluten-free. Coloring book cloud bread street art kitsch lumbersexual af distillery ethical ugh thundercats roof party poke chillwave. 90's palo santo green juice subway tile, prism viral butcher selvage etsy pitchfork sriracha tumeric bushwick.",
  },
  {
    title: 'What is the meaning of life?',
    body: 'Meh waistcoat succulents umami asymmetrical, hoodie post-ironic paleo chillwave tote bag. Trust fund kitsch waistcoat vape, cray offal gochujang food truck cloud bread enamel pin forage. Roof party chambray ugh occupy fam stumptown. Dreamcatcher tousled snackwave, typewriter lyft unicorn pabst portland blue bottle locavore squid PBR&B tattooed.',
  },
]

export default async () => {
  try {
    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    if ((await db.user.count()) === 0) {
      const users = [
        { name: 'John', email: 'john@example.com', password: 'password' },
      ]
      if (users.length > 1) {
        for (const user of users) {
          const [hashedPassword, salt] = hashPassword(user.password)
          await db.user.create({
            data: {
              name: user.name,
              email: user.email,
              hashedPassword,
              salt,
            },
          })
        }
      } else {
        const [hashedPassword, salt] = hashPassword(users[0].password)
        const user = await db.user.create({
          data: {
            name: users[0].name,
            email: users[0].email,
            hashedPassword,
            salt,
          },
        })
        for (const post of POSTS) {
          await db.post.create({
            data: {
              title: post.title,
              slug: slugify(post.title),
              body: post.body,
              userId: user.id,
            },
          })
        }
      }
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
