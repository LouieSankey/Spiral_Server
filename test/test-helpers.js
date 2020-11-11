
function makeAccounts() {
  return [
    {
      id: 1,
      account_username: 'username',
      email: 'test@email.com',
      password: 'password',
      date_published: '2029-01-22T16:28:32.615Z',
     },
     {
       id: 2,
       account_username: 'username2',
       email: 'fsd2@fds.com',
       password: 'password',
       date_published: '2029-01-22T16:28:32.615Z',
     }
  ]
}

function makeProjects() {
  return [
    {
      id: 1,
      project: 'First project',
      account: 1,
      date_published: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      project: 'Second project',
      account: 1,
      date_published: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      project: 'Project for different account',
      account: 2,
      date_published: '2029-01-22T16:28:32.615Z',
    }
 
  ]
}

function makeTasks() {
  return [
    {
      id: 1,
      task: '1st task for project 0.',
      project: 1,
      account: 1,
      cycle: 5,
      date_published: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      task: '2nd task for project 0.',
      project: 2,
      account: 1,
      cycle: 5,
      date_published: '2029-01-22T16:28:32.615Z',
    }
    
  ];
}


function makePref() {
  return [
    {
      id:1,
      account: 1,
      gong: true,
      _1: 0,
      _2: 0,
      _3: 0,
      _5: 0,
      _8: 0,
      _13: 0,
      _21: 0,
      _34: 0,
      _55: 0,
      _89: 0,
      date_published: '2029-01-22T16:28:32.615Z'
     },
     {
      id:2,
      account: 2,
      gong: true,
      _1: 0,
      _2: 0,
      _3: 0,
      _5: 0,
      _8: 0,
      _13: 0,
      _21: 0,
      _34: 0,
      _55: 0,
      _89: 0,
      date_published: '2029-01-22T16:28:32.615Z'
     },
  ]
}

module.exports = {
  makePref,
  makeAccounts,
  makeProjects,
  makeTasks
}