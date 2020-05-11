<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Grupos de Lecciones" icon="eva-map-outline"/>
            </q-breadcrumbs>
        </div>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="show.lesson">
            <div class="q-pa-md">
                <q-table :filter="search" title="Sucursales" :data="data" :columns="table.lesson" row-key="name">
                    <template v-slot:top>
                        <div class="text-subtitle1">Grupos de Lecciones</div>
                        <q-space />
                        <q-btn :to="{name:'lesson.create'}" size="sm" rounded icon="eva-plus" color="primary" label="Crear Grupo" />
                        <q-space />
                        <q-input  borderless dense v-model="search" placeholder="Buscar"  >
                            <template v-slot:append>
                                <q-icon name="eva-search-outline" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <q-btn dense round flat color="green" @click="handleShowDetail(props)" icon="eva-plus-circle-outline"></q-btn>
                            <q-btn dense round flat color="primary" @click="handleEdit(props)" icon="eva-edit-outline"></q-btn>
                            <q-btn dense round flat color="red" @click="handleDelete(props)" icon="eva-trash-2-outline"></q-btn>
                        </q-td>
                    </template>
                </q-table>
            </div>
          </div>
          <div v-else>
            <div class="q-pa-md">
              <q-card style="max-width: 100%">
                <div class="row  q-pa-md">
                  <div class="col-sm-4 col-xs-4" align="center">
                    <q-skeleton type="rect" animation="pulse" width="70%"/>
                  </div>
                  <div class="col-sm-4 col-xs-4" align="center">
                    <q-skeleton type="rect" animation="pulse" width="70%"/>
                  </div>
                  <div class="col-sm-4 col-xs-4" align="center">
                    <q-skeleton type="rect" animation="pulse" width="70%"/>
                  </div>
                  </div>
                <q-skeleton height="300px" animation="pulse" square />
              </q-card>
           </div>
          </div>
        </transition>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click="handleReload()" fab icon="eva-refresh-outline" color="primary" />
        </q-page-sticky>
        <q-dialog v-model="show.detail">
          <q-card style="width: 500px" class="q-px-sm q-pb-md">
            <q-table :filter="search" title="Sucursales" :data="lesson.detail" :columns="table.detail" row-key="name">
                <template v-slot:top>
                    <div class="text-subtitle1">Lecciones de {{lesson.name}}</div>
                    <q-space />
                    <q-btn @click="handleShowCreate()" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
                    <q-space />
                    <q-btn @click="show.detail=false" label="Cerrar" type="reset" color="white" text-color="black"  size="sm" rounded />
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense round flat color="red" @click="handleDeleteDetailLesson(props)" icon="eva-trash-2-outline"></q-btn>
                    </q-td>
                </template>
            </q-table>
          </q-card>
        </q-dialog>
        <q-dialog v-model="show.create">
          <q-card style="width: 350px" class="q-px-sm">
            <q-form @submit="handleStoreLesson" @reset="handleFormReset">
                <q-card-section>
                  <div class="text-subtitle1 text-primary">Crear Leccion</div>
                  <q-banner v-if="show.errors" transition-show="flip-up" dense rounded inline-actions class="text-white bg-red q-pa-xs q-ma-sm">
                  <template v-slot:avatar>
                      <lottie-animation :width="50" :height="50" path="statics/lottie/error-flat-style.json" />
                  </template>
                      <div transition-show="jump-down" v-for="error in errors.name" :key="error">
                          {{error}}
                      </div>
                  </q-banner>
                  <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 q-pa-sm">
                          <q-input rounded dense v-model="store.name" label="Nombre" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                      </div>
                  </div>
                  <div align="center">
                      <q-btn @click="show.create=false" label="Cancelar" type="reset" color="primary" flat />
                      <q-btn rounded label="Crear" type="submit" color="primary" />
                  </div>
              </q-card-section>
            </q-form>
          </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      show: {
        detail: false,
        create: false,
        lesson: false
      },
      table: {
        lesson:
        [
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
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'description',
            align: 'center',
            label: 'Descripcion',
            field: 'description',
            sortable: true
          },
          {
            name: 'created_at',
            align: 'center',
            label: 'Fecha de Crecion',
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
        detail: [
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
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'created_at',
            align: 'center',
            label: 'Fecha de Crecion',
            field: 'created_at',
            sortable: true
          },
          {
            name: 'actions',
            label: 'Acciones',
            field: '',
            align: 'center'
          }
        ]
      },
      data: [],
      lesson: {
        name: null,
        detail: {}
      },
      store: {
        name: null,
        lesson_id: null
      },
      search: null,
      errors: {},
      number_process: 0
    }
  },
  watch: {
    number_process: function (newQuestion, oldQuestion) {
      if (this.number_process === 1) {
        this.show.lesson = true
      } else {
        this.show.lesson = false
      }
    }
  },
  mounted () {
    this.handleGetData()
  },
  methods: {
    handleGetData () {
      var url = '/panel/lesson/get/lesson'
      this.$axios.get(url).then(response => {
        this.data = response.data
        this.data.forEach((row, index) => {
          row.index = index + 1
        })
        this.number_process++
      })
    },
    handleEdit (props) {
      this.$router.push({ name: 'lesson.edit', params: { data: props.row } })
    },
    handleDelete (props) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar el registro ?',
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
        var url = '/panel/lesson/delete/lesson/' + props.row.id
        this.$axios.delete(url).then(response => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Clase eliminada exitosamente !',
            timeout: 500,
            icon: 'eva-checkmark-circle-2-outline'
          })
          this.handleGetData()
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleShowDetail (props) {
      this.show.detail = true
      this.lesson = props.row
      this.lesson.detail.forEach((row, index) => {
        row.index = index + 1
      })
      this.store.lesson_id = props.row.id
    },
    handleShowCreate () {
      this.show.create = true
    },
    handleStoreLesson () {
      var url = '/panel/lesson/store/detail'
      this.$axios.post(url, this.store).then(response => {
        this.handleGetDetail()
        this.show.create = false
        this.$q.notify({
          color: 'positive',
          message: '¡ Leccion creada exitosamente !',
          timeout: 500,
          icon: 'eva-checkmark-circle-2-outline'
        })
      })
    },
    handleFormReset () {
      this.store.name = null
    },
    handleGetDetail () {
      var url = '/panel/lesson/get/detail/' + this.lesson.id
      this.$axios.get(url).then(response => {
        this.lesson.detail = response.data
        this.lesson.detail.forEach((row, index) => {
          row.index = index + 1
        })
      })
    },
    handleDeleteDetailLesson (props) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar la lección ?',
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
        var url = '/panel/lesson/delete/detail/' + props.row.id
        this.$axios.delete(url).then(response => {
          this.handleGetDetail()
          this.$q.notify({
            color: 'positive',
            message: '¡ Leccion eliminada exitosamente !',
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
    handleReload () {
      this.number_process = 0
      this.handleGetData()
    }
  }
}
</script>
