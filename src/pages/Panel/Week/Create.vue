<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" :to="{name:'panel.index'}" />
                <q-breadcrumbs-el label="Semanas" icon="eva-map-outline" :to="{name:'week.list', params: {data:this.$route.params.data}}" />
                <q-breadcrumbs-el label="Crear" to="/vue-components/breadcrumbs" />
            </q-breadcrumbs>
        </div>
        <div class="q-pa-md">
            <q-card class="my-card">
                <q-form @submit="handlePostTime" @reset="handleFormReset">
                    <q-card-section>
                        <div class="text-subtitle1 text-primary">Crear Clase</div>

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
                                <q-input rounded dense v-model="data.title" label="Nombre" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                                    <template v-slot:prepend>
                                        <q-icon name="eva-edit-2-outline" />
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                                <q-input rounded dense label="Fecha de Inicio" v-model="data.start" mask="date" :rules="['date']">
                                    <template v-slot:prepend>
                                        <q-icon name="eva-edit-2-outline" />
                                    </template>
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                                            <q-date v-model="data.start" @input="() => $refs.qDateProxy2.hide()" />
                                        </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                             <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                                 <q-input rounded dense label="Fecha de Finalización" v-model="data.end" mask="date" :rules="['date']">
                                    <template v-slot:prepend>
                                        <q-icon name="eva-edit-2-outline" />
                                    </template>
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                            <q-date v-model="data.end" @input="() => $refs.qDateProxy.hide()" />
                                        </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div align="center">
                            <q-btn :to="{name:'week.list', params: {data:this.$route.params.data}}" label="Cancelar" type="reset" color="primary" flat />
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
        title: null,
        start: null,
        end: null,
        branch_office_id: this.$route.params.data.id
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
    handlePostTime () {
      var url = '/panel/week/post/week'
      this.$axios.post(url, this.data).then(response => {
        this.$router.push({ name: 'week.list' })
        this.$q.notify({
          color: 'positive',
          message: '¡ Semana creada exitosamente !',
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
    },
    handleGetBranchOffice () {
      var url = '/panel/user/get/branch'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.branches.push({ value: element.id, label: element.name })
        })
      })
    }
  }
}
</script>
