<template>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 gt-sm">
      <q-page class="flex flex-center">
        <lottie-animation :width="500" :height="500" path="statics/lottie/ok.json" />
      </q-page>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <q-page class="flex flex-center">
        <q-form @submit="handlePostLogin" @reset="onReset" class="q-gutter-md" style="width: 70%">
          <p class="q-pb-sm text-logo text-center text-h5 text-bold">OK APRENDE INGLES</p>
          <q-input
            rounded
            dense
            v-model="auth.email"
            label="Correo Electronico"
            type="email"
            :rules="[val => !!val || 'El campo es requerido']"
          />
          <q-input
            rounded
            dense
            v-model="auth.password"
            label="Contraseña"
            :type="this.show.password.type"
            :rules="[val => !!val || 'El campo es requerido']"
          >
            <template v-slot:append>
              <q-btn
                @click="handleStatePassword"
                round
                color="white"
                text-color="black"
                size="xs"
                :icon="show.password.icon"
              />
            </template>
          </q-input>
          <q-checkbox keep-color color="bg-theme" v-model="auth.remember" label="Recuerdame" />
          <div class="flex flex-center">
            <q-btn
              color="white"
              style="background: #44668e !important;"
              label="Entrar"
              type="submit"
              size="sm"
              icon="lock_open"
            />
          </div>
        </q-form>
      </q-page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      auth: {
        remember: false,
        password: null,
        email: null
      },
      show: {
        password: {
          state: false,
          icon: 'eva-eye-off-2-outline',
          type: 'password'
        }
      } }
  },
  mounted () {
    this.handleAuthReady()
  },
  methods: {
    handleAuthReady () {
      if (this.$auth.check()) {
        this.$router.push({ name: 'panel.index' })
      }
    },
    handleStatePassword () {
      if (this.show.password.state) {
        this.show.password.state = false
        this.show.password.icon = 'eva-eye-off-2-outline'
        this.show.password.type = 'password'
      } else {
        this.show.password.state = true
        this.show.password.icon = 'eva-eye-outline'
        this.show.password.type = 'text'
      }
    },
    handlePostSubmit () {
      if (this.auth.remember !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'eva-alert-triangle-outline',
          position: 'top',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
          position: 'top'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    },
    handlePostLogin () {
      this.$auth
        .login({
          data: {
            email: this.auth.email,
            password: this.auth.password,
            remember: this.auth.remenber
          },
          rememberMe: true,
          fetchUser: false
        })
        .then(response => {
          this.$auth.fetch().then(response => {
            this.$router.push({ name: 'panel.index' })
          })
        })
        .catch(response => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'eva-alert-triangle-outline',
            position: 'top',
            message: 'El correo electronico y/o la contraseña son incorrectos'
          })
        })
    }
  }
}
</script>
<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Acme&display=swap");
.text-logo {
  letter-spacing: 2px;
  color: #44668e;
  font-family: "Acme", sans-serif;
}
.bg-theme {
  background: #44668e !important;
}
</style>
