<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Horarios" icon="eva-grid-outline" :to="{name:'myclass.schedules'}"/>
            <q-breadcrumbs-el label="Detalle"   />
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
                                <q-item-label class="text-white">{{data.schedule.day?data.schedule.day.name:''}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                     <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label class="text-white" caption>Fecha</q-item-label>
                                <q-item-label class="text-white">{{data.schedule.day?data.schedule.day.day_date:''}}</q-item-label>
                            </q-item-section>
                        </q-card>
                    </div>
                     <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                        <q-card class="q-pa-sm theme-color" align="center">
                            <q-item-section>
                                <q-item-label class="text-white" caption>Hora</q-item-label>
                                <q-item-label class="text-white">{{data.schedule.time?data.schedule.time.name:''}}</q-item-label>
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
                        <q-card class="q-pa-sm theme-color" align="center" @click="handleOpenLink(data.schedule.link_zoom)">
                            <q-item-section>
                                <q-item-label class="text-white" >Link</q-item-label>
                                <q-item-label class="text-white" >Zoom</q-item-label>
                            </q-item-section>
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
                <div class="col-sm-12 col-xs-12 col-md-12 text-center">
                  Materiales
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
                    <q-item-label lines="1">{{'.- '+ item.name}}</q-item-label>
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
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
         <q-card>
            <q-list bordered padding class="rounded-borders">
              <div class="row">
                <div class="col-sm-12 col-xs-12 col-md-12 text-center">
                  Cuestionarios
                </div>
              </div>

              <q-item clickable v-ripple v-for="(item,index) in data.schedule.questionnaires.filter(element=>element.status==='enable')" :key="index">
                <q-item-section avatar top>
                  <q-avatar icon="eva-file-text-outline" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{item.questionnaire.title}}</q-item-label>
                  <q-item-label caption>{{item.questionnaire.description}}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn @click="handleShowQuestionnaire(item.questionnaire)" dense round flat color="primary" icon="eva-search-outline">
                      <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                        Ver Cuestionario
                      </q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-pt-md">
        <div class="col-sm-6 col-md-6 col-xs-12">
          <q-card class="my-card q-pa-md">
            <q-form
              @submit="handleValidTask"
              @reset="onReset"
              ref="Form"
              class="q-gutter-md"
            >
            <q-list >
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-sm text-bold text-center text-subtitle1">Enviar Tarea</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-sm text-bold">Descripcion : </q-item-label>
                  <q-input rounded dense v-model="data.task.description" label="Descripcion" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                    <template v-slot:prepend>
                        <q-icon name="eva-edit-2-outline" />
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-sm text-bold">Subir Archivo : </q-item-label>
                  <q-file rounded dense v-model="file" label="Elige un archivo">
                    <template v-slot:prepend>
                      <q-icon name="eva-attach-2-outline" />
                    </template>
                  </q-file>
                </q-item-section>
              </q-item>
            </q-list>
            <div class="text-center">
              <q-btn-group spread>
                <q-btn color="white" text-color="black" label="Cancelar" v-close-popup/>
                <q-btn label="Enviar" rounded type="submit" color="primary"/>
              </q-btn-group>
            </div>
            </q-form>
            <q-inner-loading :showing="loading.task">
              <q-spinner-puff
                color="primary"
                size="6em"
              />
            </q-inner-loading>
          </q-card>
        </div>
        <div class="col-sm-6 col-md-6 col-xs-12">
          <q-card class="my-card q-pa-md">
            <div class="row">
              <div class="col-sm-12 col-xs-12 col-md-12 text-center">
                Lista de Tareas
              </div>
            </div>
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
          </q-card>
        </div>
      </div>
    </div>
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
      visible: null,
      file: null,
      data: {
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
        },
        task: {
          description: null,
          file: null,
          file_name: null,
          user_id: null,
          schedule_id: null
        },
        tasks: []
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
        task: false
      },
      loading: {
        task: false
      }
    }
  },
  mounted () {
    this.data.schedule = this.$route.params.schedule
    this.handleGetTasks()
  },
  methods: {
    GetFileExtension (filename) {
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined
    },
    handleGetTasks () {
      var url = '/student/post/myclass/task'
      this.$axios.post(url, {
        student_id: this.$auth.user().user.id,
        schedule_id: this.data.schedule.id
      }).then(response => {
        this.data.tasks = response.data
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
    handleShowTask (item) {
      this.src = null
      this.src = this.$values.api + 'app/tasks/' + item.file_name
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
    handleOpenLink ($url) {
      openURL($url)
    },
    handleShowQuestionnaire (questionnaire) {
      this.$router.push({
        name: 'myclass.preview',
        params: {
          schedule: this.$route.params.schedule,
          questionnaire: questionnaire
        }
      })
    },
    handleStoreTask () {
      this.loading.task = true
      const fd = new FormData()
      fd.append('file', this.file)
      this.$axios.post(
        '/student/store/myclass/upload',
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(response => {
        this.data.task.file_name = response.data.file_name
        this.data.task.user_id = this.$auth.user().user.id
        this.data.task.schedule_id = this.data.schedule.id
        var url = '/student/store/myclass/task'
        this.$axios.post(url, this.data.task).then(response => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Archivo subido correctamente !',
            icon: 'eva-checkmark-circle-2-outline',
            progress: true
          })
          this.loading.task = false
          this.handleReset()
          this.$refs.Form.resetValidation()
        })
      })
    },
    handleReset () {
      this.data.task.file_name = null
      this.data.task.user_id = null
      this.data.task.schedule_id = null
      this.data.task.description = null
      this.file = null
    },
    handleValidTask () {
      this.handleStoreTask()
    },
    onReset () {

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
