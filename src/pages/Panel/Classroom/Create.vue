<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Aula" icon="eva-map-outline" to="/start/pick-quasar-flavour" />
                <q-breadcrumbs-el label="Crear" to="/vue-components/breadcrumbs" />
            </q-breadcrumbs>
        </div>
        <div class="q-pa-md">
            <q-card class="my-card">
                <q-form @submit="handlePostClassroom" @reset="handleFormReset">
                    <q-card-section>
                        <div class="text-subtitle1 text-primary">Crear Aula</div>

                        <q-banner v-if="show.errors" transition-show="flip-up" dense rounded inline-actions class="text-white bg-red q-pa-xs q-ma-sm">
                        <template v-slot:avatar>
                            <lottie-animation :width="50" :height="50" path="statics/lottie/error-flat-style.json" />
                        </template>
                            <div transition-show="jump-down" v-for="error in errors.name" :key="error">
                                {{error}}
                            </div>
                        </q-banner>

                        <div class="row">
                            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                                <q-input rounded dense v-model="data.name" label="Nombre" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                                    <template v-slot:prepend>
                                        <q-icon name="eva-edit-2-outline" />
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                                 <q-select
                                    dense
                                    v-model="data.branch_office_id"
                                    :options="branches"
                                    label="Sucursal"
                                    emit-value
                                    map-options
                                    clearable rounded
                                >
                                <template v-slot:prepend>
                                        <q-icon name="eva-home-outline" />
                                    </template>
                                </q-select>
                            </div>
                        </div>
                        <div align="center">
                            <q-btn :to="{name:'classroom.list'}" label="Cancelar" type="reset" color="primary" flat />
                            <q-btn rounded label="Crear" type="submit" color="primary" />
                        </div>
                    </q-card-section>
                </q-form>
            </q-card>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        name: null,
        branch_office_id: null
      },
      errors: [],
      show: {
        errors: false
      },
      branches: []
    }
  },
  mounted () {
    this.handleGetBranchOffice()
  },
  methods: {
    handlePostClassroom () {
      var url = '/panel/classroom/post/classroom'
      this.$axios.post(url, this.data).then(response => {
        this.$router.push({ name: 'classroom.list' })
        this.$q.notify({
          color: 'positive',
          message: '¡ Aula creado exitosamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
      }).catch(error => {
        this.errors = error.response.data.errors
        this.show.errors = true
      })
    },
    handleGetBranchOffice () {
      var url = '/panel/user/get/branch'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.branches.push({ value: element.id, label: element.name })
        })
      })
    },
    handleFormReset () {
      this.data.name = null
      this.data.city = null
      this.data.address = null
    }
  }
}
</script>
