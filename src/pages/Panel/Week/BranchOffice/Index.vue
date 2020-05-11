<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" :to="{name:'panel.index'}" />
                <q-breadcrumbs-el label="Sucursales" :to="{name:'week.branchoffice'}" />
            </q-breadcrumbs>
        </div>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="show.branches">
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
                        <div v-for="item in data.branchoffices" :key="item.id" class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                            <q-card class="my-card">
                            <q-img :src="$values.api+'images/modules/week/img-branchoffice.jpg'">
                                <div class="absolute-bottom">
                                <div class="text-subtitle2" align="center">{{item.name}}</div>
                                </div>
                            </q-img>
                            <q-card-actions align="center">
                                <q-btn dense @click="handleShowDays(item)" round color="secondary" size="sm" icon="eva-plus-outline"></q-btn>
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
        branchoffices: []
      },
      number_process: 0,
      show: {
        branches: false
      }
    }
  },
  watch: {
    number_process: function (newQuestion, oldQuestion) {
      if (this.number_process === 1) {
        this.show.branches = true
      } else {
        this.show.branches = false
      }
    }
  },
  mounted () {
    this.handleGetWeeks()
  },
  methods: {
    handleGetWeeks () {
      var url = '/panel/week/get/branchoffice'
      this.$axios.get(url).then(response => {
        this.data.branchoffices = response.data
        this.number_process++
      })
    },
    handleShowDays (item) {
      this.$router.push({
        name: 'week.list',
        params: {
          data: item
        }
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
