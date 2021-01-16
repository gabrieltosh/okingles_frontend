<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Docentes"/>
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
      <div v-if="!show.students">
        <q-table :filter="search.students" :data="data.students" :columns="columns" row-key="name">
          <template v-slot:top>
              <div class="text-subtitle1">Lista Docentes</div>
              <q-space />
              <q-btn :to="{name:'user.teacher.create'}" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
              <q-space />
              <q-input borderless dense v-model="search.students" placeholder="Buscar">
                  <template v-slot:append>
                      <q-icon name="eva-search-outline" />
                  </template>
              </q-input>
          </template>
          <template v-slot:body-cell-status="props">
              <q-td :props="props">
                  <q-btn size="sm" v-if="props.row.status" dense  color="green" @click="handleChangeStatus(props)" >Activo</q-btn>
                  <q-btn size="sm" v-else dense color="red" @click="handleChangeStatus(props)" >Desactivado</q-btn>
              </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                  <q-btn dense round flat color="secondary" @click="handleShow(props)" icon="eva-plus-outline">
                    <q-tooltip content-style="font-size: 11px" content-class="bg-green" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Mostrar Detalles Usuario
                    </q-tooltip>
                  </q-btn>
                  <q-btn dense round flat color="primary" @click="handleEdit(props)" icon="eva-edit-outline">
                    <q-tooltip content-style="font-size: 11px" content-class="bg-blue" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Editar Usuario
                    </q-tooltip>
                  </q-btn>
                  <q-btn dense round flat color="red" @click="handleDelete(props)" icon="eva-trash-2-outline">
                    <q-tooltip content-style="font-size: 11px" content-class="bg-red" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Eliminar Usuario
                    </q-tooltip>
                  </q-btn>
              </q-td>
          </template>
          <template v-slot:body-cell-module="props">
              <q-td :props="props">
                  <q-badge outline :color="props.row.sub_module?'primary':'red'" :label="handleGetModule(props.row)" />
              </q-td>
          </template>
        </q-table>
      </div>
      <div v-else>
        <q-card style="max-width: 100%">
          <q-card-section>
            <q-skeleton type="rect" animation="pulse"/>
          </q-card-section>
          <q-separator />
            <q-card-section>
              <div class="row">
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
            </q-card-section>
          <q-skeleton height="300px" animation="pulse" square />
        </q-card>
      </div>
        </transition>
        <q-dialog v-model="show.data" transition-show="scale" transition-hide="scale">
            <q-card style="width: 700px">
                <q-card-section class="bg-teal text-white">
                    <div class="text-h6">{{user.name+' '+user.lastname}}</div>
                </q-card-section>
                <q-card-section class="q-pa-none q-ma-none">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <q-card-section class="q-pb-none ">
                                <q-list>
                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="eva-edit-outline" />
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label caption>Cumpleaños</q-item-label>
                                            <q-item-label>{{user.birthdate}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="eva-edit-outline" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label caption>Celular</q-item-label>
                                            <q-item-label>{{user.phone}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="eva-edit-outline" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label caption>Sucursal</q-item-label>
                                            <q-item-label>{{user.branch_office?user.branch_office.name:'Sin Sucursal'}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <q-card-section class="q-pb-none ">
                                <q-list>
                                    <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="eva-edit-outline" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label caption>Tipo de Usuario</q-item-label>
                                            <q-item-label>{{user.type}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                    <q-item-section avatar>
                                          <q-icon color="primary" name="eva-edit-outline" />
                                      </q-item-section>
                                      <q-item-section>
                                          <q-item-label caption>Correo</q-item-label>
                                          <q-item-label>{{user.email}}</q-item-label>
                                      </q-item-section>
                                    </q-item>
                                    <q-item>
                                      <q-item-section avatar>
                                              <q-icon color="primary" name="eva-edit-outline" />
                                          </q-item-section>
                                          <q-item-section>
                                              <q-item-label caption>Perfil</q-item-label>
                                              <q-item-label>{{user.profile?user.profile.name:'Sin Perfil'}}</q-item-label>
                                          </q-item-section>
                                      </q-item>
                                      <q-item>
                                        <q-item-section avatar>
                                            <q-icon color="primary" name="eva-edit-outline" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label caption>Direccion</q-item-label>
                                            <q-item-label>{{user.address}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="center" class="text-teal q-pt-none">
                    <q-btn flat v-close-popup>
                        Cerrar
                    </q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="handleReload()" fab icon="eva-refresh-outline" color="primary" />
    </q-page-sticky>
</div>
</template>

<script>
export default {
  data () {
    return {
      columns: [{
        name: 'index',
        label: '#',
        field: 'index'
      },
      {
        name: 'name',
        required: true,
        label: 'Nombre(s)',
        align: 'center',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      {
        name: 'lastname',
        align: 'center',
        label: 'Apellido(s)',
        field: 'lastname',
        sortable: true
      },
      {
        name: 'email',
        align: 'center',
        label: 'Correo Electronico',
        field: 'email',
        sortable: true
      },
      {
        name: 'ci',
        align: 'center',
        label: 'Carnet Identidad',
        field: 'ci',
        sortable: true
      },
      {
        name: 'status',
        align: 'center',
        label: 'Estado',
        field: 'status',
        sortable: true
      },
      {
        name: 'created_at',
        align: 'center',
        label: 'Fecha de Creacion',
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
        teachers: [],
        admins: []
      },
      search: {
        students: null,
        teachers: null,
        admins: null
      },
      show: {
        data: false,
        students: false
      },
      user: []
    }
  },
  mounted () {
    this.handleGetData()
  },
  methods: {
    handleGetModule (row) {
      if (row.sub_module) {
        return row.sub_module.name
      } else {
        return 'Sin asignar'
      }
    },
    handleShow (props) {
      this.show.data = true
      this.user = props.row
    },
    handleChangeStatus (props) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Cambiar estado de Usuario ?',
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
        var url = '/panel/user/get/status/' + props.row.id
        this.$axios.get(url).then(reponse => {
          this.handleGetData()
          this.$q.notify({
            color: 'positive',
            message: '¡ Estado cambiado exitosamente !',
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
    handleGetData () {
      this.show.students = true
      var url = '/panel/user/get/users/'
      this.$axios.get(url + 'teachers').then(response => {
        this.data.students = response.data
        this.data.students.forEach((row, index) => {
          row.index = index + 1
        })
        this.show.students = false
      })
    },
    handleEdit (props) {
      this.$router.push({
        name: 'user.teacher.edit',
        params: {
          data: props.row
        }
      })
    },
    handleDelete (props) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar el registro Usuario ?',
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
        var url = '/panel/user/delete/user/' + props.row.id
        this.$axios.delete(url).then(response => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Usuario eliminado exitosamente !',
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
      this.handleGetData()
    },
    handleDetails (props) {
      this.$router.push({
        name: 'user.teacher.detail',
        params: {
          student: props.row
        }
      })
    }
  }
}
</script>
