<template>
    <div>
        <q-scroll-area style="height: calc(100vh - 50px);" :thumb-style="thumbStyle">
            <div v-if="$auth.user().user.type === 'Estudiante'">
                <div class="q-pa-md">
                    <div class="row q-px-md q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                            <q-card class="my-card bg-mySkyBlue text-white">
                                <q-card-section>
                                    <div class="text-subtitle2 text-bold">Clases Cursadas</div>
                                    <div class="text-h5 text-right text-bold">{{$auth.user().user.taken}}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                            <q-card class="my-card bg-myOrange text-white">
                                <q-card-section>
                                    <div class="text-subtitle2 text-bold">Mejor Habilidad</div>
                                    <div class="text-h5 text-right text-bold">{{$auth.user().user.skill}}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                            <q-card class="my-card bg-myGreen text-white">
                                <q-card-section>
                                    <div class="text-subtitle2 text-bold">Porcentaje Promedio</div>
                                    <div class="text-h5 text-right text-bold">{{$auth.user().user.percentage}}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                            <q-card class="my-card bg-myRed text-white">
                                <q-card-section>
                                    <div class="text-subtitle2 text-bold">Numero de Faltas</div>
                                    <div class="text-h5 text-right text-bold">{{$auth.user().user.absent}}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                    <div class="row q-pa-md q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <q-card class="my-card text-white">
                                <q-img transition="rotate" :ratio="4/3" src="statics/images/modules/panel/events.png" width="100%" >
                                </q-img>
                            </q-card>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <q-card class="my-card bg-myYellow text-white">
                                <q-img transition="rotate" :ratio="4/3" src="statics/images/modules/panel/news.jpg" width="100%">
                                </q-img>
                            </q-card>
                        </div>
                    </div>
                    <div class="q-px-md">
                        <q-table :filter="search" :data="data.assignments" :columns="columns" row-key="name">
                            <template v-slot:top>
                                <div class="text-subtitle1">OK Card</div>
                                <q-space />
                                <q-input  borderless dense v-model="search" placeholder="Buscar"  >
                                    <template v-slot:append>
                                        <q-icon name="eva-search-outline" />
                                    </template>
                                </q-input>
                            </template>
                            <template v-slot:body-cell-lesson="props">
                                <q-td :props="props">
                                    <template v-if="!props.row.absent">
                                        <q-badge v-if="!props.row.detail_lesson_id"  color="primary" text-color="white" label="Por Establecer"/>
                                        <q-badge v-else color="orange-12" text-color="white" :label="props.row.lesson.name"/>
                                    </template>
                                    <template v-else>
                                        <q-badge color="red" text-color="white" label="Ausente"></q-badge>
                                    </template>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-skill="props">
                                <q-td :props="props">
                                    <template v-if="!props.row.absent">
                                        <q-badge v-if="!props.row.skills_id"  color="primary" text-color="white" label="Por Establecer"/>
                                        <q-badge v-else  color="orange-12" text-color="white" :label="props.row.skill.name"/>
                                    </template>
                                    <template v-else>
                                        <q-badge color="red" text-color="white" label="Ausente"/>
                                    </template>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-percentage="props">
                                <q-td :props="props">
                                        <template v-if="!props.row.absent">
                                            <q-badge v-if="!props.row.percentage"  color="primary" text-color="white" label="Por Establecer" />
                                            <q-badge  v-else  color="orange-12" text-color="white" :label="props.row.percentage"/>
                                    </template>
                                        <template v-else>
                                            <q-badge color="red" text-color="white" label="Ausente"/>
                                    </template>
                                </q-td>
                            </template>
                        </q-table>
                    </div>
                </div>
            </div>
            <div v-if="$auth.user().user.type === 'Docente'">
                <div class="q-pa-md">
                    <div class="row q-pa-md q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <q-card class="my-card text-white">
                                <q-img transition="rotate" :ratio="4/3" src="statics/images/modules/panel/events.png" width="100%" >
                                </q-img>
                            </q-card>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <q-card class="my-card bg-myYellow text-white">
                                <q-img transition="rotate" :ratio="4/3" src="statics/images/modules/panel/news.jpg" width="100%">
                                </q-img>
                            </q-card>
                        </div>
                    </div>
                </div>
            </div>
              <div v-if="$auth.user().user.type === 'Administrativo'">
                <div class="q-pa-md">
                    <div class="row q-pa-md q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <q-card class="my-card text-white">
                                <q-img transition="rotate" :ratio="4/3" src="statics/images/modules/panel/events.png" width="100%" >
                                </q-img>
                            </q-card>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <q-card class="my-card bg-myYellow text-white">
                                <q-img transition="rotate" :ratio="4/3" src="statics/images/modules/panel/news.jpg" width="100%">
                                </q-img>
                            </q-card>
                        </div>
                    </div>
                </div>
            </div>
        </q-scroll-area>
    </div>
</template>
<script>
export default {
  data () {
    return {
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '7px',
        opacity: 0.75
      },
      columns: [
        {
          name: 'index',
          label: '#',
          field: 'index'
        },
        {
          name: 'lesson',
          required: true,
          label: 'Lección',
          align: 'center',
          sortable: true
        },
        {
          name: 'session',
          required: true,
          label: 'Sesión',
          field: row => row.schedule.lesson.name,
          align: 'center',
          sortable: true
        },
        {
          name: 'date',
          align: 'center',
          label: 'Fecha',
          field: row => row.schedule.day.day_date,
          sortable: true
        },
        {
          name: 'schedule',
          align: 'center',
          label: 'Horario',
          field: row => row.schedule.time.name,
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
          name: 'teacher',
          align: 'center',
          label: 'Docente',
          field: row => row.schedule.teacher.name + ' ' + row.schedule.teacher.lastname,
          sortable: true
        },
        {
          name: 'created_at',
          align: 'center',
          label: 'Fecha de Reserva',
          field: 'created_at',
          sortable: true
        }
      ],
      data: {
        assignments: []
      },
      search: null
    }
  },
  mounted () {
    if (this.$auth.user().user.type === 'Estudiante') {
      this.handleGetAssignmentsStudent()
    }
  },
  methods: {
    handleGetAssignmentsStudent () {
      var url = '/teacher/get/student/detail/' + this.$auth.user().user.id
      this.$axios.get(url).then(response => {
        this.data.assignments = response.data
        this.data.assignments.forEach((row, index) => {
          row.index = index + 1
        })
      })
    }
  }
}
</script>
<style lang="css">
    .test {
        height: calc(100vh - 50px);
        background-size: cover;
    }
    .bg-myBlue{
        background-color: #0f4c81;
    }
    .bg-myOrange{
        background-color: #ffa372;
    }
    .bg-myRed{
        background-color: #ed6663;
    }
    .bg-myYellow{
        background-color: #f7f48b;
    }
    .bg-myGreen{
        background-color: #a1de93;
    }
    .bg-mySkyBlue{
        background-color: #70a1d7;
    }

</style>
