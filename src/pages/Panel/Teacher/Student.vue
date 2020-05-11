<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Dias" icon="eva-grid-outline" :to="{name:'teacher.days'}" />
            <q-breadcrumbs-el label="Horarios" icon="eva-grid-outline" :to="{name:'teacher.schedule', params: {day: $route.params.day}}"/>
            <q-breadcrumbs-el label="Estudiantes"   />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="row q-pa-xs q-col-gutter-md justify-center">
                    <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label class="text-white" caption>Dia</q-item-label>
                                <q-item-label class="text-white">{{$route.params.day.name}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                     <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label  class="text-white" caption>Fecha</q-item-label>
                                <q-item-label class="text-white">{{$route.params.day.day_date}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                     <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label class="text-white" caption>Hora</q-item-label>
                                <q-item-label class="text-white">{{$route.params.schedule.time.name}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                    <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label class="text-white" caption>Lección</q-item-label>
                                <q-item-label class="text-white">{{$route.params.schedule.lesson_id?$route.params.schedule.lesson.name:'No Asignado'}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                     <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label class="text-white" caption>Nº Estudiantes</q-item-label>
                                <q-item-label class="text-white">{{$route.params.schedule.assigned+' de '+$route.params.schedule.number_student}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                </div>
            </q-card-section>
                <div class="row q-px-md q-pb-md q-col-gutter-md">
                     <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                         <q-table :filter="search" title="Lista de Estudiantes" :data="data.students" :columns="columns" row-key="name">
                            <template v-slot:top>
                                <div class="text-subtitle1">Lista de Estudiantes</div>
                                <q-space />
                                <q-input  borderless dense v-model="search" placeholder="Buscar"  >
                                    <template v-slot:append>
                                        <q-icon name="eva-search-outline" />
                                    </template>
                                </q-input>
                            </template>
                            <template v-slot:body-cell-skill="props">
                                <q-td :props="props">
                                    <template v-if="!props.row.absent">
                                        <q-chip size="12px" v-if="!props.row.skills_id"  color="primary" text-color="white" >
                                        Por Establecer
                                        </q-chip>
                                        <q-chip size="12px" v-else  color="orange-12" text-color="white" icon-right="eva-checkmark-square-outline">
                                        {{props.row.skill.name}}
                                        </q-chip>
                                    </template>
                                    <template v-else>
                                        <q-chip size="12px" color="red" text-color="white" >Ausente</q-chip>
                                    </template>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-percentage="props">
                                <q-td :props="props">
                                     <template v-if="!props.row.absent">
                                        <q-chip  size="12px" v-if="!props.row.percentage"  color="primary" text-color="white" >
                                        Por Establecer
                                        </q-chip>
                                        <q-chip  size="12px" v-else  color="orange-12" text-color="white" icon-right="eva-percent-outline">
                                        {{props.row.percentage}}
                                        </q-chip>
                                    </template>
                                      <template v-else>
                                        <q-chip size="12px" color="red" text-color="white" >Ausente</q-chip>
                                    </template>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-actions="props">
                                <q-td :props="props">
                                    <q-btn dense round flat color="green" @click="handleShowDetailStudent(props)" icon="las la-plus-circle"></q-btn>
                                    <template v-if="!props.row.absent">
                                        <template v-if="!props.row.skills_id">
                                            <q-btn dense round flat color="primary" @click="handleShowSkill(props)" icon="las la-check-circle"></q-btn>
                                        </template>
                                    </template>
                                    <template v-if="!props.row.absent">
                                        <template v-if="!props.row.skills_id">
                                            <q-btn dense round flat color="red" @click="handleStoreStudentAbsent(props)" icon="las la-times-circle"></q-btn>
                                        </template>
                                    </template>
                                </q-td>
                            </template>
                        </q-table>
                    </div>
                </div>
        </q-card>
    </div>
    <q-dialog v-model="show.skill">
        <q-card style="width: 310px">
            <q-card-section class="theme-color text-white" align="center">
                <div class="text-h6">Estudiante {{data.assignment_student.student.name+' '+data.assignment_student.student.lastname}}</div>
            </q-card-section>
            <q-card-section class="q-py-none ">
                <div class="row">
                    <div class="col-12">
                      <q-item>
                        <q-item-section>
                          <q-item-label>
                            <q-select
                                dense
                                v-model="data.store.detail_lesson_id"
                                :options="data.lessons"
                                label="Lección Especifica"
                                emit-value
                                map-options
                                clearable rounded
                            >
                              <template v-slot:prepend>
                                    <q-icon name="eva-people-outline" />
                                </template>
                            </q-select>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-12">
                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    <q-select dense v-model="data.store.skills_id" :options="data.skills" label="Seleccionar habilidad" emit-value map-options  clearable rounded >
                                        <template v-slot:prepend>
                                            <q-icon name="eva-bookmark-outline" />
                                        </template>
                                    </q-select>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                    <div class="col-12 q-pt-sm">
                        <q-item>
                             <q-item-section side>
                                <q-icon color="orange-12" name="eva-settings-2-outline" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                   <q-slider
                                        v-model="data.store.percentage"
                                        :min="0"
                                        :max="100"
                                        :step="5"
                                        label
                                        label-always
                                        color="orange-12"
                                         :label-value="data.store.percentage + ' %'"
                                        />
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-teal">
                <q-btn flat label="Cancelar" v-close-popup class="text-grey-8"/>
                <q-btn @click="handleStoreSkill()" label="Guardar" color="primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'index',
          label: '#',
          field: 'index'
        },
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'center',
          field: row => row.student.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'lastname',
          align: 'center',
          label: 'Apellido',
          field: row => row.student.lastname,
          sortable: true
        },
        {
          name: 'skill',
          align: 'center',
          label: 'Habilidad',
          field: 'status',
          sortable: true
        },
        {
          name: 'percentage',
          align: 'center',
          label: 'Porcentage',
          field: 'percentage',
          sortable: true
        },
        {
          name: 'created_at',
          align: 'center',
          label: 'Fecha de Reserva',
          field: 'created_at',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Acciones',
          field: '',
          align: 'center'
        }
      ],
      data: {
        students: [],
        skills: [],
        store: {
          skills_id: null,
          percentage: 0,
          assignment_student_id: null,
          detail_lesson_id: null
        },
        assignment_student: {
          student: [],
          schedule: [],
          skill: []
        },
        lessons: []
      },
      show: {
        skill: false
      },
      search: null
    }
  },
  mounted () {
    this.handleGetStudents()
    this.handleGetSkills()
    this.handleGetDetailLessons()
  },
  methods: {
    handleGetStudents () {
      var url = '/teacher/get/students/' + this.$route.params.schedule.id
      this.$axios.get(url).then(response => {
        this.data.students = response.data
        this.data.students.forEach((row, index) => {
          row.index = index + 1
        })
      })
    },
    handleStoreStudentAbsent (props) {
      this.$q.dialog({
        title: 'Confirmar Falta',
        message: '¿ El estudiante ' + props.row.student.name + ' ' + props.row.student.lastname + ' no estuvo presente en la clase ?',
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
        var url = '/teacher/store/student/absent/' + props.row.id
        this.$axios.get(url).then(response => {
          this.handleGetStudents()
          this.$q.notify({
            color: 'positive',
            message: '¡ Datos guardados exitosamente !',
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
    handleStoreSkill (props) {
      if (this.data.store.skills_id && this.data.store.percentage > 0) {
        var url = '/teacher/store/skill'
        this.$axios.post(url, this.data.store).then(response => {
          this.handleGetStudents()
          this.show.skill = false
          this.$q.notify({
            color: 'positive',
            message: '¡ Datos guardados exitosamente !',
            timeout: 500,
            icon: 'eva-checkmark-circle-2-outline'
          })
        })
      } else {
        this.$q.notify({
          color: 'red',
          message: '¡ Seleccione una habilidad y establesca el porcentaje !',
          timeout: 2000,
          icon: 'eva-close-circle-outline'
        })
      }
    },
    handleGetSkills () {
      var url = '/teacher/get/skills'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.data.skills.push({
            value: element.id,
            label: element.name
          })
        })
      })
    },
    handleShowSkill (props) {
      this.show.skill = true
      this.data.store.assignment_student_id = props.row.id
      this.data.assignment_student = props.row
    },
    handleShowDetailStudent (props) {
      this.$router.push({
        name: 'teacher.detail',
        params: {
          day: this.$route.params.day,
          schedule: this.$route.params.schedule,
          student: props.row.student
        }
      })
    },
    handleGetDetailLessons () {
      var url = '/teacher/get/lessons/' + this.$route.params.schedule.lesson_id
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.data.lessons.push({ value: element.id, label: element.name })
        })
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
