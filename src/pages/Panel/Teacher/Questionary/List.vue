<template>
    <div>
      <div class="q-px-md q-pt-md q-gutter-sm">
          <q-breadcrumbs>
              <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
              <q-breadcrumbs-el label="Cuestionarios" />
          </q-breadcrumbs>
      </div>
      <div class="q-pa-md">
        <q-table :filter="search"  :data="data.questionnaires" :columns="columns" row-key="title">
            <template v-slot:top>
                <div class="text-subtitle1">Lista de Cuestionarios</div>
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
                    <q-btn dense round flat color="primary" icon="las la-file-medical" @click="handleShowQuestionnaire(props.row)"></q-btn>
                    <q-btn dense round flat color="red" icon="las la-trash-alt" @click="handleDeleteQuestionnaire(props.row)"></q-btn>
                </q-td>
            </template>
        </q-table>
      </div>
      <q-dialog v-model="dialog.create">
        <q-card class="my-card" style="width: 450px">
              <q-form ref="FormQuestionnaire" @submit="handleStoreQuestionnaire" @reset="handleFormReset">
                  <q-card-section>
                      <div class="text-h6">Crear Cuestionario</div>
                      <div class="row ">
                          <div class="col-xs-12 col-sm-12 col-md-12 q-py-md">
                              <q-input rounded dense v-model="data.questionnaire.title" label="Titulo" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                                  <template v-slot:prepend>
                                      <q-icon name="eva-edit-2-outline" />
                                  </template>
                              </q-input>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 q-pb-md">
                              <q-input rounded dense v-model="data.questionnaire.description" label="Descripcion" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
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
          name: 'description',
          required: true,
          label: 'Descripción',
          align: 'center',
          field: row => row.title,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'created_at',
          align: 'center',
          label: 'Fecha de Creación',
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
        questionnaires: [],
        questionnaire: {
          title: null,
          description: null
        }
      },
      dialog: {
        create: false
      },
      search: null
    }
  },
  mounted () {
    this.handleGetQuestionnaires()
  },
  methods: {
    handleShowQuestionnaire (item) {
      this.$router.push({
        name: 'questionnaires.details',
        params: {
          questionnaire: item
        }
      })
    },
    handleGetQuestionnaires () {
      var url = '/panel/teacher/get/questionnaires'
      this.$axios.get(url).then(response => {
        this.data.questionnaires = response.data
      })
    },
    handleStoreQuestionnaire () {
      var url = '/panel/teacher/store/questionnaires'
      this.$axios.post(url, this.data.questionnaire).then(response => {
        this.dialog.create = false
        this.handleFormReset()
        this.handleGetQuestionnaires()
        this.$refs.FormQuestionnaire.resetValidation()
      })
    },
    handleDeleteQuestionnaire (item) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar el Cuestionario ?',
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
        var url = '/panel/teacher/delete/questionnaires'
        this.$axios.post(url, item).then(response => {
          this.handleGetQuestionnaires()
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleFormReset () {
      this.data.questionnaire.title = null
      this.data.questionnaire.description = null
    }
  }
}
</script>
