<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
                <q-breadcrumbs-el label="Horarios" />
            </q-breadcrumbs>
        </div>
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
</template>

<script>
export default {
  data () {
    return {
      data: {
        days: []
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
      })
    },
    handleGetSchedule (item) {
      this.$router.push({
        name: 'student.schedule',
        params: {
          day: item
        }
      })
    }
  }
}
</script>
