<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Modulo" :to="{name:'module.list'}" />
            <q-breadcrumbs-el label="Crear" />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-form @submit="handlePostBranchOffice" @reset="handleFormReset">
                <q-card-section>
                    <div class="text-subtitle1 text-primary">Crear Modulo</div>

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
                            <q-input rounded dense v-model="data.route" label="Ruta">
                                <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-input rounded dense v-model="data.icon" label="Icono" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-select
                                dense
                                v-model="data.sub_module"
                                :options="modules"
                                label="Sub Modulo"
                                emit-value
                                map-options
                                clearable rounded
                            >
                             <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-select>
                        </div>
                    </div>
                    <div align="center">
                        <q-btn :to="{name:'module.list'}" label="Cancelar" type="reset" color="primary" flat />
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
        route: null,
        icon: null,
        sub_module: null
      },
      modules: [],
      errors: [],
      show: {
        errors: false
      }
    }
  },
  mounted () {
    this.handleGetDataSelect()
  },
  methods: {
    handlePostBranchOffice () {
      var url = '/panel/module/store'
      this.$axios.post(url, this.data).then(response => {
        this.$router.push({ name: 'module.list' })
        this.$q.notify({
          color: 'positive',
          message: '¡ Modulo creada exitosamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
      }).catch(error => {
        this.errors = error.response.data.errors
        this.show.errors = true
        console.log(error.response.data.errors)
      })
    },
    handleGetDataSelect () {
      var url = '/panel/module/select'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.modules.push({ value: element.id, label: element.name })
        })
      })
      console.log(this.modules)
    },
    handleFormReset () {
      this.module.name = null
      this.module.route = null
      this.module.icon = null
      this.module.sub_module = null
    }
  }
}
</script>
