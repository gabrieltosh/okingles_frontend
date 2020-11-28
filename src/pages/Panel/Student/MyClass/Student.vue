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
        questionnaire: false
      }
    }
  },
  mounted () {
    this.data.schedule = this.$route.params.schedule
  },
  methods: {
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
