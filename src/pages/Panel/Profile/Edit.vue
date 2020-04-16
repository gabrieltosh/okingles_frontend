<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Perfil" icon="eva-map-outline" to="/start/pick-quasar-flavour" />
            <q-breadcrumbs-el label="Editar" to="/vue-components/breadcrumbs" />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-form @submit="handleUpdateProfile" @reset="handleFormReset">
                <q-card-section>
                    <div class="text-subtitle1 text-primary">Editar Perfil</div>

                    <q-banner v-if="show.errors" transition-show="flip-up" dense rounded inline-actions class="text-white bg-red q-pa-xs q-ma-sm">
                      <template v-slot:avatar>
                        <lottie-animation :width="50" :height="50" path="statics/lottie/error-flat-style.json" />
                      </template>
                          <div transition-show="jump-down" v-for="error in errors.name" :key="error">
                            {{error}}
                          </div>
                    </q-banner>

                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-input rounded dense v-model="data.name" label="Nombre" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                                <template v-slot:prepend>
                                    <q-icon name="eva-edit-2-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-input rounded dense v-model="data.description" label="Descripción" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div align="center">
                        <q-btn :to="{name:'profile.list'}" label="Cancelar" type="reset" color="primary" flat />
                        <q-btn rounded label="Actualizar" type="submit" color="primary" />
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
        name: this.$route.params.data.name,
        description: this.$route.params.data.description,
        id: this.$route.params.data.id
      },
      modules: [],
      errors: [],
      show: {
        errors: false
      }
    }
  },
  methods: {
    handleUpdateProfile () {
      var url = '/panel/profile/update'
      this.$axios.post(url, this.data).then(response => {
        this.$router.push({ name: 'profile.list' })
        this.$q.notify({
          color: 'positive',
          message: '¡ Perfil creado exitosamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
      }).catch(error => {
        this.errors = error.response.data.errors
        this.show.errors = true
        console.log(error.response.data.errors)
      })
    },
    handleFormReset () {
      this.data.name = null
      this.data.description = null
    }
  }
}
</script>
