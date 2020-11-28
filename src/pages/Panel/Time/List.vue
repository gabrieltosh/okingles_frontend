<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Horarios"  />
            </q-breadcrumbs>
        </div>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="show.time">
            <div class="q-pa-md">
                <q-table :filter="search" title="Sucursales" :data="data" :columns="columns" row-key="name">
                    <template v-slot:top>
                        <div class="text-subtitle1">Horas</div>
                        <q-space />
                        <q-btn :to="{name:'time.create'}" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
                        <q-space />
                        <q-input  borderless dense v-model="search" placeholder="Buscar"  >
                            <template v-slot:append>
                                <q-icon name="eva-search-outline" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
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
                <q-skeleton height="350px" animation="pulse" square />
              </q-card>
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
      columns: [{
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
        name: 'start',
        align: 'center',
        label: 'Inicio',
        field: 'start',
        sortable: true
      },
      {
        name: 'end',
        align: 'center',
        label: 'Fin',
        field: 'end',
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
      data: [],
      search: null,
      number_process: 0,
      show: {
        time: false
      }
    }
  },
  watch: {
    number_process: function (newQuestion, oldQuestion) {
      if (this.number_process === 1) {
        this.show.time = true
      } else {
        this.show.time = false
      }
    }
  },
  mounted () {
    this.handleGetData()
  },
  methods: {
    handleGetData () {
      this.number_process = 0
      var url = '/panel/time/get/time'
      this.$axios.get(url).then(response => {
        this.data = response.data
        this.data.forEach((row, index) => {
          row.index = index + 1
        })
        this.number_process++
      })
    },
    handleEdit (props) {
      this.$router.push({ name: 'time.edit', params: { data: props.row } })
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
        var url = '/panel/time/delete/time/' + props.row.id
        this.$axios.delete(url).then(response => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Hora eliminada exitosamente !',
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
