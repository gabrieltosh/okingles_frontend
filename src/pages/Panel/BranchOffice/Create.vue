<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Sucursales" :to="{name:'branch.list'}" />
            <q-breadcrumbs-el label="Crear"  />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-form @submit="handlePostBranchOffice" @reset="handleFormReset">
                <q-card-section>
                    <div class="text-subtitle1 text-primary">Crear Sucursal</div>

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
                            <q-input rounded dense v-model="branch.name" label="Nombre" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                                <template v-slot:prepend>
                                    <q-icon name="eva-edit-2-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-select behavior="menu" label="Seleccionar" clearable rounded v-model="branch.city" :options="cities" dense lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-input rounded dense v-model="branch.address" label="Dirección" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div align="center">
                        <q-btn :to="{name:'branch.list'}" label="Cancelar" type="reset" color="primary" flat />
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
      branch: {
        name: null,
        city: null,
        address: null
      },
      cities: [
        'La Paz',
        'Cochabamba',
        'Santa Cruz',
        'Oruro',
        'Potosi',
        'Tarija',
        'Sucre',
        'Beni',
        'Pando'
      ],
      errors: [],
      show: {
        errors: false
      }
    }
  },
  methods: {
    handlePostBranchOffice () {
      var url = '/panel/branchoffice/create'
      this.$axios.post(url, this.branch).then(response => {
        this.$router.push({ name: 'branch.list' })
        this.$q.notify({
          color: 'positive',
          message: '¡ Sucursal creada exitosamente !',
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
      this.branch.name = null
      this.branch.city = null
      this.branch.address = null
    }
  }
}
</script>
