<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Sucursales" icon="eva-map-outline" :to="{name:'week.branchoffice'}" />
            <q-breadcrumbs-el label="Semanas" icon="eva-map-outline" :to="{name:'week.list',params: {data:this.$route.params.branch}}" />
            <q-breadcrumbs-el label="Dias" icon="eva-map-outline" :to="{name: 'day.list',params: {day: this.$route.params.day,branch: this.$route.params.branch,week_id:this.$route.params.week_id}}" />
            <q-breadcrumbs-el label="Horarios" />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-6">
                        <div class="text-subtitle1">Horario dia {{this.$route.params.day.name}} {{this.$route.params.day.day_date}}</div>
                    </div>
                    <div class="col-6">
                        <q-btn class="float-right" @click="create = true" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
                    </div>
                </div>
            </q-card-section>
            <q-splitter v-model="splitterModel">
                <template v-slot:before>
                    <q-tabs vertical v-model="tab" class="text-teal">
                        <div v-for="item in data.classrooms" :key="item.id">
                            <q-tab :name="item.id" icon="eva-layers-outline" :label="item.name" />
                        </div>
                    </q-tabs>
                </template>
                <template v-slot:after>
                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel v-for="item in data.classrooms" :key="item.id" :name="item.id">
                            <div class="row q-pa-md q-col-gutter-md">
                              <div v-for="schedule in data.times" :key="schedule.id" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                                <q-card class="my-card">
                                  <q-img :src="$values.api+'images/modules/week/img-schedule.jpg'">
                                      <div class="absolute-bottom">
                                          <div class="text-subtitle2" align="center">{{schedule.time.name}}</div>
                                          <div v-if="schedule.lesson" class="text-subtitle2" align="center">{{schedule.lesson.name}}</div>
                                          <div v-if="schedule.teacher" class="text-subtitle2" align="center">{{schedule.teacher.name+' '+schedule.teacher.lastname}}</div>
                                      </div>
                                  </q-img>
                                  <q-card-actions align="center">
                                      <template v-if="schedule.valid">
                                        <q-btn v-if="!schedule.teacher_id" dense @click="handleEditSchedule(schedule)" round color="secondary" size="sm" icon="eva-plus-outline"></q-btn>
                                      </template>
                                      <q-btn v-if="schedule.assigned==0" dense @click="handleDeleteWeek(schedule)" round color="red" size="sm" icon="eva-trash-2-outline"></q-btn>
                                      <q-btn dense @click="handleGetStudent(schedule)" round color="primary" size="sm" icon="eva-list-outline"></q-btn>
                                  </q-card-actions>
                                </q-card>
                              </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
        </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="handleReload()" fab icon="eva-refresh-outline" color="primary" />
    </q-page-sticky>
    <q-dialog v-model="create">
        <q-card style="width: 220px">
            <q-card-section>
                <div class="text-h6">Elegir los horarios</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-pl-lg">
                <div>
                    <q-option-group v-model="data.store.time_id" :options="data.times_create" color="green" type="checkbox" />
                </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-teal">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn flat label="Crear" @click="handleStoreSchedule()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="update">
        <q-card style="width: 360px">
            <q-card-section>
                <div class="text-h6">Asignar Datos</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-pl-lg">
                <div class="row">
                    <div class="col-12">
                        <q-select dense v-model="data.assignment.teacher_id" :options="data.teachers" label="Elige un Docente" emit-value map-options clearable rounded>
                            <template v-slot:prepend>
                                <q-icon name="eva-person-outline" />
                            </template>
                        </q-select>
                        <br>
                    </div>
                    <div class="col-12">
                        <q-input type="number" rounded dense v-model="data.assignment.number_student" label="Cantidad de Estudiantes" lazy-rules :rules="[ val => val && val > 0 || 'El campo es requerido y ser mayor a cero']">
                            <template v-slot:prepend>
                                <q-icon name="eva-people-outline" />
                            </template>
                        </q-input>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-teal">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn flat label="Guardar" @click="handleUpdateSchedule()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="students">
        <q-card style="width: 350px">
            <q-card-section class="theme-color text-white" align="center">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" align="center">
                        <div class="text-h6">{{data.schedule.day.name}}</div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" align="center">
                        <template v-if="parseInt(data.schedule.number_student)!==parseInt(data.schedule.assigned)">
                            <q-btn v-if="data.schedule.valid" class="q-mt-xs" @click="handleAddStudent()" rounded color="green-14" size="sm" icon="las la-user-plus">&nbsp;Añadir Estudiante</q-btn>
                        </template>
                    </div>
                </div>
            </q-card-section>
            <q-card-section class="q-pa-none q-ma-none">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <q-card-section class="q-py-none ">
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Horario :</q-item-label>
                                        <q-item-label>{{data.schedule.time.name}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Docente</q-item-label>
                                        <q-item-label v-bind:class="[data.schedule.teacher?'text-black':'text-red']">{{data.schedule.teacher?data.schedule.teacher.name+' '+data.schedule.teacher.lastname:'No definido'}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Aula :</q-item-label>
                                        <q-item-label>{{data.schedule.classroom?data.schedule.classroom.name:'No definido'}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <q-card-section class="q-py-none ">
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Fecha :</q-item-label>
                                        <q-item-label>{{data.schedule.day?data.schedule.day.day_date:'No definido'}}</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>N° Estudiantes</q-item-label>
                                        <q-item-label v-bind:class="[data.schedule.number_student?'text-black':'text-red']">{{data.schedule.number_student?data.schedule.assigned+' de '+data.schedule.number_student:'No definido'}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label caption>Lección</q-item-label>
                                        <q-item-label v-bind:class="[data.schedule.lesson?'text-black':'text-red']">{{data.schedule.lesson?data.schedule.lesson.name:'No definido'}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </div>
                    <div v-if="data.schedule.valid">
                        <q-card-section class="q-py-none " v-if="!data.schedule.lesson">
                            <div class="row">
                                <div class="col-10">
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Elige la leccion</q-item-label>
                                            <q-item-label>
                                                <q-select dense v-model="data.lesson_id" :options="data.options" label="Seleccionar la lección " emit-value map-options clearable rounded @filter="handleFilter" use-input input-debounce="0">
                                                    <template v-slot:prepend>
                                                        <q-icon name="eva-bookmark-outline" />
                                                    </template>
                                                </q-select>
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col-2">
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption> &nbsp;</q-item-label>
                                            <q-item-label class="q-pt-sm">
                                                <q-btn dense @click="handleUpdateLesson()" round color="green-14" size="sm" icon="las la-check"></q-btn>
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </div>
                            </div>
                        </q-card-section>
                    </div>
                </div>
            </q-card-section>
            <q-list v-if="data.schedule.teacher_id" padding class="rounded-borders" style="max-width: 350px">
                <q-item-label align="center" header>Estudiantes con Reserva</q-item-label>

                <q-item clickable v-ripple v-for="item in data.assignments" :key="item.id">
                    <q-item-section avatar top>
                        <q-avatar icon="las la-user-check" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label lines="1">{{item.student.name+' '+item.student.lastname}}</q-item-label>
                        <q-item-label caption>{{item.student.phone}}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-btn v-if="data.schedule.valid" dense @click="handleRemoveStudent(item)" round color="red" size="sm" icon="eva-close-outline"></q-btn>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-card-actions align="center" class="bg-white text-teal">
                <q-btn flat label="Cerrar" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="addStudent">
        <q-card style="width: 310px">
            <q-card-section class="theme-color2 text-white" align="center">
                <div class="text-h6">Seleccionar Estudiante</div>
            </q-card-section>
            <q-card-section class="q-py-none ">
                <div class="row">
                    <div class="col-12">
                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    <q-select dense v-model="data.student_id" :options="data.optionsStudent" label="Seleccionar" emit-value map-options clearable rounded @filter="handleFilterStudent" use-input input-debounce="0">
                                        <template v-slot:prepend>
                                            <q-icon name="eva-bookmark-outline" />
                                        </template>
                                    </q-select>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-teal">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn @click="handleStoreStudent()" label="Añadir" color="primary" />
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
        classrooms: [],
        times: [],
        store: {
          time_id: [],
          day_id: null,
          classroom_id: null
        },
        times_create: [],
        teachers: [],
        assignment: {
          id: null,
          teacher_id: null,
          number_student: null
        },
        assignments: [],
        schedule: {
          day: [],
          classrooms: [],
          time: [],
          teacher: [],
          lesson: []
        },
        options: [],
        lesson_id: null,
        lessons: [],
        students: [],
        optionsStudent: [],
        student_id: null,
        time: []
      },
      create: false,
      update: false,
      students: false,
      addStudent: false,
      tab: null,
      splitterModel: 20,
      number_process: 0,
      show: {
        schedule: false
      }
    }
  },
  mounted () {
    this.handleGetClassroom()
    this.handleGetTeachers()
    this.handleGetLessons()
  },
  watch: {
    tab (newValue, oldValue) {
      this.data.times_create = []
      this.data.times = []
      this.handlePostTimes(newValue)
      this.handleGetTime(newValue)
    },
    number_process: function (newQuestion, oldQuestion) {
      if (this.number_process === 3) {
        this.show.schedule = true
      } else {
        this.show.schedule = false
      }
    }
  },
  methods: {
    handleUpdateSchedule () {
      var url = '/panel/schedule/update/schedule'
      this.$axios.post(url, this.data.assignment).then(response => {
        this.handlePostTimes(this.tab)
        this.update = false
        this.$q.notify({
          color: 'positive',
          message: '¡ Asignación realizada exitosamente !',
          timeout: 500,
          icon: 'eva-checkmark-circle-2-outline'
        })
      })
    },
    handleEditSchedule (schedule) {
      this.update = true
      this.data.assignment.id = schedule.id
    },
    handleGetTeachers () {
      var url = '/panel/schedule/get/teachers'
      this.$axios.post(url, {
        branch_office_id: this.$route.params.branch.id
      }).then(response => {
        response.data.forEach((element, index) => {
          this.data.teachers.push({
            value: element.id,
            label: element.name + ' ' + element.lastname
          })
        })
        this.number_process++
      })
    },
    handleGetClassroom () {
      var url = '/panel/schedule/get/classroom'
      this.$axios.get(url).then(response => {
        this.data.classrooms = response.data
        this.tab = this.data.classrooms[0].id
        this.number_process++
      })
    },
    handlePostTimes (id) {
      var url = '/panel/schedule/post/time'
      this.$axios.post(url, {
        classroom_id: id,
        day_id: this.$route.params.day.id
      }).then(response => {
        this.data.times = response.data
      })
    },
    handleStoreSchedule () {
      this.data.store.classroom_id = this.tab
      this.data.store.day_id = this.$route.params.day.id
      var url = '/panel/schedule/store/schedule'
      this.$axios.post(url, this.data.store).then(response => {
        this.data.times_create = []
        this.handlePostTimes(this.tab)
        this.handleGetTime(this.tab)
        this.data.store.time_id = []
        this.create = false
        this.$q.notify({
          color: 'positive',
          message: '¡ Horario creado exitosamente !',
          timeout: 500,
          icon: 'eva-checkmark-circle-2-outline'
        })
      })
    },
    handleGetTime (id) {
      this.data.times_create = []
      this.data.store.classroom_id = this.tab
      this.data.store.day_id = this.$route.params.day.id
      var url = '/panel/schedule/get/times'
      this.$axios.post(url, {
        classroom_id: id,
        day_id: this.$route.params.day.id
      }).then(response => {
        response.data.forEach((element, index) => {
          this.data.times_create.push({
            value: element.id,
            label: element.name
          })
        })
      })
    },
    handleDeleteWeek (schedule) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar el Horario ?',
        ok: {
          color: 'primary',
          label: 'Aceptar',
          rounded: true,
          size: 'sm'
        },
        cancel: {
          label: 'Cancelar',
          size: 'sm',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        var url = '/panel/schedule/delete/schedule/' + schedule.id
        this.$axios.delete(url).then(response => {
          this.handlePostTimes(this.tab)
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleGetStudent (schedule) {
      var url = '/panel/schedule/get/students/' + schedule.id
      this.data.time = schedule.time
      this.handleGetSchedule(schedule.id)
      this.$axios.get(url).then(response => {
        this.data.assignments = response.data
        this.students = true
        this.handlePostTimes(this.tab)
      })
    },
    handleGetSchedule (id) {
      var url = '/panel/schedule/get/schedule/' + id
      this.$axios.get(url).then(response => {
        this.data.schedule = response.data
      })
    },
    handleGetLessons () {
      var url = '/student/get/lessons'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.data.lessons.push({
            value: element.id,
            label: element.name
          })
          this.number_process++
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
    handleUpdateLesson () {
      var url = '/panel/schedule/update/lesson'
      this.$axios.post(url, {
        lesson_id: this.data.lesson_id,
        schedule_id: this.data.schedule.id
      }).then(response => {
        this.handlePostTimes(this.tab)
        this.students = false
        this.data.lesson_id = null
        this.$q.notify({
          color: 'positive',
          message: '¡ Lección asignada correctamente !',
          timeout: 500,
          icon: 'eva-checkmark-circle-2-outline'
        })
      })
    },
    handleRemoveStudent (item) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar la Reserva ?',
        ok: {
          color: 'primary',
          label: 'Aceptar',
          rounded: true,
          size: 'sm'
        },
        cancel: {
          label: 'Cancelar',
          size: 'sm',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        var url = '/panel/schedule/delete/student/' + item.id
        this.$axios.delete(url).then(response => {
          this.handleGetStudent(this.data.schedule)
          this.handleGetSchedule(this.data.schedule.id)
          this.$q.notify({
            color: 'positive',
            message: '¡ Reserva eliminada correctamente !',
            timeout: 500,
            icon: 'eva-checkmark-circle-2-outline'
          })
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleGetStudents () {
      this.data.students = []
      var url = '/panel/schedule/get/student/' + this.$route.params.branch.id
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.data.students.push({
            value: element.id,
            label: element.name + ' ' + element.lastname
          })
        })
      })
    },
    handleAddStudent () {
      this.handleGetStudents()
      this.addStudent = true
    },
    handleFilterStudent (val, update) {
      if (val === '') {
        update(() => {
          this.data.optionsStudent = this.data.students
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.data.optionsStudent = this.data.students.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    handleStoreStudent () {
      var url = '/panel/schedule/store/assignment'
      this.$axios.post(url, {
        schedule_id: this.data.schedule.id,
        student_id: this.data.student_id,
        time_id: this.data.time.id,
        day_id: this.$route.params.day.id
      }).then(response => {
        if (response.data === 1) {
          this.$q.notify({
            color: 'positive',
            message: '¡ Estudiante añadido correctamente !',
            timeout: 1000,
            icon: 'eva-checkmark-circle-2-outline'
          })
        } else {
          if (response.data === 2) {
            this.$q.notify({
              color: 'red',
              message: '¡ La clase esta al limite de estudiantes !',
              timeout: 1000,
              icon: 'eva-checkmark-circle-2-outline'
            })
          } else {
            this.$q.notify({
              color: 'red',
              message: '¡ El estudiante ya esta en una clase a esta hora!',
              timeout: 1000,
              icon: 'eva-checkmark-circle-2-outline'
            })
          }
        }
        this.addStudent = false
        this.handleGetStudent(this.data.schedule)
        this.handleGetSchedule(this.data.schedule.id)
        this.data.student_id = null
      })
    },
    handleReload () {
      this.number_process = 0
      this.handleGetClassroom()
      this.handleGetTeachers()
      this.handleGetLessons()
    }
  }
}
</script>

<style lang="css">
.theme-color {
    background: #44668e !important;
}
.theme-color2 {
    background: #5f7d8b !important;
}
</style>
