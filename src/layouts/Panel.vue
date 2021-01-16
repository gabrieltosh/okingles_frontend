<template>
<q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="GNL__bg-theme text-white" height-hint="64">
        <q-toolbar class="GNL__toolbar">
            <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="eva-menu-outline" class="q-mr-sm" />

            <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
                <span class="q-ml-sm">OK Aprende Ingles</span>
            </q-toolbar-title>
            <q-toolbar-title v-else shrink class="row items-center no-wrap">
                <span class="q-ml-sm">OK Ingles</span>
            </q-toolbar-title>
            <q-space />

            <div class="q-gutter-sm row items-center no-wrap">
                <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
                    <q-tooltip>Google Apps</q-tooltip>
                </q-btn>
                <div v-if="$auth.user().user.type === 'Estudiante'">
                  <q-btn round dense flat color="white" icon="eva-cast-outline" @click="handleShowSchedules">
                      <q-badge color="red" text-color="white" floating>
                          {{data.count}}
                      </q-badge>
                      <q-tooltip>Mis Clases</q-tooltip>
                  </q-btn>
                </div>
                <q-btn round flat @click="rigthDrawerOpen = !rigthDrawerOpen">
                  <q-avatar size="30px" color="primary" text-color="white">{{$auth.user().user.name.charAt(0)+$auth.user().user.lastname.charAt(0)}}</q-avatar>
                </q-btn>
            </div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-white" :width="280">
        <q-scroll-area class="fit">
            <q-list padding class="text-grey-8">
                <div v-for="item in modules" :key="item.id">
                    <div v-if="item.sub_module==null && item.module.length==0">
                        <q-item v-ripple clickable :to="item.route">
                            <q-item-section avatar>
                                <q-avatar rounded text-color="white" :icon="item.icon" color="blue-grey" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ item.name }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                    <div v-else-if="item.sub_module==null && item.module.length>0">
                        <q-expansion-item expand-separator>
                          <template v-slot:header>
                            <q-item-section avatar>
                              <q-avatar rounded text-color="white" :icon="item.icon" color="blue-grey" />
                            </q-item-section>
                            <q-item-section>
                              {{item.name}}
                            </q-item-section>
                          </template>
                          <div v-for="sub_item in item.module" :key="sub_item.id">
                            <q-item clickable v-ripple class="q-ml-md" :to="sub_item.route">
                                <q-item-section avatar>
                                    <q-avatar rounded text-color="white" :icon="sub_item.icon" color="orange-4" />
                                </q-item-section>
                                <q-item-section>
                                    {{sub_item.name}}
                                </q-item-section>
                            </q-item>
                          </div>
                        </q-expansion-item>
                      </div>
                </div>

            </q-list>
        </q-scroll-area>
    </q-drawer>
    <q-dialog v-model="scheduleCard">
      <q-card class="my-card">
        <q-img :src="require('../statics/images/modules/student/scheduleStudentCard.jpg')"/>
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="eva-clock-outline"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{data.assignment.lesson}}
            </div>

            <div class="col-auto text-caption q-pt-md row no-wrap items-center">
              {{data.assignment.start+' a '+data.assignment.end}}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            Teacher {{data.assignment.name}}
          </div>
          <div class="text-caption text-primary" >
              {{data.assignment.day+' - '+data.assignment.date}}
          </div>
          <br>
          <div class="text-caption text-red">
            Es necesario tener instalada la aplicaion de Zoom.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Ingresar a la Clase" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-drawer
        side="right"
        v-model="drawerSchedule"
        bordered
        :width="300"
        :breakpoint="500"
        content-class="white"
      >
      <q-page-sticky position="bottom-right" :offset="[15, 15]">
        <q-btn fab icon="eva-close-outline" color="red" @click="drawerSchedule = false"/>
      </q-page-sticky>
      <q-list bordered padding class="rounded-borders" style="max-width: 350px">
        <q-item-label header>Mis Clases</q-item-label>
        <div class="absolute-center" v-if="loading.schedules">
          <q-spinner-cube color="blue" size="xl"/>
        </div>
        <q-item :clickable="item.valid?true:false" v-for="item in this.data.assignments" :key="item.schedule_id" @click="HandleShowSchedule(item)">
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="eva-calendar-outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{item.lesson}}</q-item-label>
            <q-item-label caption lines="1">{{item.day+' '+item.date}}</q-item-label>
            <q-item-label caption lines="1">{{item.start+' - '+item.end}}</q-item-label>
            <q-item-label caption lines="1">{{item.name}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{item.classroom}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer side="right" v-model="rigthDrawerOpen" bordered :width="300" :breakpoint="500" content-class="white">
          <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" color="primary" text-color="white">{{$auth.user().user.name.charAt(0)+$auth.user().user.lastname.charAt(0)}}</q-avatar>
              <div class="text-weight-bold">{{ $auth.user().user.name+' '+$auth.user().user.lastname}}</div>
              <div>{{$auth.user().user.email}}</div>
            </div>
        </q-img>
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <div class="row q-pa-sm">
          <div class="col-12">
             <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-credit-card-outline" />
                </q-item-section>

                <q-item-section>
                  <q-item-label caption>Carnet de Identidad</q-item-label>
                  <q-item-label>{{$auth.user().user.ci}}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-briefcase-outline" />
                </q-item-section>

                <q-item-section>
                  <q-item-label caption>Ocupación</q-item-label>
                  <q-item-label>{{$auth.user().user.occupation}}</q-item-label>
                </q-item-section>
              </q-item>
                <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-activity-outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Estado</q-item-label>
                  <q-item-label> <q-badge :color="$auth.user().user.status?'orange':'red'" :label="$auth.user().user.status?'Activo':'No Activo'"/></q-item-label>
                </q-item-section>
              </q-item>
                <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-calendar-outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Cumpleaños</q-item-label>
                  <q-item-label>{{$auth.user().user.birthdate}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-calendar-outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Finalización de Estudios</q-item-label>
                  <q-item-label>{{$auth.user().user.due_date}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-phone-outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Celular</q-item-label>
                  <q-item-label>{{$auth.user().user.phone}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-copy-outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Perfil</q-item-label>
                  <q-item-label>{{$auth.user().user.profile.name}}</q-item-label>
                </q-item-section>
              </q-item>
               <q-item>
                <q-item-section avatar>
                  <q-icon color="light-green" name="eva-home-outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Sucursal</q-item-label>
                  <q-item-label>{{$auth.user().user.branch_office.name}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <div align="center" class="q-pa-sm">
               <q-btn @click="HandleLogout()" outline color="primary" size="md" label="Cerrar Sesion" />
            </div>
          </div>
        </div>
        </q-scroll-area>
    </q-drawer>
    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script>
export default {
  name: 'GoogleNewsLayout',
  data () {
    return {
      leftDrawerOpen: false,
      rigthDrawerOpen: false,
      drawerSchedule: false,
      scheduleCard: false,
      modules: [],
      data: {
        assignments: [],
        assignment: [],
        count: null,
        status: false
      },
      loading: {
        schedules: false
      }
    }
  },
  mounted () {
    this.HandleGetModules()
    this.HandleGetAssignmentToDay()
  },
  methods: {
    HandleGetModules () {
      var url = '/panel/get/modules/' + this.$auth.user().user.profile_id
      this.$axios.get(url).then(response => {
        this.modules = response.data
      })
    },
    HandleLogout () {
      this.$auth.logout()
    },
    HandleGetAssignmentToDay () {
      var url = '/student/get/assignment/today'
      this.$axios.post(url, {
        student_id: this.$auth.user().user.id
      }).then(response => {
        this.data.assignments = response.data.assignment
        this.data.count = response.data.count
        this.loading.schedules = false
      })
    },
    HandleShowSchedule (item) {
      if (this.scheduleCard) {
        this.scheduleCard = false
      } else {
        this.scheduleCard = true
        this.data.assignment = item
      }
    },
    handleShowSchedules () {
      this.data.assignments = []
      this.loading.schedules = true
      if (this.drawerSchedule) {
        this.drawerSchedule = false
      } else {
        this.drawerSchedule = true
        this.HandleGetAssignmentToDay()
      }
    }
  }
}
</script>

<style lang="sass">
.GNL
  &__toolbar
    height: 50px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
  &__bg-theme
    background: #44668e !important;
</style>
