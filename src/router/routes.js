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
          { name: 'user.edit', path: 'edit', component: () => import('pages/Panel/User/Edit.vue') },
          { name: 'user.detail', path: 'details/:student', component: () => import('pages/Panel/User/Card.vue') }
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
          {
            name: 'student.reservation',
            path: 'reservation',
            component: () => import('pages/Panel/Student/Reservation/Index.vue'),
            children: [
              { name: 'reservation.days', path: 'days', component: () => import('pages/Panel/Student/Reservation/Days.vue') },
              { name: 'reservation.schedule', path: 'schedule/:day', component: () => import('pages/Panel/Student/Reservation/Schedule.vue') }
            ]
          },
          {
            name: 'student.myclass',
            path: 'myclass',
            component: () => import('pages/Panel/Student/MyClass/Index.vue'),
            children: [
              { name: 'myclass.schedules', path: 'schedules', component: () => import('pages/Panel/Student/MyClass/Schedules.vue') },
              { name: 'myclass.schedule', path: 'schedule/:schedule', component: () => import('pages/Panel/Student/MyClass/Student.vue') },
              { name: 'myclass.preview', path: 'preview/:schedule/::questionnaire', component: () => import('pages/Panel/Student/MyClass/Preview.vue') }
            ]
          }
        ]
      },
      {
        path: 'skill',
        component: () => import('pages/Panel/Skill/Index.vue'),
        children: [
          { name: 'skill.list', path: 'list', component: () => import('pages/Panel/Skill/List.vue') },
          { name: 'skill.create', path: 'create', component: () => import('pages/Panel/Skill/Create.vue') },
          { name: 'skill.edit', path: 'edit/:skill', component: () => import('pages/Panel/Skill/Edit.vue') }
        ]
      },
      {
        path: 'teacher',
        component: () => import('pages/Panel/Teacher/Index.vue'),
        children: [
          {
            name: 'teacher.myschedules',
            path: 'myschedules',
            component: () => import('pages/Panel/Teacher/MySchedules/Index.vue'),
            children: [
              { name: 'myschedules.days', path: 'days', component: () => import('pages/Panel/Teacher/MySchedules/Days.vue') },
              { name: 'myschedules.schedule', path: 'schedule/:day', component: () => import('pages/Panel/Teacher/MySchedules/Schedule.vue') },
              { name: 'myschedules.student', path: 'student/:day/:schedule', component: () => import('pages/Panel/Teacher/MySchedules/Student.vue') },
              { name: 'myschedules.preview', path: 'student/:day/:schedule/:questionnaire', component: () => import('pages/Panel/Teacher/MySchedules/Preview.vue') },
              { name: 'myschedules.detail', path: 'detail/:day/:schedule/:student', component: () => import('pages/Panel/Teacher/MySchedules/DetailStudent.vue') }
            ]
          },
          {
            name: 'teacher.materials',
            path: 'materials',
            component: () => import('pages/Panel/Teacher/Materials/Index.vue'),
            children: [
              { name: 'myschedules.list', path: 'list', component: () => import('pages/Panel/Teacher/Materials/List.vue') }
            ]
          },
          {
            name: 'teacher.questionnaires',
            path: 'questionnaires',
            component: () => import('pages/Panel/Teacher/Questionary/Index.vue'),
            children: [
              { name: 'questionnaires.list', path: 'list', component: () => import('pages/Panel/Teacher/Questionary/List.vue') },
              { name: 'questionnaires.details', path: 'details/:questionnaire', component: () => import('pages/Panel/Teacher/Questionary/Details.vue') },
              { name: 'questionnaires.preview', path: 'preview/:questionnaire', component: () => import('pages/Panel/Teacher/Questionary/Preview.vue') }
            ]
          }
        ]
      },
      {
        path: 'webpage',
        component: () => import('pages/Panel/WebPage/Index.vue'),
        children: [
          { name: 'webpage.list', path: 'list', component: () => import('pages/Panel/WebPage/List.vue') }
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
