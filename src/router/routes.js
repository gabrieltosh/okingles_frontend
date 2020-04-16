const routes = [
  {
    path: '/',
    component: () => import('layouts/Auth.vue'),
    children: [
      { name: 'login.index', path: '', component: () => import('pages/Auth/Login.vue') }
    ]
  },
  {
    meta: { auth: true },
    path: '/panel',
    component: () => import('layouts/Panel.vue'),
    children: [
      { name: 'panel.index', path: '', component: () => import('pages/Panel/Index.vue') },
      {
        path: 'user',
        component: () => import('pages/Panel/User/Index.vue'),
        children: [
          { name: 'user.list', path: 'list', component: () => import('pages/Panel/User/List.vue') },
          { name: 'user.create', path: 'create', component: () => import('pages/Panel/User/Create.vue') },
          { name: 'user.edit', path: 'edit', component: () => import('pages/Panel/User/Edit.vue') }
        ]
      },
      {
        path: 'profile',
        component: () => import('pages/Panel/Profile/Index.vue'),
        children: [
          { name: 'profile.list', path: 'list', component: () => import('pages/Panel/Profile/List.vue') },
          { name: 'profile.create', path: 'create', component: () => import('pages/Panel/Profile/Create.vue') },
          { name: 'profile.edit', path: 'edit/:data', component: () => import('pages/Panel/Profile/Edit.vue') }
        ]
      },
      {
        path: 'branchoffice',
        component: () => import('pages/Panel/BranchOffice/Index.vue'),
        children: [
          { name: 'branch.list', path: 'list', component: () => import('pages/Panel/BranchOffice/List.vue') },
          { name: 'branch.create', path: 'create', component: () => import('pages/Panel/BranchOffice/Create.vue') },
          { name: 'branch.edit', path: 'edit/:data', component: () => import('pages/Panel/BranchOffice/Edit.vue') }
        ]
      },
      {
        path: 'module',
        component: () => import('pages/Panel/Module/Index.vue'),
        children: [
          { name: 'module.list', path: 'list', component: () => import('pages/Panel/Module/List.vue') },
          { name: 'module.create', path: 'create', component: () => import('pages/Panel/Module/Create.vue') },
          { name: 'module.edit', path: 'edit/:data', component: () => import('pages/Panel/Module/Edit.vue') }
        ]
      },
      {
        path: 'classroom',
        component: () => import('pages/Panel/Classroom/Index.vue'),
        children: [
          { name: 'classroom.list', path: 'list', component: () => import('pages/Panel/Classroom/List.vue') },
          { name: 'classroom.create', path: 'create', component: () => import('pages/Panel/Classroom/Create.vue') },
          { name: 'classroom.edit', path: 'edit/:data', component: () => import('pages/Panel/Classroom/Edit.vue') }
        ]
      },
      {
        path: 'lesson',
        component: () => import('pages/Panel/Lesson/Index.vue'),
        children: [
          { name: 'lesson.list', path: 'list', component: () => import('pages/Panel/Lesson/List.vue') },
          { name: 'lesson.create', path: 'create', component: () => import('pages/Panel/Lesson/Create.vue') },
          { name: 'lesson.edit', path: 'edit/:data', component: () => import('pages/Panel/Lesson/Edit.vue') }
        ]
      },
      {
        path: 'time',
        component: () => import('pages/Panel/Time/Index.vue'),
        children: [
          { name: 'time.list', path: 'list', component: () => import('pages/Panel/Time/List.vue') },
          { name: 'time.create', path: 'create', component: () => import('pages/Panel/Time/Create.vue') },
          { name: 'time.edit', path: 'edit/:data', component: () => import('pages/Panel/Time/Edit.vue') }
        ]
      },
      {
        path: 'week',
        component: () => import('pages/Panel/Week/Index.vue'),
        children: [
          { name: 'week.list', path: 'list/:data', component: () => import('pages/Panel/Week/List.vue') },
          { name: 'week.create', path: 'create/:data', component: () => import('pages/Panel/Week/Create.vue') },
          { name: 'week.edit', path: 'edit/:data', component: () => import('pages/Panel/Week/Edit.vue') },
          { name: 'week.branchoffice', path: 'branchoffice', component: () => import('pages/Panel/Week/BranchOffice/Index.vue') }
        ]
      },
      {
        path: 'day',
        component: () => import('pages/Panel/Day/Index.vue'),
        children: [
          { name: 'day.list', path: 'list/:data', component: () => import('pages/Panel/Day/List.vue') }
        ]
      },
      {
        path: 'schedule',
        component: () => import('pages/Panel/Schedule/Index.vue'),
        children: [
          { name: 'schedule.list', path: 'list/:data', component: () => import('pages/Panel/Schedule/List.vue') }
        ]
      },
      {
        path: 'student',
        component: () => import('pages/Panel/Student/Index.vue'),
        children: [
          { name: 'student.days', path: 'days', component: () => import('pages/Panel/Student/Days.vue') },
          { name: 'student.schedule', path: 'schedule/:day', component: () => import('pages/Panel/Student/Schedule.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
