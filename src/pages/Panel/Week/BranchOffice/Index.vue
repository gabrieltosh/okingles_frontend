<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" :to="{name:'panel.index'}" />
                <q-breadcrumbs-el label="Sucursales" :to="{name:'week.branchoffice'}" />
            </q-breadcrumbs>
        </div>
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
                        <q-img src="http://localhost:8000/images/modules/week/img-branchoffice.jpg">
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
</template>
<script>
export default {
  data () {
    return {
      data: {
        branchoffices: []
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
      })
    },
    handleShowDays (item) {
      this.$router.push({
        name: 'week.list',
        params: {
          data: item
        }
      })
    }
  }
}
</script>
<style lang="css">

</style>
