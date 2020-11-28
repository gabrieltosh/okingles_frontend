<template>
  <div>
     <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Horarios" />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-table :filter="search"  :data="data.materials" :columns="columns" row-key="title">
          <template v-slot:top>
              <div class="text-subtitle1">Lista de Materiales</div>
              <q-space />
              <q-btn @click="dialog.create = true" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
              <q-space />
              <q-input  borderless dense v-model="search" placeholder="Buscar"  >
                  <template v-slot:append>
                      <q-icon name="eva-search-outline" />
                  </template>
              </q-input>
          </template>
          <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                  <q-btn dense round flat color="primary" icon="las la-link" @click="handleShowLinks(props.row)">
                     <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                        Mostrar/Añadir Links
                      </q-tooltip>
                  </q-btn>
                  <q-btn dense round flat color="primary" icon="las la-file-medical" @click="handleShowFiles(props.row)">
                     <q-tooltip content-class="bg-blue" :offset="[10, 10]">
                        Mostrar/Añadir Archivos
                      </q-tooltip>
                  </q-btn>
                  <q-btn dense round flat color="red" icon="las la-trash-alt" @click="handleDeleteMaterial(props.row)">
                     <q-tooltip content-class="bg-red" :offset="[10, 10]">
                        Eliminar
                      </q-tooltip>
                  </q-btn>
              </q-td>
          </template>
      </q-table>
    </div>

    <q-dialog v-model="dialog.create">
      <q-card class="my-card" style="width: 450px">
            <q-form @submit="handleStoreMaterial" @reset="handleFormReset">
                <q-card-section>
                    <div class="text-h6">Crear Material</div>
                    <div class="row ">
                        <div class="col-xs-12 col-sm-12 col-md-12 q-py-md">
                            <q-input rounded dense v-model="data.material.title" label="Titulo" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                                <template v-slot:prepend>
                                    <q-icon name="eva-edit-2-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pb-md">
                            <q-input rounded dense v-model="data.material.description" label="Descripcion" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                            </q-input>
                        </div>
                    </div>
                    <div align="center">
                        <q-btn @click="dialog.create = false" label="Cancelar" type="reset" color="primary" flat />
                        <q-btn rounded label="Crear" type="submit" color="primary" />
                    </div>
                </q-card-section>
            </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.show">
      <q-card class="q-pa-md"  style="width: 400px">
         <div align="center" class="text-h6">{{data.selected.title}}</div>
         <br>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-card class="my-card" style="height:169px" >
              <div v-show="!loading.file">
                <q-form
                  @reset="handleResetInput()"
                  ref="FormFile"
                >
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 q-pt-md q-px-md">
                    <q-input rounded dense v-model="data.file.name" label="Nombre de Archivo" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                        <template v-slot:prepend>
                            <q-icon name="eva-edit-2-outline" />
                        </template>
                    </q-input>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 q-px-md q-pb-md">
                    <q-file size="sm" color="primary" clearable  rounded dense  v-model="data.image" label="Seleccionar Archivo">
                     <template v-slot:prepend>
                          <q-icon name="las la-cloud-upload-alt" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div align="center">
                  <q-btn @click="HandleStoreFile()" label="Cargar"  color="primary" flat />
                </div>
                </q-form>
              </div>
              <q-inner-loading :showing="loading.file">
                <q-spinner-cube color="blue" size="xl"/>
              </q-inner-loading>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm">
            <q-card class="my-card">
              <q-scroll-area style="height: 180px;">
                <q-list bordered padding class="rounded-borders">
                <q-item-label header align="center">Archivos</q-item-label>
                <div v-for="(item,index) in data.files" :key="index">
                  <q-item  v-ripple >
                    <q-item-section avatar top>
                      <q-avatar rounded >
                          <img :src="require('../../../../statics/images/modules/teacher/materials/'+handleIconFile(item.type))">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">{{index+1 +'.- '+ item.name}}</q-item-label>
                      <q-item-label caption>{{item.created_at}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-badge outline align="middle" color="teal">
                        {{item.type}}
                      </q-badge>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn @click="handleShowFile(item)" dense round flat color="primary" icon="las la-eye"></q-btn>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn @click="handleDeleteFile(item)" dense round flat color="red" icon="las la-trash-alt"></q-btn>
                    </q-item-section>
                  </q-item>
                </div>
                </q-list>
              </q-scroll-area>
            </q-card>
          </div>
        </div>
        <div align="center">
          <q-btn @click="handleCloseFiles()" label="Cerrar"  color="primary" flat />
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.link">
      <q-card class="q-pa-md"  style="width: 400px">
         <div align="center" class="text-h6">{{data.selected.title}}</div>
         <br>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-card class="my-card" style="height:175px" >
              <div v-show="!loading.file">
                <q-form
                  @submit="HandleStoreLink()"
                  @reset="handleResetLink()"
                  ref="FormLink"
                >
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 q-pt-md q-px-md">
                      <q-input rounded dense v-model="data.link.title" label="Nombre de Link" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                          <template v-slot:prepend>
                              <q-icon name="eva-edit-2-outline" />
                          </template>
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 q-px-md">
                      <q-input rounded dense v-model="data.link.link" label="Link" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                          <template v-slot:prepend>
                              <q-icon name="eva-edit-2-outline" />
                          </template>
                      </q-input>
                    </div>
                  </div>
                  <div align="center">
                    <q-btn type="submit" label="Cargar"  color="primary" flat />
                  </div>
                </q-form>
              </div>
              <q-inner-loading :showing="loading.link">
                <q-spinner-cube color="blue" size="xl"/>
              </q-inner-loading>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm">
            <q-card class="my-card">
              <q-scroll-area style="height: 180px;">
                <q-list bordered padding class="rounded-borders">
                <q-item-label header align="center">Archivos</q-item-label>
                <div v-for="(item,index) in data.links" :key="index">
                  <q-item v-ripple>
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
                    <q-item-section side>
                      <q-btn @click="handleDeleteLink(item)" dense round flat color="red" icon="las la-trash-alt"></q-btn>
                    </q-item-section>
                  </q-item>
                </div>

                </q-list>
              </q-scroll-area>
            </q-card>
          </div>
        </div>
        <div align="center">
          <q-btn  v-close-popup  label="Cerrar"  color="primary" flat />
        </div>
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
export default {
  data () {
    return {
      search: null,
      columns: [
        {
          name: 'index',
          label: '#',
          field: 'id'
        },
        {
          name: 'title',
          required: true,
          label: 'Titulo',
          align: 'center',
          field: row => row.title,
          format: val => `${val}`,
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
        materials: [],
        material: {
          title: null,
          description: null
        },
        link: {
          title: null,
          link: null
        },
        selected: [],
        image: null,
        file: {
          name: null,
          location: null,
          type: null,
          material_id: null
        },
        files: [],
        links: []
      },
      dialog: {
        create: false,
        show: false,
        pdf: false,
        doc: false,
        audio: false,
        video: false,
        link: false
      },
      loading: {
        file: false,
        link: false
      },
      src: null
    }
  },

  mounted () {
    this.handleGetMaterials()
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
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
    handleGetMaterials () {
      var url = '/panel/teacher/get/materials'
      this.$axios.get(url).then(response => {
        this.data.materials = response.data
      })
    },
    handleStoreMaterial () {
      var url = '/panel/teacher/store/material'
      this.$axios.post(url, this.data.material).then(response => {
        this.handleGetMaterials()
        this.dialog.create = false
      })
    },
    handleFormReset () {
      this.data.material.title = null
      this.data.material.description = null
    },
    handleShowFiles (row) {
      this.data.files = []
      this.data.selected = row
      this.dialog.show = true
      this.handleGetFiles()
    },
    handleShowLinks (row) {
      this.data.links = []
      this.data.selected = row
      this.dialog.link = true
      this.handleGetLinks()
    },
    HandleStoreFile (evt) {
      this.loading.file = true
      const fd = new FormData()
      fd.append('file', this.data.image)
      this.$axios.post(
        '/panel/teacher/store/material/upload',
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(response => {
        this.data.file.location = response.data.location
        this.data.file.type = response.data.type
        this.data.file.material_id = this.data.selected.id
        var url = '/panel/teacher/store/material/file'
        this.$axios.post(url, this.data.file).then(response => {
          this.$refs.FormFile.resetValidation()
          this.handleGetFiles(this.data.selected.id)
          this.handleResetInput()
          this.$q.notify({
            color: 'positive',
            message: '¡ Archivo subido correctamente !',
            icon: 'eva-checkmark-circle-2-outline',
            progress: true
          })
          this.loading.file = false
        })
      })
    },
    handleResetInput () {
      this.data.file.location = null
      this.data.file.type = null
      this.data.file.material_id = null
      this.data.file.name = null
      this.data.image = null
    },
    handleGetFiles () {
      var url = '/panel/teacher/get/material/file'
      this.$axios.post(url, { 'material_id': this.data.selected.id }).then(response => {
        this.data.files = response.data
      })
    },
    handleGetLinks () {
      var url = '/panel/teacher/get/material/link'
      this.$axios.post(url, { 'material_id': this.data.selected.id }).then(response => {
        this.data.links = response.data
      })
    },
    handleCloseFiles () {
      this.dialog.show = false
      this.data.files = []
    },
    handleDeleteFile (row) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar el Archivo ?',
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
        var url = '/panel/teacher/delete/material/file'
        this.$axios.post(url, row).then(response => {
          this.handleGetFiles(this.data.selected.id)
          this.$q.notify({
            color: 'positive',
            message: '¡ Archivo eliminado correctamente !',
            icon: 'eva-checkmark-circle-2-outline',
            progress: true
          })
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
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
    HandleStoreLink () {
      this.loading.link = true
      this.data.link.material_id = this.data.selected.id
      var url = '/panel/teacher/store/material/link'
      this.$axios.post(url, this.data.link).then(response => {
        this.handleGetLinks(this.data.selected.id)
        this.handleResetLink()
        this.$refs.FormLink.resetValidation()
        this.$q.notify({
          color: 'positive',
          message: '¡ Link creado correctamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
        this.loading.link = false
      })
    },
    handleResetLink () {
      this.data.link.material_id = null
      this.data.link.title = null
      this.data.link.link = null
    },
    handleDeleteLink (row) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar el Link ?',
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
        var url = '/panel/teacher/delete/material/link'
        this.$axios.post(url, row).then(response => {
          this.handleGetLinks(this.data.selected.id)
          this.$q.notify({
            color: 'positive',
            message: '¡ Archivo eliminado correctamente !',
            icon: 'eva-checkmark-circle-2-outline',
            progress: true
          })
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleDeleteMaterial (item) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar la Lista de Materiales ?',
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
        var url = '/panel/teacher/delete/material'
        this.$axios.post(url, item).then(response => {
          this.handleGetFiles()
        }).catch(error => {
          this.$q.notify({
            color: 'red',
            message: 'No se puede eliminar la lista',
            icon: 'las la-exclamation-circle',
            progress: true
          })
          console.log(error)
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style>
.image {
    display: none;
}
</style>
