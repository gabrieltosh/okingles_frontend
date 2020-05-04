<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Dias" icon="eva-grid-outline" :to="{name:'student.days'}" />
            <q-breadcrumbs-el label="Horarios" />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-12">
                        <div class="text-subtitle1">Horarios {{$route.params.day.name +' '+$route.params.day.day_date}}</div>
                    </div>
                </div>
            </q-card-section>
            <div class="row q-pa-md q-col-gutter-md">
                <div v-for="item in data.schedules" :key="item.id" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                    <q-card class="my-card">
                        <q-img src="http://localhost:8000/images/modules/student/img-schedule.jpg">
                            <div class="absolute-bottom">
                                <div class="text-subtitle2" align="center"> {{item.day.name}} <strong>{{item.time.name}}</strong></div>
                                <div class="text-subtitle2" align="center"> <strong>{{item.classroom.name}}</strong></div>
                            </div>
                        </q-img>
                        <q-card-actions align="center">
                            <q-btn @click="handleShowSchedule(item)" dense round color="primary" size="sm" icon="eva-plus-outline"></q-btn>
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </q-card>
    </div>
    <q-dialog v-model="show.schedule" transition-show="scale" transition-hide="scale">
        <q-card style="width: 400px">
            <q-card-section class="theme-color text-white" align="center">
                <div class="text-h6">{{data.schedule.day.name+' '+data.schedule.time.name}}</div>
            </q-card-section>
            <q-card-section class="q-pa-none q-ma-none">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <q-card-section class="q-py-none ">
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Fecha :</q-item-label>
                                        <q-item-label>{{data.schedule.day.day_date}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Aula :</q-item-label>
                                        <q-item-label>{{data.schedule.classroom.name}}</q-item-label>
                                    </q-item-section>
                                </q-item>

                            </q-list>
                        </q-card-section>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <q-card-section class="q-py-none ">
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Docente</q-item-label>
                                        <q-item-label>{{data.schedule.teacher.name+' '+data.schedule.teacher.lastname}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>N° Estudiantes</q-item-label>
                                        <q-item-label>{{data.schedule.assigned+' de '+data.schedule.number_student}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </div>
                </div>
                <div class="row">
                   <div class="col-md-12 col-sm-12 col-xs-12">
                      <q-card-section class="q-py-none ">
                        <q-item>
                            <q-item-section>
                                <q-item-label caption>Lección</q-item-label>
                                <q-item-label v-if="data.schedule.lesson">{{data.schedule.lesson.name}}</q-item-label>
                                <q-item-label v-else>
                                      <q-select
                                        dense
                                        v-model="data.lesson_id"
                                        :options="data.options"
                                        label="Seleccionar la lección "
                                        emit-value
                                        map-options
                                        clearable rounded
                                        @filter="handleFilter"
                                        use-input
                                        input-debounce="0"
                                    >
                                    <template v-slot:prepend>
                                            <q-icon name="eva-bookmark-outline" />
                                        </template>
                                    </q-select>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                      </q-card-section>
                   </div>
                    <div class="col-md-12 col-sm-12 col-xs-12" v-if="data.schedule.used">
                      <q-card-section class="q-py-none" align="center">
                        <q-item>
                            <q-item-section>
                                <q-item-label caption></q-item-label>
                                <q-item-label>
                                  <q-chip color="green-14" text-color="white">
                                    Tienes una reserva en esta clase
                                  </q-chip>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                      </q-card-section>
                   </div>
                      <div class="col-md-12 col-sm-12 col-xs-12" v-if="parseInt(data.schedule.number_student)===parseInt(data.schedule.assigned)">
                   <div v-if="data.schedule.used===0">
                      <q-card-section class="q-py-none" align="center">
                        <q-item>
                            <q-item-section>
                                <q-item-label caption></q-item-label>
                                <q-item-label>
                                  <q-chip color="primary" text-color="white">
                                    No hay cupos para esta leccón
                                  </q-chip>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                      </q-card-section>
                   </div>
                   </div>

                </div>
            </q-card-section>
            <q-card-actions align="center" class="text-teal q-pt-none">
                <q-btn flat v-close-popup>
                    Cerrar
                </q-btn>
                <template v-if="data.schedule.valid">
                  <template v-if="parseInt(data.schedule.number_student)!==parseInt(data.schedule.assigned)">
                    <q-btn  v-if="!data.schedule.used" @click="handleStoreAssignment" icon="eva-checkmark-circle-outline" color="green-14" label="Reservar" />
                  </template>
                </template>
            </q-card-actions>
        </q-card>
    </q-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        schedules: [],
        schedule: {
          day: [],
          classroom: [],
          time: [],
          teacher: []
        },
        lessons: [],
        options: [],
        lesson_id: null
      },
      show: {
        schedule: false
      },
      errors: 0
    }
  },
  mounted () {
    this.handleGetDays()
    this.handleGetLessons()
  },
  methods: {
    handleGetDays () {
      var url = '/student/get/schedule'
      this.$axios.post(url, {
        day_id: this.$route.params.day.id,
        student_id: this.$auth.user().user.id
      }).then(response => {
        this.data.schedules = response.data
      })
    },
    handleShowSchedule (item) {
      this.show.schedule = true
      this.data.schedule = item
    },
    handleGetLessons () {
      var url = '/student/get/lessons'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.data.lessons.push({ value: element.id, label: element.name })
        })
      })
    },
    handleFilter (val, update) {
      if (val === '') {
        update(() => {
          this.data.options = this.data.lessons
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.data.options = this.data.lessons.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    handleStoreAssignment () {
      if (this.data.schedule.lesson !== null) {
        this.handleStore()
      } else {
        if (this.data.lesson_id === null) {
          this.$q.notify({
            message: 'Selecciona un lección para la reserva',
            color: 'red'
          })
        } else {
          this.handleStore()
        }
      }
    },
    handleStore () {
      var url = '/student/get/assignment'
      this.$axios.post(url, {
        'schedule_id': this.data.schedule.id,
        'student_id': this.$auth.user().user.id,
        'lesson_id': this.data.lesson_id
      }).then(response => {
        this.show.schedule = false
        this.data.lesson_id = null
        if (response.data === 1) {
          this.$q.notify({
            message: 'No hay cupos disponibles para la lección',
            color: 'red'
          })
        } else {
          if (response.data === 2) {
            this.$q.notify({
              message: 'El horario ya tiene una lección',
              color: 'red'
            })
          } else {
            if (response.data === 3) {
              this.$q.notify({
                message: 'No hay cupos disponibles para la lección y el horario ya tiene una lección',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Tu reserva fue realizada',
                color: 'positive'
              })
            }
          }
        }
        this.handleGetDays()
      })
    }
  }
}
</script>
<style lang="css">
.theme-color{
  background: #44668e !important;
}
</style>
