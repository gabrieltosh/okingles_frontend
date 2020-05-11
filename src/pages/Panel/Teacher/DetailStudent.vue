<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Dias" icon="eva-grid-outline" :to="{name:'teacher.days'}" />
            <q-breadcrumbs-el label="Horarios" icon="eva-grid-outline" :to="{name:'teacher.schedule', params: {day: $route.params.day}}"/>
            <q-breadcrumbs-el label="Estudiantes" icon="eva-grid-outline" :to="{name:'teacher.student', params: {day: $route.params.day,schedule:$route.params.schedule}}"/>
            <q-breadcrumbs-el label="Detalle Estudiante"   />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card >
            <q-card-section>
                <div class="row">
                    <div class="col-sm-3 col-xs-12 col-md-3">
                        <q-img style="height: 200px;" :src="$values.api+'app/uploads/'+$route.params.student.image" >
                            <div class="absolute-top text-subtitle2 text-center">
                            {{$route.params.student.name+' '+$route.params.student.lastname}}
                            </div>
                        </q-img>
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-12">
                        <div class="row">
                            <div class="col-sm-6 col-xs-12">
                                <div class="row">
                                    <div class="col-12 bg-blue-grey q-pa-xs" align="center">
                                        <div class="text-subtitle2 q-mb-xs text-white"><strong>Datos Personales</strong></div>
                                    </div>
                                    <div class="col-12">
                                        <q-scroll-area style="height: 160px;">
                                            <div class="row">
                                                <div class="col-sm-6 q-pa-xs  col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Cedula de Identidad</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.ci}}</div>
                                                </div>
                                                <div class="col-sm-6 q-pa-xs col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Cumpleaños</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.birthdate}}</div>
                                                </div>
                                                <div class="col-sm-6 q-pa-xs col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Ocupación</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.occupation}}</div>
                                                </div>
                                                <div class="col-sm-6 q-pa-xs col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Celular</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.phone}}</div>
                                                </div>
                                                <div class="col-sm-12 q-pa-xs col-xs-12 " align="center">
                                                    <div class="text-caption text-orange-9">Correo Electronico</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.email}}</div>
                                                </div>
                                                <div class="col-sm-12 q-pa-xs col-xs-12" align="center">
                                                    <div class="text-caption text-orange-9">Direccion</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.address}}</div>
                                                </div>
                                            </div>
                                        </q-scroll-area>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-xs-12">
                                <div class="row">
                                    <div class="col-12 bg-blue-grey q-pa-xs" align="center">
                                        <div class="text-subtitle2 q-mb-xs text-white"><strong>Datos Institucionales</strong></div>
                                    </div>
                                    <div class="col-12">
                                        <q-scroll-area style="height: 160px;">
                                            <div class="row">
                                                <div class="col-sm-6 col-xs-6 q-pa-xs" align="center">
                                                    <div class="text-caption text-orange-9">Estado</div>
                                                    <template v-if="$route.params.student.status">
                                                        <div class="text-subtitle2 q-mb-xs text-blue">Activo</div>
                                                    </template>
                                                    <template v-else>
                                                        <div class="text-subtitle2 q-mb-xs text-red">No activo</div>
                                                    </template>
                                                </div>
                                                <div class="col-sm-6 col-xs-6 q-pa-xs" align="center">
                                                    <div class="text-caption text-orange-9">Fecha de Registro</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.created_at}}</div>
                                                </div>
                                                <div class="col-sm-6 q-pa-xs  col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Fecha de Finalización</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.due_date}}</div>
                                                </div>
                                                <div class="col-sm-6 q-pa-xs col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Tipo</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.type}}</div>
                                                </div>
                                                <div class="col-sm-6 q-pa-xs col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Factura</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.invoice}}</div>
                                                </div>
                                                    <div class="col-sm-6 q-pa-xs col-xs-6 " align="center">
                                                    <div class="text-caption text-orange-9">Registro</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.registter}}</div>
                                                </div>
                                                <div class="col-sm-12 q-pa-xs col-xs-12 " align="center">
                                                    <div class="text-caption text-orange-9">Sucursal</div>
                                                    <div class="text-subtitle2 q-mb-xs">{{$route.params.student.branch_office.name}}</div>
                                                </div>
                                            </div>
                                        </q-scroll-area>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
           <div class="q-px-md q-pb-md">
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
                                <q-chip size="12px" v-if="!props.row.detail_lesson_id"  color="primary" text-color="white" >
                                Por Establecer
                                </q-chip>
                                <q-chip size="12px" v-else  color="orange-12" text-color="white" icon-right="eva-checkmark-square-outline">
                                {{props.row.lesson.name}}
                                </q-chip>
                            </template>
                            <template v-else>
                                <q-chip size="12px" color="red" text-color="white" >Ausente</q-chip>
                            </template>
                        </q-td>
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
                </q-table>
            </div>
        </q-card>
    </div>
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
    this.handleGetAssignmentsStudent()
  },
  methods: {
    handleGetAssignmentsStudent () {
      var url = '/teacher/get/student/detail/' + this.$route.params.student.id
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
