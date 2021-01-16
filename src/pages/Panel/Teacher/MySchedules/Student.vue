<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Dias" icon="eva-grid-outline" :to="{name:'myschedules.days'}" />
            <q-breadcrumbs-el label="Horarios" icon="eva-grid-outline" :to="{name:'myschedules.schedule', params: {day: $route.params.day}}"/>
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
                                <q-item-label class="text-white" caption>Fecha</q-item-label>
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
                                <q-item-label class="text-white">{{data.schedule.lesson_id?data.schedule.lesson.name:'No Asignado'}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                     <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label class="text-white" caption>Nº Estudiantes</q-item-label>
                                <q-item-label class="text-white">{{data.schedule.assigned+' de '+data.schedule.number_student}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                    <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center" >
                            <q-item-section>
                                <q-item-label class="text-white" >Link</q-item-label>
                                <q-item-label class="text-white" >Zoom</q-item-label>
                            </q-item-section>
                            <q-menu v-model="show.link_zoom">
                            <q-list dense style="min-width: 100px">
                              <q-item clickable @click="handleOpenLink(data.schedule.link_zoom)">
                                <q-item-section caption>Ir al Link</q-item-section>
                              </q-item>
                              <q-item clickable @click="handleAddLinkZoom()">
                                <q-item-section caption>Añadir o Editar Link</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-card>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
    <div class="q-px-md q-pb-md">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <q-card>
            <q-list bordered padding class="rounded-borders">
              <div class="row">
                <div class="col-sm-6 col-xs-12 col-md-6 text-center">
                  Materiales
                </div>
                <div class="col-sm-6 col-xs-12 col-md-6 text-center">
                  <q-btn v-if="!data.schedule.material_id" @click="dialog.material=true" color="primary" size="sm" label="Añadir Lista de Material" />
                  <q-btn v-if="data.schedule.material_id" @click="handleDeleteMaterials()   " color="red" size="sm" label="Eliminar Lista de Material" />
                </div>
              </div>
              <div v-if="data.schedule.material">
              <q-item v-ripple v-for="(item,index) in data.schedule.material.links" :key="index">
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="las la-link" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{index+1 +'.- '+ item.title}}</q-item-label>
                  <q-item-label caption>{{item.created_at}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn type="a" :href="item.link" target="_blank" dense round flat color="primary" icon="las la-external-link-alt"></q-btn>
                </q-item-section>
              </q-item>
               <q-item  v-ripple  v-for="item in data.schedule.material.files" :key="item.id">
                  <q-item-section avatar top>
                    <q-avatar rounded >
                        <img :src="require('../../../../statics/images/modules/teacher/materials/'+handleIconFile(item.type))">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="1">{{item.name}}</q-item-label>
                    <q-item-label caption>{{item.created_at}}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge outline align="middle" color="teal">
                      {{item.type}}
                    </q-badge>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn @click="handleShowFile(item)" dense round flat color="primary" icon="eva-search-outline">
                        <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                        Ver archivo
                      </q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-card>
          <q-dialog v-model="dialog.material">
            <q-card style="width: 300px" class="q-px-sm q-pb-md q-ma-sm">
              <q-card-section>
                <div class="text-h6">Añadir Material</div>
              </q-card-section>
                <q-select
                    dense
                    v-model="data.assignament_material.material_id"
                    :options="data.materials"
                    label="Seleccione un Material"
                    emit-value
                    map-options
                    clearable rounded
                >
                  <template v-slot:prepend>
                        <q-icon name="eva-copy-outline" />
                    </template>
                </q-select>
              <div  class="q-pt-md" align="center">
                <q-btn v-close-popup  color="primary" size="md" flat  label="cancelar" />
                <q-btn @click="handleStoreMaterial()" color="primary" size="md" label="Guardar" />
              </div>
            </q-card>
          </q-dialog>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
         <q-card>
            <q-list bordered padding class="rounded-borders">
              <div class="row">
                <div class="col-sm-6 col-xs-12 col-md-6 text-center">
                  Cuestionarios
                </div>
                <div class="col-sm-6 col-xs-12 col-md-6 text-center">
                  <q-btn @click="dialog.questionnaire=true" color="primary" size="sm" label="Añadir Cuestionario" />
                </div>
              </div>

              <q-item clickable v-ripple v-for="(item,index) in data.schedule.questionnaires" :key="index">
                <q-item-section avatar top>
                  <q-avatar icon="eva-file-text-outline" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{item.questionnaire.title}}</q-item-label>
                  <q-item-label caption>{{item.questionnaire.description}}</q-item-label>
                </q-item-section>

                <q-item-section side v-if="item.status==='disable'">
                  <q-btn @click="handleStateQuestionnaire(item)" dense rounded size="sm" color="red" label="Deshabilitado">
                      <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                        Los estudiantes no pueden ver el cuestionario
                      </q-tooltip>
                  </q-btn>
                </q-item-section>
                <q-item-section side v-if="item.status==='enable'">
                  <q-btn @click="handleStateQuestionnaire(item)" dense rounded size="sm" color="green" label="Habilitado">
                      <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                        Los estudiantes pueden ver el cuestionario
                      </q-tooltip>
                  </q-btn>
                </q-item-section>
                <q-item-section side>
                  <q-btn @click="handleShowQuestionnaire(item.questionnaire)" dense round flat color="primary" icon="eva-search-outline">
                      <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                        Ver Cuestionario
                      </q-tooltip>
                  </q-btn>
                </q-item-section>
                <q-item-section side>
                  <q-btn dense round flat color="red" icon="las la-trash-alt" @click="handleDeleteQuestionnaire(item)">
                      <q-tooltip content-class="bg-red" :offset="[10, 10]">
                      Eliminar Cuestionario del Horario
                    </q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
          <q-dialog v-model="dialog.questionnaire">
            <q-card style="width: 300px" class="q-px-sm q-pb-md q-ma-sm">
              <q-card-section>
                <div class="text-h6">Añadir Cuestionarios</div>
              </q-card-section>
                <q-select
                    dense
                    v-model="data.assignament_questionnaire.questionnaire_id"
                    :options="data.questionnaires"
                    label="Seleccione un Cuestionario"
                    emit-value
                    map-options
                    clearable rounded
                >
                  <template v-slot:prepend>
                        <q-icon name="eva-copy-outline" />
                    </template>
                </q-select>
              <div  class="q-pt-md" align="center">
                <q-btn v-close-popup  color="primary" size="md" flat  label="cancelar" />
                <q-btn @click="handleStoreQuestionnaire()" color="primary" size="md" label="Guardar" />
              </div>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
    <div class="q-px-md">
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
                  <q-btn dense round flat color="primary" @click="handleGetTasks(props.row)" icon="eva-file-text-outline">
                    <q-tooltip content-class="bg-primary" :offset="[10, 10]">
                      Tareas
                    </q-tooltip>
                  </q-btn>
                  <q-btn dense round flat color="green" @click="handleShowDetailStudent(props)" icon="las la-plus-circle">
                    <q-tooltip content-class="bg-green" :offset="[10, 10]">
                      Ver OK Card
                    </q-tooltip>
                  </q-btn>
                  <template v-if="!props.row.absent">
                      <template v-if="!props.row.skills_id">
                          <q-btn dense round flat color="primary" @click="handleShowSkill(props)" icon="las la-check-circle">
                            <q-tooltip content-class="bg-primary" :offset="[10, 10]">
                              Calificar Clase
                            </q-tooltip>
                          </q-btn>
                      </template>
                  </template>
                  <template v-if="!props.row.absent">
                      <template v-if="!props.row.skills_id">
                          <q-btn dense round flat color="red" @click="handleStoreStudentAbsent(props)" icon="las la-times-circle">
                            <q-tooltip content-class="bg-red" :offset="[10, 10]">
                              Establecer Falta
                            </q-tooltip>
                          </q-btn>
                      </template>
                  </template>
              </q-td>
          </template>
      </q-table>
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

    <q-dialog v-model="dialog.tasks">
      <q-card style="width: 310px">
        <q-card-section class="theme-color text-white" align="center">
            <div class="text-subtitle2">Tareas del Estudiante {{this.data.student.name+' '+this.data.student.lastname}}</div>
        </q-card-section>
        <q-card-section class="q-py-none ">
          <div class="row">
            <div class="col-12">
              <q-item  v-ripple  v-for="(item,index) in data.tasks" :key="index">
                <q-item-section avatar top>
                  <q-avatar rounded >
                      <img :src="require('../../../../statics/images/modules/teacher/materials/'+handleIconFile(GetFileExtension(item.file_name)))">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">{{(1+index)+'.- '+ item.description}}</q-item-label>
                  <q-item-label caption>{{item.created_at}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge outline align="middle" color="teal">
                    {{GetFileExtension(item.file_name)}}
                  </q-badge>
                </q-item-section>
                <q-item-section side>
                  <q-btn @click="handleShowTask(item)" dense round flat color="primary" icon="eva-search-outline">
                      <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                      Ver archivo
                    </q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="Cancelar" v-close-popup class="text-grey-8"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialog.doc"
      persistent
      full-width
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="text-white" style="background-color:#44658e;">
         <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold"></span> Material Ok Aprende Ingles </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
         <q-card-section style="height: 80vh" class="scroll">
            <VueDocPreview :value="this.src" type="office" height="100%"/>
          </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialog.pdf"
      persistent
      full-width
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="text-white" style="background-color:#44658e;">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold"></span> Material Ok Aprende Ingles </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section style="height: 80vh" class="scroll">
          <q-pdfviewer
              v-model="dialog.pdf"
              :src="this.src"
              type="html5"
              content-style="height: 100%"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <viewer :images="[this.src]" class="viewer" ref="viewer" @inited="inited">
      <img :src="this.src" class="image">
    </viewer>
    <q-dialog
      v-model="dialog.audio"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="text-white" style="background-color:#44658e;">
         <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold"></span> Material Ok Aprende Ingles </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section style="height: 20vh" class="scroll">
            <q-media-player
              type="audio"
              :sources="[{src:this.src,type:'audio/mp3'}]"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialog.video"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="text-white" style="background-color:#44658e" >
         <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold"></span> Material Ok Aprende Ingles </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section  class="scroll">
            <q-media-player
              type="video"
              :sources="[{src:this.src,type:'audio/mp4'}]"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
</div>
</template>
<script>
import { openURL } from 'quasar'
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
        student: [],
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
        schedule: [],
        lessons: [],
        materials: [],
        questionnaires: [],
        assignament_questionnaire: {
          schedule_id: null,
          questionnaire_id: null
        },
        assignament_material: {
          material_id: null,
          schedule_id: null
        }
      },
      src: null,
      show: {
        skill: false,
        link_zoom: false
      },
      search: null,
      dialog: {
        material: false,
        doc: false,
        pdf: false,
        audio: false,
        video: false,
        questionnaire: false,
        tasks: false
      }
    }
  },
  mounted () {
    this.data.schedule = this.$route.params.schedule
    this.handleGetStudents()
    this.handleGetSkills()
    this.handleGetDetailLessons()
    this.handleGetMaterials()
    this.handleGetQuestionnaires()
  },
  methods: {
    handleShowTask (item) {
      this.src = null
      this.src = this.$values.api + 'app/tasks/' + item.file_name
      this.dialog.tasks = false
      switch (this.GetFileExtension(item.file_name)) {
        case 'mp4':
          this.dialog.video = true
          break
        case 'mp3':
          this.dialog.audio = true
          break
        case 'pdf':
          this.dialog.pdf = true
          break
        case 'pptx':
        case 'pptm':
        case 'ppt':
        case 'xlsx':
        case 'xlsm':
        case 'xlsb':
        case 'xltx':
        case 'docx':
        case 'docm':
        case 'dotx':
        case 'dtm':
          this.dialog.doc = true
          break
        case 'jpeg':
        case 'jpg':
        case 'gif':
        case 'raw':
        case 'bmp':
        case 'png':
          this.$viewer.show()
          this.dialog.show = false
          break
        default:
          this.$q.notify({
            color: 'warning',
            icon: 'announcement',
            message: 'No se puede abrir el archivo'
          })
          break
      }
    },
    GetFileExtension (filename) {
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined
    },
    handleGetTasks (data) {
      this.data.student = data.student
      var url = '/student/post/myclass/task'
      this.$axios.post(url, {
        student_id: data.student.id,
        schedule_id: this.$route.params.schedule.id
      }).then(response => {
        this.data.tasks = response.data
        this.dialog.tasks = true
      })
    },
    inited (viewer) {
      this.$viewer = viewer
    },
    handleShowFile (item) {
      this.src = null
      this.src = this.$values.api + 'app/materials/' + item.location
      switch (item.type) {
        case 'mp4':
          this.dialog.video = true
          break
        case 'mp3':
          this.dialog.audio = true
          break
        case 'pdf':
          this.dialog.pdf = true
          break
        case 'pptx':
        case 'pptm':
        case 'ppt':
        case 'xlsx':
        case 'xlsm':
        case 'xlsb':
        case 'xltx':
        case 'docx':
        case 'docm':
        case 'dotx':
        case 'dtm':
          this.dialog.doc = true
          break
        case 'jpeg':
        case 'jpg':
        case 'gif':
        case 'raw':
        case 'bmp':
        case 'png':
          this.$viewer.show()
          this.dialog.show = false
          break
        default:
          this.$q.notify({
            color: 'warning',
            icon: 'announcement',
            message: 'No se puede abrir el archivo'
          })
          break
      }
    },
    handleIconFile (type) {
      var value = null
      switch (type) {
        case 'png':
          value = 'png.png'
          break
        case 'jpeg':
        case 'jpg':
        case 'gif':
        case 'raw':
        case 'bmp':
          value = 'jpg.png'
          break
        case 'docx':
        case 'docm':
        case 'dotx':
        case 'dtm':
          value = 'doc.png'
          break
        case 'xlsx':
        case 'xlsm':
        case 'xlsb':
        case 'xltx':
          value = 'xls.png'
          break
        case 'pptx':
        case 'pptm':
        case 'ppt':
          value = 'ppt.png'
          break
        case 'pdf':
          value = 'pdf.png'
          break
        case 'mp4':
          value = 'mp4.png'
          break
        case 'avi':
          value = 'avi.png'
          break
        case 'txt':
          value = 'txt.png'
          break
        case 'zip':
        case 'rar':
          value = 'zip.png'
          break
        case 'mp3':
          value = 'mp3.png'
          break
        default:
          value = 'file.png'
          break
      }
      return value
    },
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
        name: 'myschedules.detail',
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
    },
    handleAddLinkZoom () {
      this.$q.dialog({
        title: 'Link Zoom',
        message: 'Añadir Link de Zoom',
        prompt: {
          model: '',
          isValid: val => val.length > 0, // << here is the magic
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        var url = '/teacher/store/link_zoom'
        this.$axios.post(url, {
          schedule: this.data.schedule,
          link: data
        }).then(response => {
          this.data.schedule = response.data
        })
      })
    },
    handleOpenLink ($url) {
      openURL($url)
    },
    handleStoreMaterial () {
      this.data.assignament_material.schedule_id = this.data.schedule.id
      var url = '/teacher/store/material'
      this.$axios.post(url, this.data.assignament_material).then(response => {
        this.data.schedule = response.data
        this.dialog.material = false
      })
    },
    handleStoreQuestionnaire () {
      this.data.assignament_questionnaire.schedule_id = this.data.schedule.id
      var url = '/teacher/store/questionnaire'
      this.$axios.post(url, this.data.assignament_questionnaire).then(response => {
        this.data.schedule = response.data
        this.dialog.questionnaire = false
      })
    },
    handleGetMaterials () {
      var url = '/teacher/get/materials'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.data.materials.push({ value: element.id, label: element.title })
        })
      })
    },
    handleGetQuestionnaires () {
      var url = '/teacher/get/questionnaires'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.data.questionnaires.push({ value: element.id, label: element.title })
        })
      })
    },
    handleDeleteMaterials () {
      this.$q.dialog({
        title: 'Eliminar Material',
        message: '¿Esta seguro de eliminar la lista de Materiales ?',
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
        this.data.assignament_material.schedule_id = this.data.schedule.id
        var url = '/teacher/delete/material'
        this.$axios.post(url, this.data.assignament_material).then(response => {
          this.data.schedule = response.data
        })
      })
    },
    handleShowQuestionnaire (questionnaire) {
      this.$router.push({
        name: 'myschedules.preview',
        params: {
          day: this.$route.params.day,
          schedule: this.$route.params.schedule,
          questionnaire: questionnaire
        }
      })
    },
    handleDeleteQuestionnaire (assignamentquestionnaire) {
      this.$q.dialog({
        title: 'Eliminar Cuestionario',
        message: '¿Esta seguro de eliminar el Cuestionario ?',
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
        var url = '/teacher/delete/questionnaire'
        this.$axios.post(url, assignamentquestionnaire).then(response => {
          this.data.schedule = response.data
        })
      })
    },
    handleStateQuestionnaire (assignamentquestionnaire) {
      this.$q.dialog({
        title: 'Cambiar Estado',
        message: '¿Esta seguro de cambiar el estado del Cuestionario ?',
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
        var url = '/teacher/update/questionnaire/status'
        this.$axios.post(url, assignamentquestionnaire).then(response => {
          this.data.schedule = response.data
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
.image {
    display: none;
}
</style>
