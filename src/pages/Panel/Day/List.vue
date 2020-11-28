<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Sucursales" icon="eva-map-outline"  :to="{name:'week.branchoffice'}" />
                <q-breadcrumbs-el label="Semanas" icon="eva-map-outline" :to="{name:'week.list',params: {data:this.$route.params.branch}}"  />
                <q-breadcrumbs-el label="Dias" />
            </q-breadcrumbs>
        </div>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="show.days">
            <div class="q-pa-md">
                <q-card >
                    <q-card-section>
                        <div class="row">
                            <div class="col-6">
                                <div class="text-subtitle1">Dias de la {{data.semana.title}}</div>
                            </div>
                        </div>
                    </q-card-section>
                    <div class="row q-pa-md q-col-gutter-md">
                        <div v-for="item in data.days" :key="item.id" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                            <q-card class="my-card">
                            <q-img :src="$values.api+'images/modules/day/day.jpg'">
                                <div class="absolute-bottom">
                                <div class="text-subtitle2" align="center">{{item.name+' '+item.day_date}}</div>
                                </div>
                            </q-img>
                            <q-card-actions align="center">
                                <q-btn @click="handleScheduleWeek(item)" dense round color="primary" size="sm" icon="eva-plus-outline"></q-btn>
                                <q-btn v-if="item.deactivate" @click="handleChangeStatus(item)" dense round :color="!item.status?'secondary':'red'" size="sm" :icon="!item.status?'eva-checkmark-outline':'eva-close-outline'"></q-btn>
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
                        <div class="text-subtitle1">Sucursales</div>
                    </div>
                    <div class="col-6">
                    </div>
                  </div>
                </q-card-section>
                <div class="row q-pa-md q-col-gutter-md">
                  <div v-for="item in 4" :key="item"  class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                    <q-card>
                      <q-skeleton height="150px"   animation="pulse" />
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
        days: [],
        semana: []
      },
      number_process: 0,
      show: {
        days: false
      }
    }
  },
  watch: {
    number_process: function (newQuestion, oldQuestion) {
      if (this.number_process === 1) {
        this.show.days = true
      } else {
        this.show.days = false
      }
    }
  },
  mounted () {
    this.handleGetDays()
  },
  methods: {
    handleGetDays () {
      this.number_process = 0
      var url = '/panel/day/get/days/' + this.$route.params.week_id
      this.$axios.get(url).then(response => {
        this.data.days = response.data.days
        this.data.semana = response.data
        this.number_process++
      })
    },
    handleChangeStatus (item) {
      this.$q.dialog({
        title: 'Cambiar Estado',
        message: '¿ Esta seguro de cambiar el estado ?',
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
        var url = '/panel/day/change/day/' + item.id
        this.$axios.get(url).then(response => {
          this.$q.notify({
            color: 'positive',
            message: '¡ Estado cambiado exitosamente !',
            icon: 'eva-checkmark-circle-2-outline',
            progress: true
          })
          this.number_process = 0
          this.handleGetDays()
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    handleScheduleWeek (item) {
      this.$router.push({
        name: 'schedule.list',
        params: {
          day: item,
          branch: this.$route.params.branch,
          week_id: this.$route.params.week_id
        }
      })
    },
    handleReload () {
      this.number_process = 0
      this.handleGetDays()
    }
  }
}
</script>
<style lang="css">

</style>
