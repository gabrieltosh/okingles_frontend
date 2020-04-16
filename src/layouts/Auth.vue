<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
     <q-footer elevated class="bg-theme text-center q-pa-sm">
        Copyright © 2019 OK Aprende Ingles. Todos los derechos reservados.
      </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
<style lang="css">
  .bg-theme {
    background-color: #01435b;
  }
</style>
