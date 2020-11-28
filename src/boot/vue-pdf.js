import pdf from 'vue-pdf'
import VueDocPreview from 'vue-doc-preview'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
export default ({ Vue }) => {
  Vue.component('pdf', pdf)
  Vue.component('VueDocPreview', VueDocPreview)
}
