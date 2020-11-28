<template>
    <div>
    <div class="q-px-md q-pt-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
            <q-breadcrumbs-el label="Cuestionarios" :to="{name:'questionnaires.list'}" />
            <q-breadcrumbs-el label="Detalle"  />
        </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-subtitle1 text-bold">{{$route.params.questionnaire.title}}</div>
            </div>
            <div class="col">
              <q-btn icon="eva-file" @click="handleShowPreview()" label="Previsualizar" size="sm" rounded color="primary"></q-btn>
            </div>
            <div class="col-auto">
              <q-btn icon="las la-plus" @click="dialog.create=true" label="Crear Pregunta" size="sm" rounded color="primary"></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-dialog v-model="dialog.create">
        <q-card class="my-card q-mb-md">
            <q-form @submit="handleStoreQuestion" @reset="handleFormReset" ref="FormQuestion">
                <q-card-section>
                    <div class="text-subtitle1" align="center">Crear Pregunta</div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-input label-slot rounded dense v-model="data.question.question" label="Pregunta *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-input type="number" rounded dense v-model="data.question.order_by" label="Nº Orden *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                              <template v-slot:prepend>
                                  <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-select behavior="menu" label="Tipo Pregunta *" clearable rounded v-model="data.question.type" :options="options" dense lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                              <template v-slot:prepend>
                                <q-icon name="eva-pin-outline" />
                              </template>
                          </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-file accept=".jpg, image/*" rounded dense v-model="data.question.file_upload" label="Archivo">
                              <template v-slot:prepend>
                                  <q-icon name="eva-pin-outline" />
                              </template>
                          </q-file>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-input rounded dense v-model="data.question.description" label="Descripción">
                              <template v-slot:prepend>
                                <q-icon name="eva-pin-outline" />
                              </template>
                          </q-input>
                        </div>
                    </div>
                    <div align="center">
                        <q-btn rounded label="Guardar" type="submit" color="primary" />
                    </div>
                </q-card-section>
            </q-form>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialog.edit">
        <q-card class="my-card q-mb-md">
            <q-form @submit="handleUpdateQuestion" @reset="handleFormReset" ref="FormQuestion">
                <q-card-section>
                    <div class="text-subtitle1" align="center">Editar Pregunta</div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-input label-slot rounded dense v-model="data.edit.question.question" label="Pregunta *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                              <template v-slot:prepend>
                                <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-input type="number" rounded dense v-model="data.edit.question.order_by" label="Nº Orden *" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                              <template v-slot:prepend>
                                <q-icon name="eva-edit-2-outline" />
                              </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                          <q-input rounded dense v-model="data.edit.question.description" label="Descripción">
                              <template v-slot:prepend>
                                <q-icon name="eva-pin-outline" />
                              </template>
                          </q-input>
                        </div>
                    </div>
                    <div align="center">
                      <q-btn rounded label="Crear" type="submit" color="primary" />
                    </div>
                </q-card-section>
            </q-form>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialog.property">
        <q-card class="my-card q-mb-md" style="width: 410px">
          <q-form @submit="handleStoreOptions()" @reset="handleFormReset" ref="FormQuestion">
            <q-card-section>
              <div v-if="handleSelectAndMultiple">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Añadir Opciones</div>
                  </div>
                  <div class="col-auto">
                    <q-btn size="sm" rounded color="primary" icon="eva-plus" label="Añadir Opcion" @click="handleAddInput('select')"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                    <q-input v-for="(item,index) in input.options" :key="index" label-slot rounded dense v-model="item.value" :label="'Opcion '+index+'*'" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                      <template v-slot:prepend>
                        <q-icon name="eva-edit-2-outline" />
                      </template>
                      <template v-slot:after>
                        <q-btn size="sm" round  color="red" icon="eva-trash-2-outline" @click="handleDeleteInput('select',index)"/>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div align="center">
                  <q-btn rounded label="Guardar" type="submit" color="primary" size="0.9em"/>
                </div>
              </div>
              <div v-if="handleYesNo">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Añadir Opcion de SI/NO</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                    <q-input label-slot rounded dense v-model="input.yes" label="Texto por SI" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                      <template v-slot:prepend>
                        <q-icon name="eva-edit-2-outline" />
                      </template>
                    </q-input>
                    <q-input label-slot rounded dense v-model="input.not" label="Texto por NO" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                      <template v-slot:prepend>
                        <q-icon name="eva-edit-2-outline" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div align="center">
                  <q-btn v-if="(data.options).length === 0" rounded label="Guardar" type="submit" color="primary" size="0.9em"/>
                </div>
              </div>
              <div v-if="handleRange">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Añadir Opcion de Rango</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                    <q-input type="number" label-slot rounded dense v-model="input.range" label="Rango maximo" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']">
                      <template v-slot:prepend>
                        <q-icon name="eva-edit-2-outline" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div align="center">
                  <q-btn rounded label="Guardar" type="submit" color="primary" size="0.9em"/>
                </div>
              </div>
              <div class="q-gutter-xs q-mt-sm text-center">
                <div class="text-subtitle1 text-bold text-center">Lista de Opciones</div>
                <q-chip outline  v-for="(item,index) in data.options" :key="index" removable @remove="handleRemoveOption('select',item)" color="teal" text-color="white" icon="eva-edit-outline">
                  {{item.option}}
                </q-chip>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialog.answer">
        <q-card class="my-card q-mb-md" style="width: 410px">
          <q-form @submit="handleStoreAnswers()" @reset="handleFormReset" ref="FormQuestion">
            <q-card-section>
              <div v-if="handleAnswerSelectAndYesNot">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Añadir Respuesta</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                      <q-input label-slot rounded dense v-model="input.answer" label="Respuesta Correcta" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                        <template v-slot:prepend>
                          <q-icon name="eva-edit-2-outline" />
                        </template>
                      </q-input>
                  </div>
                </div>
                <div align="center">
                  <q-btn rounded label="Guardar" type="submit" color="primary" size="0.9em"/>
                </div>
              </div>
              <div v-if="handleAnswerMultipleAndOpen">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Añadir Respuestas</div>
                  </div>
                  <div class="col-auto">
                    <q-btn size="sm" rounded color="primary" icon="eva-plus" label="Añadir Opcion" @click="handleAddInput('answer')"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                      <q-input v-for="(item,index) in input.answers" :key="index" label-slot rounded dense v-model="item.value" :label="'Opcion '+index+'*'" lazy-rules :rules="[ val => val && val.length > 0 || 'El campo es requerido']" >
                        <template v-slot:prepend>
                          <q-icon name="eva-edit-2-outline" />
                        </template>
                        <template v-slot:after>
                          <q-btn size="sm" round  color="red" icon="eva-trash-2-outline" @click="handleDeleteInput('answer',index)"/>
                        </template>
                      </q-input>
                  </div>
                </div>
                <div align="center">
                  <q-btn rounded label="Guardar" type="submit" color="primary" size="0.9em"/>
                </div>
              </div>
              <div class="q-gutter-xs q-mt-sm text-center">
                <div class="text-subtitle1 text-bold">Respuestas</div>
                <q-chip outline  v-for="(item,index) in data.answers" :key="index" removable @remove="handleRemoveOption('answer',item)" color="teal" text-color="white" icon="eva-edit-outline">
                  {{item.answer}}
                </q-chip>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-6 col-md-6 " v-for="(item,index) in data.questions" :key="index">
          <q-card class="my-card" >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                   <img :src="require('../../../../statics/images/modules/teacher/questionary/question.png')">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{index+1+' '+item.question}}</q-item-label>
                <q-item-label caption v-if="item.description">
                  {{item.description}}
                </q-item-label>
              </q-item-section>
               <q-item-section top side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-badge align="middle" color="teal">
                       {{item.type}}
                    </q-badge>
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable @click="handleShowProperty('answer',item)" v-if="item.type!=='Rango'">
                            <q-item-section>Añadir Respuesta</q-item-section>
                          </q-item>
                          <q-item clickable @click="handleShowProperty('select',item)" v-if="item.type!=='Pregunta Abierta'">
                            <q-item-section>Caracteristicas</q-item-section>
                          </q-item>
                          <q-item clickable @click="handleEditQuestion(item)">
                            <q-item-section>Editar</q-item-section>
                          </q-item>
                          <q-item clickable @click="handleDeleteQuestion(item)">
                            <q-item-section>Eliminar</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </q-item-section>
            </q-item>
            <q-separator space />
          </q-card>
          </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      options: [
        'Si / No', 'Pregunta Abierta', 'Selección', 'Selección Multiple', 'Rango'
      ],
      data: {
        question: {
          question: null,
          order_by: null,
          type: null,
          file_upload: null,
          file: null,
          description: null,
          questionnaire_id: null
        },
        questions: {},
        edit: {
          question: {}
        },
        options: [],
        answers: []
      },
      input: {
        options: [],
        answers: [],
        answer: null,
        yes: null,
        not: null,
        range: null,
        countOption: 1
      },
      dialog: {
        create: false,
        edit: false,
        property: false,
        answer: false
      },
      question: {}
    }
  },
  mounted () {
    this.handleGetQuestions()
  },
  computed: {
    handleAnswerSelectAndYesNot () {
      if ((this.question.type === 'Si / No' || this.question.type === 'Selección') && (this.data.answers).length === 1) {
        return false
      } else {
        if ((this.question.type === 'Si / No' || this.question.type === 'Selección') && (this.data.answers).length === 0) {
          return true
        } else {
          return false
        }
      }
    },
    handleAnswerMultipleAndOpen () {
      if (this.question.type === 'Selección Multiple' || this.question.type === 'Pregunta Abierta') {
        return true
      } else {
        return false
      }
    },
    handleYesNo () {
      if (this.question.type === 'Si / No' && (this.data.options).length === 2) {
        return false
      } else {
        if (this.question.type === 'Si / No' && (this.data.options).length === 0) {
          return true
        } else {
          return false
        }
      }
    },
    handleSelectAndMultiple () {
      if (this.question.type === 'Selección' || this.question.type === 'Selección Multiple') {
        return true
      } else {
        return false
      }
    },
    handleRange () {
      if (this.question.type === 'Rango' && (this.data.options).length === 1) {
        return false
      } else {
        if (this.question.type === 'Rango' && (this.data.options).length === 0) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    handleShowPreview () {
      this.$router.push({
        name: 'questionnaires.preview',
        params: {
          questionnaire: this.$route.params.questionnaire
        }
      })
    },
    handleRemoveOption (type, item) {
      switch (type) {
        case 'select':
          var url = '/panel/teacher/delete/option'
          this.$axios.post(url, item).then(response => {
            this.handleGetOptions()
          })
          break
        case 'answer':
          var url1 = '/panel/teacher/delete/answer'
          this.$axios.post(url1, item).then(response => {
            this.handleGetAnswers()
          })
          break
      }
    },
    handleStoreOptions () {
      switch (this.question.type) {
        case 'Selección':
        case 'Selección Multiple':
          var url = '/panel/teacher/store/options'
          this.$axios.post(url, this.input.options).then(response => {
            this.input.options = []
            this.input.countOption = 1
            this.handleGetOptions()
          })
          break
        case 'Si / No':
          var url1 = '/panel/teacher/store/option/yesnot'
          this.$axios.post(url1, {
            yes: this.input.yes,
            not: this.input.not,
            question_id: this.question.id
          }).then(response => {
            this.input.options = []
            this.input.countOption = 1
            this.handleGetOptions()
          })
          break
        case 'Rango':
          var url2 = '/panel/teacher/store/option/range'
          this.$axios.post(url2, {
            range: this.input.range,
            question_id: this.question.id
          }).then(response => {
            this.input.options = []
            this.input.countOption = 1
            this.handleGetOptions()
          })
          break
      }
    },
    handleStoreAnswers () {
      switch (this.question.type) {
        case 'Selección':
        case 'Si / No':
          var url = '/panel/teacher/store/answer'
          this.$axios.post(url, {
            answer: this.input.answer,
            question_id: this.question.id
          }).then(response => {
            this.input.answer = null
            this.handleGetAnswers()
          })
          break
        case 'Selección Multiple':
        case 'Pregunta Abierta':
          var url1 = '/panel/teacher/store/answers'
          this.$axios.post(url1, this.input.answers).then(response => {
            this.input.answers = []
            this.handleGetAnswers()
          })
          break
      }
    },
    handleDeleteInput (type, index) {
      switch (type) {
        case 'select':
          this.input.options.splice(index, 1)
          break
        case 'answer':
          this.input.answers.splice(index, 1)
          break
      }
    },
    handleAddInput (type) {
      switch (type) {
        case 'select':
          this.input.options.push({
            key: this.input.countOption,
            value: null,
            question_id: this.question.id
          })
          this.input.countOption++
          break
        case 'answer':
          this.input.answers.push({
            value: null,
            question_id: this.question.id
          })
          break
      }
    },
    handleShowProperty (type, item) {
      this.input.options = []
      this.question = item
      switch (type) {
        case 'select':
          this.dialog.property = true
          this.handleGetOptions()
          break
        case 'answer':
          this.dialog.answer = true
          this.handleGetAnswers()
          break
      }
    },
    handleGetAnswers () {
      this.data.answers = []
      var url = '/panel/teacher/get/answers'
      this.$axios.post(url, {
        'question_id': this.question.id
      }).then(response => {
        this.data.answers = response.data
      })
    },
    handleGetOptions (id) {
      this.data.options = []
      var url = '/panel/teacher/get/options'
      this.$axios.post(url, {
        'question_id': this.question.id
      }).then(response => {
        this.data.options = response.data
      })
    },
    handleEditQuestion (item) {
      this.data.edit.question = item
      this.dialog.edit = true
    },
    handleUpdateQuestion () {
      var url = '/panel/teacher/update/question'
      this.$axios.post(url, {
        'id': this.data.edit.question.id,
        'question': this.data.edit.question.question,
        'order_by': this.data.edit.question.order_by,
        'description': this.data.edit.question.description
      }).then(response => {
        this.handleGetQuestions()
        this.dialog.edit = false
        this.data.edit.question = {}
      })
    },
    handleStoreQuestion () {
      this.data.question.questionnaire_id = this.$route.params.questionnaire.id
      if (this.data.question.file_upload) {
        const fd = new FormData()
        fd.append('file', this.data.question.file_upload)
        var url = '/panel/teacher/upload/question'
        this.$axios.post(url, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
          this.data.question.file = response.data
          var url = '/panel/teacher/store/question'
          this.$axios.post(url, this.data.question).then(response => {
            this.handleFormReset()
            this.$refs.FormQuestion.resetValidation()
            this.handleGetQuestions()
            this.dialog.create = false
          })
        })
      } else {
        var url2 = '/panel/teacher/store/question'
        this.$axios.post(url2, this.data.question).then(response => {
          this.handleFormReset()
          this.$refs.FormQuestion.resetValidation()
          this.handleGetQuestions()
          this.dialog.create = false
        })
      }
    },
    handleGetQuestions () {
      var url = '/panel/teacher/get/question/data'
      this.$axios.post(url, {
        'questionnaire_id': this.$route.params.questionnaire.id
      }).then(response => {
        this.data.questions = response.data
      })
    },
    handleFormReset () {
      this.data.question.question = null
      this.data.question.order_by = null
      this.data.question.type = null
      this.data.question.file = null
      this.data.question.file_upload = null
      this.data.question.description = null
      this.data.question.questionnaire_id = null
    },
    handleDeleteQuestion (item) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿ Eliminar el Pregunta ?',
        ok: {
          color: 'primary',
          label: 'Aceptar',
          rounded: true,
          size: 'sm'
        },
        cancel: {
          label: 'Cancelar',
          size: 'sm',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        var url = '/panel/teacher/delete/question'
        this.$axios.post(url, item).then(response => {
          this.handleGetQuestions()
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
