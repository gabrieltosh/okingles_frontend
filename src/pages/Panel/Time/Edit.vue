<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Horas"  :to="{name:'time.list'}" />
                <q-breadcrumbs-el label="Editar" />
            </q-breadcrumbs>
        </div>
        <div class="q-pa-md">
            <q-card class="my-card">
                <q-form @submit="handlePostTime" @reset="handleFormReset">
                    <q-card-section>
                        <div class="text-subtitle1 text-primary">Editar Clase</div>
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
                                <q-input  label="Inicio" rounded dense v-model="data.start" mask="time" :rules="['time']">
                                    <template v-slot:prepend>
                                      <q-icon name="eva-edit-2-outline" />
                                  </template>
                                  <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-time v-model="data.start" />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                            </div>
                             <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                                 <q-input  label="Fin" rounded dense v-model="data.end" mask="time" :rules="['time']">
                                       <template v-slot:prepend>
                                        <q-icon name="eva-edit-2-outline" />
                                    </template>
                                  <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-time v-model="data.end" />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                            </div>
                        </div>
                        <div align="center">
                            <q-btn :to="{name:'time.list'}" label="Cancelar" type="reset" color="primary" flat />
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
        name: this.$route.params.data.name,
        start: this.$route.params.data.start,
        end: this.$route.params.data.end,
        id: this.$route.params.data.id
      },
      errors: [],
      show: {
        errors: false
      }
    }
  },
  methods: {
    handlePostTime () {
      var url = '/panel/time/update/time'
      this.$axios.post(url, this.data).then(response => {
        this.$router.push({ name: 'time.list' })
        this.$q.notify({
          color: 'positive',
          message: '¡ Hora editada exitosamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
      }).catch(error => {
        this.errors = error.response.data.errors
        this.show.errors = true
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
