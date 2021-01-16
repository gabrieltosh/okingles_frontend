<template>
<div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Usuario" icon="eva-map-outline" :to="{name:'user.list'}" />
            <q-breadcrumbs-el label="Editar"/>
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-form @submit="HandleUpdateUser" @reset="handleFormReset">
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
                            <q-input rounded dense v-model="data.name" label="Nombre" lazy-rules :rules="[ val => !!val || 'El campo es requerido']" >
                                <template v-slot:prepend>
                                    <q-icon name="eva-credit-card-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-input rounded dense v-model="data.lastname" label="Apellido" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-credit-card-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-input rounded dense v-model="data.ci" label="Carnet de Identidad"  lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-edit-2-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                            <q-input rounded dense v-model="data.email" label="Correo Electronico" type="email"  lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                                <template v-slot:prepend>
                                    <q-icon name="eva-email-outline" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.occupation" label="Ocupación" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-briefcase-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.address" label="Dirección" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-book-open-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.phone" type="tel" label="Celular" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-phone-outline" />
                              </template>
                          </q-input>
                        </div>
                         <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.invoice" label="Factura" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                          <q-input rounded dense v-model="data.registter" label="Registro" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                         <div class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
                           <q-input rounded dense v-model="data.due_date" mask="date" label="Fecha Finalización" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
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
                           <q-input rounded dense v-model="data.birthdate" mask="date" label="Fecha Cumpleaños" lazy-rules :rules="[ val => !!val || 'El campo es requerido']">
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
                        <q-btn rounded label="Actualizar" type="submit" color="primary" />
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
        id: this.$route.params.data.id,
        name: this.$route.params.data.name,
        lastname: this.$route.params.data.lastname,
        ci: this.$route.params.data.ci,
        email: this.$route.params.data.email,
        occupation: this.$route.params.data.occupation,
        address: this.$route.params.data.address,
        password: this.$route.params.data.password,
        birthdate: this.$route.params.data.birthdate,
        due_date: this.$route.params.data.due_date,
        phone: this.$route.params.data.phone,
        invoice: this.$route.params.data.invoice,
        registter: this.$route.params.data.registter,
        image: null,
        profile_id: this.$route.params.data.profile_id,
        branch_office_id: this.$route.params.data.branch_office_id,
        type: this.$route.params.data.type
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
    HandleUpdateUser (evt) {
      var url = '/panel/user/post/update/user'
      this.$axios.post(url, this.data).then(response => {
        this.$router.push({ name: 'user.list' })
        this.$q.notify({
          color: 'positive',
          message: '¡ Usuario Editado exitosamente !',
          icon: 'eva-checkmark-circle-2-outline',
          progress: true
        })
      })
    },
    handleFormReset () {
      this.data.name = null
      this.data.city = null
      this.data.address = null
    }
  }
}
</script>
