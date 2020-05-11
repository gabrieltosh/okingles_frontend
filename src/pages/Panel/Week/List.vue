<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" :to="{name:'panel.index'}" />
                <q-breadcrumbs-el label="Sucursales" icon="eva-map-outline"  :to="{name:'week.branchoffice'}" />
                <q-breadcrumbs-el label="Semanas" />
            </q-breadcrumbs>
        </div>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="show.week">
            <div class="q-pa-md">
                <q-card >
                    <q-card-section>
                        <div class="row">
                            <div class="col-6">
                                <div class="text-subtitle1">{{$route.params.data.name}}</div>
                            </div>
                            <div class="col-6">
                                <q-btn class="float-right" :to="{name:'week.create', params: {data:this.$route.params.data}}" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
                            </div>
                        </div>
                    </q-card-section>
                    <div class="row q-pa-md q-col-gutter-md">
                        <div v-for="item in data.weeks" :key="item.id" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                            <q-card class="my-card">
                            <q-img :src="$values.api+'images/modules/week/img-week.jpg'">
                                <div class="absolute-bottom">
                                <div class="text-subtitle2" align="center">{{item.title}}</div>
                                </div>
                            </q-img>
                            <q-card-actions align="center">
                                <q-btn dense @click="handleShowDays(item)" round color="secondary" size="sm" icon="eva-plus-outline"></q-btn>
                                <q-btn dense @click="handleEditWeek(item)" round color="primary"  size="sm" icon="eva-edit-outline"></q-btn>
                                <q-btn v-if="item.delete" dense @click="handleDeleteWeek(item)" round color="red" size="sm" icon="eva-trash-2-outline"></q-btn>
                            </q-card-actions>
                            </q-card>
                        </div>
                    </div>
                </q-card>
            </div>
          </div>
          <div v-else>
            <div class="q-pa-md">
              <q-card >
                <q-card-section>
                    <div class="row">
                        <div class="col-6">
                            <div class="text-subtitle1">{{$route.params.data.name}}</div>
                        </div>
                        <div class="col-6">
                            <q-btn class="float-right" :to="{name:'week.create', params: {data:this.$route.params.data}}" size="sm" rounded icon="eva-plus" color="primary" label="Crear" />
                        </div>
                    </div>
                </q-card-section>
                <div class="row q-pa-md q-col-gutter-md">
                  <div v-for="item in 4" :key="item"  class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                    <q-card style="max-width: 300px">
                      <q-skeleton height="130px"   animation="pulse" />
                      <q-card-actions align="center" class="q-gutter-md">
                        <q-skeleton type="QBtn"  animation="pulse" />
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>
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
      data: {
        weeks: [],
        branch_office_id: this.$route.params.data.id
      },
      number_process: 0,
      show: {
        week: false
      }
    }
  },
  watch: {
    number_process: function (newQuestion, oldQuestion) {
      if (this.number_process === 1) {
        this.show.week = true
      } else {
        this.show.week = false
      }
    }
  },
  mounted () {
    this.handleGetWeeks()
  },
  methods: {
    handleShowDays (item) {
      this.$router.push({
        name: 'day.list',
        params: {
          week_id: item.id,
          branch: this.$route.params.data
        }
      })
    },
    handleGetWeeks () {
      var url = '/panel/week/get/week/' + this.$route.params.data.id
      this.$axios.get(url).then(response => {
        this.data.weeks = response.data
        this.number_process++
      })
    },
    handleEditWeek (item) {
      this.$router.push({
        name: 'week.edit',
        params: {
          data: item,
          branch: this.$route.params.data
        }
      })
    },
    handleDeleteWeek (item) {
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
        var url = '/panel/week/delete/week/' + item.id
        this.$axios.delete(url).then(response => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Semana eliminada exitosamente !',
            timeout: 500,
            icon: 'eva-checkmark-circle-2-outline'
          })
          this.handleGetWeeks()
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleReload () {
      this.number_process = 0
      this.handleGetWeeks()
    }
  }
}
</script>
<style lang="css">

</style>
