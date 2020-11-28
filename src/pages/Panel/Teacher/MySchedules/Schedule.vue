<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Dias" :to="{name:'myschedules.days'}" />
            <q-breadcrumbs-el label="Horarios" />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-12">
                        <div class="text-subtitle1">Horarios {{$route.params.day.name +' '+$route.params.day.day_date}}</div>
                    </div>
                </div>
            </q-card-section>
            <div class="row q-pa-md q-col-gutter-md">
                <div v-for="item in data.schedules" :key="item.id" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                    <q-card class="my-card">
                        <q-img :src="$values.api+'images/modules/student/img-schedule.jpg'">
                            <div class="absolute-bottom">
                                <div class="text-subtitle2" align="center"> {{item.day.name}} <strong>{{item.time.name}}</strong></div>
                                <div class="text-subtitle2" align="center"> <strong>{{item.classroom.name}}</strong></div>
                                <div class="text-subtitle2" align="center"> <strong>{{item.lesson?item.lesson.name:'Sin Leccion'}}</strong></div>
                            </div>
                        </q-img>
                        <q-card-actions align="center">
                            <q-btn @click="handleShowSchedule(item)" dense round color="primary" size="sm" icon="eva-plus-outline"></q-btn>
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
        schedules: []
      },
      errors: 0
    }
  },
  mounted () {
    this.handleGetSchedule()
  },
  methods: {
    handleGetSchedule () {
      var url = '/teacher/get/schedule'
      this.$axios.post(url, {
        day_id: this.$route.params.day.id,
        teacher_id: this.$auth.user().user.id
      }).then(response => {
        this.data.schedules = response.data
      })
    },
    handleShowSchedule (item) {
      this.$router.push({
        name: 'myschedules.student',
        params: {
          day: this.$route.params.day,
          schedule: item
        }
      })
    }
  }
}
</script>
<style lang="css">
.theme-color{
  background: #44668e !important;
}
</style>
