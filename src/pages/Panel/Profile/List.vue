<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Perfiles"/>
        </q-breadcrumbs>
    </div>
     <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
      <div v-if="show.profile">
        <div class="row q-pa-md">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <q-table :filter="search.profile" title="Sucursales" :data="data" :columns="columns.profile" row-key="name">
                    <template v-slot:top>
                        <div class="text-subtitle1">Perfiles</div>
                        <q-space />
                        <q-btn :to="{name:'profile.create'}" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
                        <q-space />
                        <q-input borderless dense v-model="search.profile" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="eva-search-outline" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <q-btn dense round flat color="orange" @click="handleAddModule(props)" icon="eva-plus-circle-outline"></q-btn>
                            <q-btn dense round flat color="primary" @click="handleEdit(props)" icon="eva-edit-outline"></q-btn>
                            <q-btn dense round flat color="red" @click="handleDelete(props)" icon="eva-trash-2-outline"></q-btn>
                        </q-td>
                    </template>
                </q-table>
            </div>
        </div>
        <div class="row q-px-md q-col-gutter-md " style="margin-bottom:80px;" >
            <div class="col-xs-12 col-sm-12 col-md-6" >
                <q-table :filter="search.modules" :data="modules" :columns="columns.module" row-key="name">
                    <template v-slot:top>
                        <div class="text-subtitle1">Modulos Asignados</div>
                        <q-space />
                        <q-input borderless dense v-model="search.modules" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="eva-search-outline" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:body-cell-create="props">
                        <q-td :props="props">
                            <div v-if="props.row.create=='1'">
                                <q-icon name="eva-checkmark-square-outline" size="sm" color="green" />
                            </div>
                            <div v-else>
                                <q-icon name="eva-close-square-outline" size="sm" color="red" />
                            </div>
                        </q-td>
                    </template>
                    <template v-slot:body-cell-edit="props">
                        <q-td :props="props">
                            <div v-if="props.row.edit=='1'">
                                <q-icon name="eva-checkmark-square-outline" size="sm" color="green" />
                            </div>
                            <div v-else>
                                <q-icon name="eva-close-square-outline" size="sm" color="red" />
                            </div>
                        </q-td>
                    </template>
                    <template v-slot:body-cell-delete="props">
                        <q-td :props="props">
                            <div v-if="props.row.delete=='1'">
                                <q-icon name="eva-checkmark-square-outline" size="sm" color="green" />
                            </div>
                            <div v-else>
                                <q-icon name="eva-close-square-outline" size="sm" color="red" />
                            </div>
                        </q-td>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <q-btn dense round flat color="red" @click="handleDeleteModule(props)" icon="eva-close-circle-outline"></q-btn>
                        </q-td>
                    </template>
                </q-table>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <q-table :filter="search.nomodules" :data="notmodules" :columns="columns.notmodule" row-key="name">
                    <template v-slot:top>
                        <div class="text-subtitle1">Modulos No Asignados</div>
                        <q-space />
                        <q-input borderless dense v-model="search.notmodules" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="eva-search-outline" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <q-btn dense round flat color="green" @click="handleCreateModule(props)" icon="eva-plus-circle-outline"></q-btn>
                        </q-td>
                    </template>
                </q-table>
            </div>
            <q-dialog v-model="moduleAdd" persistent transition-show="scale" transition-hide="scale">
                <q-card style="width: 350px">
                    <q-card-section>
                        <div class="text-h6">Añadir Modulo</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <div class="q-pa-md">
                            <div class="q-gutter-sm">
                                <q-checkbox v-model="module.create" label="Crear" color="teal" />
                                <q-checkbox v-model="module.edit" label="Editar" color="orange" />
                                <q-checkbox v-model="module.delete" label="Eliminar" color="red" />
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="Cancelar" v-close-popup />
                        <q-btn dense rounded label="Guardar" color="primary" @click="handleStoreModule(props)" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
      </div>
      <div v-else>
        <div class="row q-pa-md">
            <div class="col-xs-12 col-sm-12 col-md-12">
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
                <q-skeleton height="200px" animation="pulse" square />
              </q-card>
            </div>
        </div>
        <div class="row q-px-md q-col-gutter-md " style="margin-bottom:80px;" >
            <div class="col-xs-12 col-sm-12 col-md-6" >
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
                <q-skeleton height="150px" animation="pulse" square />
              </q-card>
            </div>
             <div class="col-xs-12 col-sm-12 col-md-6" >
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
                <q-skeleton height="150px" animation="pulse" square />
              </q-card>
            </div>
        </div>
      </div>
     </transition>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="handleReload()" fab icon="eva-refresh-outline" color="primary" />
    </q-page-sticky>
</div>
</template>

<script>
export default {
  data () {
    return {
      columns: {
        profile: [{
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
          label: 'Descripción',
          field: 'description',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Acciones',
          field: '',
          align: 'center'
        }
        ],
        module: [{
          name: 'index',
          label: '#',
          field: 'index'
        },
        {
          name: 'modulo',
          required: true,
          label: 'Nombre',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'create',
          align: 'center',
          label: 'Crear',
          sortable: true
        },
        {
          name: 'edit',
          align: 'center',
          label: 'Editar',
          sortable: true
        },
        {
          name: 'delete',
          align: 'center',
          label: 'Eliminar',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Acciones',
          field: '',
          align: 'center'
        }
        ],
        notmodule: [{
          name: 'index',
          label: '#',
          field: 'index'
        },
        {
          name: 'modulo',
          required: true,
          label: 'Nombre',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
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
      modules: [],
      notmodules: [],
      search: {
        profile: null,
        modules: null,
        notmodules: null
      },
      moduleAdd: false,
      module: {
        create: false,
        edit: false,
        delete: false,
        module_id: null,
        profile_id: null
      },
      show: {
        profile: false
      },
      number_process: 0
    }
  },
  watch: {
    number_process: function (newQuestion, oldQuestion) {
      if (this.number_process === 1) {
        this.show.profile = true
      } else {
        this.show.profile = false
      }
    }
  },
  mounted () {
    this.handleGetData()
  },
  methods: {
    handleDeleteModule (props) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar Modulo ?',
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
        var url = '/panel/profile/delete/module/' + props.row.id
        this.$axios.delete(url).then(reponse => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Modulo eliminado exitosamente !',
            icon: 'eva-checkmark-circle-2-outline',
            progress: true
          })
          this.HandleGetProfileModule(props.row.profile_id)
          this.HandleGetNotProfileModule(props.row.profile_id)
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleStoreModule () {
      var url = '/panel/profile/post/module'
      this.$axios.post(url, this.module).then(reponse => {
        this.HandleGetProfileModule(this.module.profile_id)
        this.HandleGetNotProfileModule(this.module.profile_id)
        this.moduleAdd = false
        this.$q.notify({
          color: 'positive',
          message: '¡ Modulo añadido exitosamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
        this.module.create = false
        this.module.edit = false
        this.module.delete = false
      })
    },
    handleCreateModule (props) {
      this.module.module_id = props.row.id
      this.moduleAdd = true
    },
    handleAddModule (props) {
      this.HandleGetProfileModule(props.row.id)
      this.HandleGetNotProfileModule(props.row.id)
      this.module.profile_id = props.row.id
    },
    HandleGetProfileModule (id) {
      var url = '/panel/profile/get/module/' + id
      this.$axios.get(url).then(response => {
        this.modules = response.data
        this.modules.forEach((row, index) => {
          row.index = index + 1
        })
        this.$q.notify({
          color: 'positive',
          message: '¡ Modulo asignados cargados correctamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
      })
    },
    HandleGetNotProfileModule (id) {
      var url = '/panel/profile/get/notmodule/' + id
      this.$axios.get(url).then(response => {
        this.notmodules = response.data
        this.notmodules.forEach((row, index) => {
          row.index = index + 1
        })
        this.$q.notify({
          color: 'positive',
          message: '¡ Modulo sin asignarse cargados correctamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
      })
    },
    handleGetData () {
      var url = '/panel/profile/index'
      this.$axios.get(url).then(response => {
        this.data = response.data
        this.data.forEach((row, index) => {
          row.index = index + 1
        })
        this.number_process++
      })
    },
    handleEdit (props) {
      this.$router.push({
        name: 'profile.edit',
        params: {
          data: props.row
        }
      })
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
        var url = '/panel/profile/delete/' + props.row.id
        this.$axios.delete(url).then(response => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Perfil eliminado exitosamente !',
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
    handleReload () {
      this.number_process = 0
      this.handleGetData()
    }
  }
}
</script>
