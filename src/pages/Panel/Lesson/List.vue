<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Clase" icon="eva-map-outline" to="/start/pick-quasar-flavour" />
                <q-breadcrumbs-el label="Lista" to="/vue-components/breadcrumbs" />
            </q-breadcrumbs>
        </div>
        <div class="q-pa-md">
            <q-table :filter="search" title="Sucursales" :data="data" :columns="columns" row-key="name">
                <template v-slot:top>
                    <div class="text-subtitle1">Clases</div>
                    <q-space />
                    <q-btn :to="{name:'lesson.create'}" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
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
      data: [],
      search: null
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
    }
  }
}
</script>
