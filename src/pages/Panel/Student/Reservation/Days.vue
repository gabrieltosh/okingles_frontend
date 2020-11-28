<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Horarios" />
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
                            <div class="col-12">
                                <div class="text-subtitle1">Selecciona un Dia</div>
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
                                <q-btn @click="handleGetSchedule(item)" dense round color="primary" size="sm" icon="eva-plus-outline"></q-btn>

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
        days: []
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
      var url = '/student/get/days/' + this.$auth.user().user.id
      this.$axios.get(url).then(response => {
        this.data.days = response.data
        this.number_process++
      })
    },
    handleGetSchedule (item) {
      this.$router.push({
        name: 'reservation.schedule',
        params: {
          day: item
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
