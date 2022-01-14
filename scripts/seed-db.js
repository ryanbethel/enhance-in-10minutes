// /scripts/sandbox-startup.js
const treeDb = require('../src/shared/tree-db')
const userDb = require('../src/shared/user-db')

async function startUpScript() {
  let user1 = await userDb.create({
    username: 'user1',
    firstName: 'Ryan',
    lastName: 'Bethel',
    role: 'admin',
    github: {
      login: 'ryanbethel',
    },
  })
  let user2 = await userDb.create({
    username: 'user2',
    firstName: 'John',
    lastName: 'Smith',
    role: 'member',
    github: {
      login: 'johnsmith',
    },
  })
  let user3 = await userDb.create({
    username: 'user3',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'member',
    github: {
      login: 'janedoe',
    },
  })

  const branch1 = await treeDb.create({
    username: user1.username,
    branch: {
      type: 'page',
      path: '/page',
      'page-title': 'My Link Page',
      'page-subtitle': 'This is a subtitle',
      'page-description': `This is a description`,
      'page-logo': 'begin-logo.svg',
      'page-links-0-text': 'text',
      'page-links-0-url': 'https://begin.com',
    },
  })

  const branch2 = await treeDb.create({
    username: user1.username,
    branch: {
      type: 'short',
      path: '/short',
      'short-url': 'https://begin.com',
      'short-type': 'temporary',
    },
  })
}

startUpScript()
  .then(() => console.log('database seeded'))
  .catch((err) => console.log('error seeding database', err))
