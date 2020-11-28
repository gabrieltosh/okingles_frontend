<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Mis Clases" />
            </q-breadcrumbs>
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-tabs
              v-model="tab"
              class="text-teal q-pa-md"
            >
              <q-tab name="myclass" icon="eva-checkmark-circle-outline" label="Mis Clases" />
              <q-tab name="history" icon="eva-calendar-outline" label="Historial" />
            </q-tabs>
            <transition name="fade">
              <div class="row q-pa-md q-col-gutter-md" v-if="tab==='myclass'" >
                <div v-for="item in data.assignments" :key="item.id" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                  <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                      <q-card-section class="q-pt-xs">
                        <div class="text-overline">{{item.day+' '+item.date}}</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">{{item.lesson}}</div>
                        <div class="text-overline text-blue-grey">
                          Teacher : {{item.name}} <br>
                          {{item.classroom}}
                        </div>
                      </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="q-pa-none">
                      <q-btn flat color="primary" round icon="event" />
                      <q-btn flat >
                        {{item.start+' - '+item.end}}
                      </q-btn>
                      <q-btn flat color="primary" @click="handleShowSchedule(item)">
                        Ingresar
                      </q-btn>
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div class="q-pa-md" v-if="tab==='history'">
                 <q-timeline :layout="layout" color="secondary">
                  <q-timeline-entry
                    v-for="(item, index) in data.history" :key="index"
                    :title="item.schedule.lesson.name"
                    :subtitle="item.schedule.day.name+' '+item.schedule.day.day_date"
                    :side="index%2==0?'right':'left'"
                    :icon="item.status=='wait'?'eva-calendar-outline':item.status=='absent'?'eva-person-remove-outline':item.status=='present'?'eva-person-done-outline':''"
                    :color="item.status=='wait'?'warning':item.status=='absent'?'negative':item.status=='present'?'positive':''"
                  >
                  <q-card class="q-ma-lg" flat bordered>
                    <q-card-section horizontal>
                      <q-card-section class="q-pt-xs">
                        <div class="text-overline">{{item.schedule.classroom.name}}</div>
                        <div class="text-overline text-blue-grey">
                          Teacher : {{item.schedule.teacher.name+" "+item.schedule.teacher.lastname}} <br>
                          {{item.classroom}}
                        </div>
                      </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="q-pa-none">
                      <q-btn flat color="primary" round icon="event" />
                      <q-btn flat >
                        {{item.schedule.time.start+' - '+item.schedule.time.end}}
                      </q-btn>
                    </q-card-actions>
                  </q-card>
                  </q-timeline-entry>
                </q-timeline>
                <div align="center" class="q-pa-sm" v-if="data.status=='show'">
                  <q-btn @click="handleGetHistoryAssignment()" outline color="primary" size="md" label="Mostrar Mas" />
                </div>
              </div>
            </transition>
          </q-card>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        history: [],
        skip: 0,
        assignments: [],
        count: null,
        status: 'show',
        schedule: []
      },
      tab: 'myclass'
    }
  },
  mounted () {
    this.handleGetHistoryAssignment()
    this.HandleGetAssignmentToDay()
  },
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  },
  methods: {
    handleGetHistoryAssignment () {
      var url = '/student/get/assignment/history'
      this.$axios.post(url, {
        student_id: this.$auth.user().user.id,
        skip: this.data.skip
      }).then(response => {
        this.data.history = this.data.history.concat(response.data.data)
        this.data.status = response.data.status
        this.data.skip = this.data.skip + 10
      })
    },
    HandleGetAssignmentToDay () {
      var url = '/student/get/assignment/today'
      this.$axios.post(url, {
        student_id: this.$auth.user().user.id
      }).then(response => {
        this.data.assignments = response.data.assignment
        this.data.count = response.data.count
      })
    },
    handleGetSchedule (item) {
      var url = '/student/get/myclass/schedule'
      this.$axios.post(url, {
        schedule_id: item.schedule_id
      }).then(response => {
        this.data.schedule = response.data
        this.$router.push({
          name: 'myclass.schedule',
          params: {
            schedule: this.data.schedule
          }
        })
      })
    },
    handleShowSchedule (item) {
      this.handleGetSchedule(item)
    }
  }
}
</script>
