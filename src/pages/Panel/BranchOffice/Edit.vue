<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Sucursal" icon="eva-map-outline" to="/start/pick-quasar-flavour" />
            <q-breadcrumbs-el label="Editar" to="/vue-components/breadcrumbs" />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">}
        <q-card class="my-card">
            <q-form @submit="handleUpdateBranchOffice" @reset="handleFormReset">
                <q-card-section>
                    <div class="text-subtitle1 text-primary">Actualizar Sucursal</div>
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
                            <q-input rounded dense v-model="data.name" label="Nombre" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-edit-2-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-select behavior="menu" label="Ciudad" clearable rounded v-model="data.city" :options="cities" dense lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
                            <q-input rounded dense v-model="data.address" label="Dirección" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-pin-outline" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div align="center">
                        <q-btn :to="{name:'branch.list'}" label="Cancelar" type="reset" color="primary" flat />
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
      },
      data: {
        name: this.$route.params.data.name,
        city: this.$route.params.data.city,
        address: this.$route.params.data.address,
        id: this.$route.params.data.id
      }
    }
  },
  methods: {
    handleUpdateBranchOffice () {
      var url = '/panel/branchoffice/update'
      this.$axios.post(url, this.data).then(response => {
        this.$router.push({
          name: 'branch.list'
        })
        this.$q.notify({
          color: 'positive',
          message: '¡ Sucursal actualizada exitosamente !',
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
