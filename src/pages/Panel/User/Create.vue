<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Usuario" icon="eva-map-outline" :to="{name:'user.list'}" />
            <q-breadcrumbs-el label="Crear"/>
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-form ref="create" @submit="HandlePostUser" @reset="handleFormReset">
                <q-card-section>
                    <div class="text-subtitle1 text-primary">Crear Usuario</div>
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
                            <q-input rounded dense v-model="data.name" label="Nombre" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                                <template v-slot:prepend>
                                    <q-icon name="eva-credit-card-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-input rounded dense v-model="data.lastname" label="Apellido" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-credit-card-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-input rounded dense v-model="data.ci" label="Carnet de Identidad"  lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-edit-2-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-input rounded dense v-model="data.email" label="Correo Electronico" type="email"  lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-email-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.occupation" label="Ocupación" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-briefcase-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.address" label="Dirección" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-book-open-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.phone" type="tel" label="Celular" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-phone-outline" />
                              </template>
                          </q-input>
                        </div>
                         <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.invoice" label="Factura" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.registter" label="Registro" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                         <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-file rounded dense v-model="image" label="Foto de Perfil">
                              <template v-slot:prepend>
                                <q-icon name="eva-attach-2-outline" />
                              </template>
                            </q-file>
                        </div>
                         <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                           <q-input rounded dense v-model="data.due_date" mask="date" label="Fecha Finalización" lazy-rules :rules="['date']">
                              <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="data.due_date" @input="() => $refs.qDateProxy2.hide()" />
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                           <q-input rounded dense v-model="data.birthdate" mask="date" label="Fecha Cumpleaños" lazy-rules :rules="['date']">
                              <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="data.birthdate" @input="() => $refs.qDateProxy.hide()" />
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-select
                                dense
                                v-model="data.profile_id"
                                :options="profiles"
                                label="Perfil"
                                emit-value
                                map-options
                                clearable rounded
                            >
                             <template v-slot:prepend>
                                    <q-icon name="eva-people-outline" />
                                </template>
                            </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-select
                                dense
                                v-model="data.branch_office_id"
                                :options="branches"
                                label="Sucursal"
                                emit-value
                                map-options
                                clearable rounded
                            >
                             <template v-slot:prepend>
                                    <q-icon name="eva-home-outline" />
                                </template>
                            </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-select
                                dense
                                v-model="data.type"
                                :options="types"
                                label="Tipo de Usuario"
                                emit-value
                                map-options
                                clearable rounded
                            >
                             <template v-slot:prepend>
                                    <q-icon name="eva-people-outline" />
                                </template>
                            </q-select>
                        </div>
                    </div>
                    <div align="center">
                        <q-btn :to="{name:'user.list'}" label="Cancelar" type="reset" color="primary" flat />
                        <q-btn rounded label="Crear" type="submit" color="primary" />
                    </div>
                </q-card-section>
            </q-form>
        </q-card>
    </div>
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
        name: null,
        lastname: null,
        ci: null,
        email: null,
        occupation: null,
        address: null,
        password: null,
        birthdate: null,
        due_date: null,
        phone: null,
        invoice: null,
        registter: null,
        image: null,
        profile_id: null,
        banch_office_id: null,
        type: null
      },
      profiles: [],
      branches: [],
      errors: [],
      types: [
        {
          label: 'Administrativo',
          value: 'Administrativo'
        },
        {
          label: 'Docente',
          value: 'Docente'
        },
        {
          label: 'Estudiante',
          value: 'Estudiante'
        }
      ],
      show: {
        errors: false
      },
      image: null,
      submitResult: []
    }
  },
  mounted () {
    this.HandleGetProfile()
    this.HandleGetBranchOffice()
  },
  methods: {
    HandleToDay () {
      var hoy = new Date()
      var dd = hoy.getDate()
      var mm = hoy.getMonth() + 1
      var yyyy = hoy.getFullYear()
      this.data.birthdate = yyyy + '/' + mm + '/' + dd
      console.log(this.data.birthdate)
    },
    HandleGetProfile () {
      var url = '/panel/user/get/profile'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.profiles.push({ value: element.id, label: element.name })
        })
      })
    },
    HandleGetBranchOffice () {
      var url = '/panel/user/get/branch'
      this.$axios.get(url).then(response => {
        response.data.forEach((element, index) => {
          this.branches.push({ value: element.id, label: element.name })
        })
      })
    },
    HandlePostUser (evt) {
      const fd = new FormData()
      fd.append('file', this.image)
      this.$axios.post(
        '/panel/user/post/upload',
        fd,
        { headers:
              { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
        this.data.image = response.data
        var url = '/panel/user/post/store'
        this.$axios.post(url, this.data).then(response => {
          this.$router.push({ name: 'user.list' })
          this.$q.notify({
            color: 'positive',
            message: '¡ Usuario creado exitosamente !',
            icon: 'eva-checkmark-circle-2-outline',
            progress: true
          })
        })
      })
    },
    handleFormReset () {
      this.data.name = null
      this.data.lastname = null
      this.data.ci = null
      this.data.email = null
      this.data.occupation = null
      this.data.address = null
      this.data.password = null
      this.data.birthdate = null
      this.data.due_date = null
      this.data.phone = null
      this.data.invoice = null
      this.data.registter = null
      this.data.image = null
      this.data.profile_id = null
      this.data.banch_office_id = null
      this.data.type = null
    },
    handleReload () {
      this.HandleGetProfile()
      this.HandleGetBranchOffice()
      this.$refs.create.resetValidation()
      this.handleFormReset()
    }
  }
}
</script>
