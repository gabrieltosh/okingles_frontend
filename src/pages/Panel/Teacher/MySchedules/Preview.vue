<template>
    <div>
        <div class="q-px-md q-pt-md q-gutter-sm">
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Inicio" icon="eva-grid-outline" to="/" />
              <q-breadcrumbs-el label="Dias" icon="eva-grid-outline" :to="{name:'myschedules.days'}" />
              <q-breadcrumbs-el label="Horarios" icon="eva-grid-outline" :to="{name:'myschedules.schedule', params: {day: $route.params.day}}"/>
              <q-breadcrumbs-el label="Estudiantes" icon="eva-grid-outline" :to="{name:'myschedules.student', params: {day: $route.params.day,schedule: $route.params.schedule}}"/>
              <q-breadcrumbs-el label="Preview Cuestionario"   />
            </q-breadcrumbs>
        </div>
        <div class="q-pa-md">
            <q-card class="my-card">
                <div class="row q-pa-md">
                    <div class="col-12">
                        <div class="text-bold text-subtitle1 text-center">{{$route.params.questionnaire.title}}</div>
                    </div>
                </div>
                <div class="row q-mx-lg q-pb-lg"  v-for="(question,index) in data.questions" :key="index">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                      <div class="row">
                        <div class="col-sm-6 col-xs-12 col-md-6 col-lg-6">
                          <div class="text-subtitle1">
                          <q-icon v-if="data.answer[index].check===null" name="las la-question-circle" class="text-blue-grey" size="lg" />
                          <q-icon v-if="data.answer[index].check==='yes'" name="las la-check-circle" class="text-green" size="lg" />
                          <q-icon v-if="data.answer[index].check==='not'" name="las la-times-circle" class="text-red" size="lg" />
                          <q-icon v-if="data.answer[index].check==='confirmation'" name="las la-pause-circle" class="text-orange" size="lg" />
                            {{index+1+'.- '+question.question}}
                          </div>
                        </div>
                        <div class="col-sm-6 col-xs-12 col-md-6 col-lg-6 q-gutter-xs text-right">
                          <div v-if="question.answer_valid.length>0">
                            <q-chip color="teal" text-color="white" icon="bookmark" v-for="(answer,index) in question.answer_valid" :key="index" >
                              {{answer.answer}}
                            </q-chip>
                          </div>
                          <div v-if="question.type==='Rango'">
                            <q-chip color="orange" text-color="white" icon="bookmark">
                              Esta pregunta se revisa manualmente
                            </q-chip>
                          </div>
                          <div v-if="question.type==='Pregunta Abierta'">
                            <q-chip color="orange" text-color="white" icon="bookmark">
                              Esta pregunta se revisa manualmente
                            </q-chip>
                          </div>
                          <div v-if="handleNoAnswer(question)">
                            <q-chip color="red" text-color="white" icon="bookmark">
                              No hay respuestas
                            </q-chip>
                          </div>
                        </div>
                      </div>
                      <div class="q-gutter-md text-center" v-if="question.type==='Selección'">
                        <q-radio v-model="data.answer[index]['select'+question.id]" :val="option.option" :label="option.option" color="Cyan" v-for="(option,index2) in question.options" :key="index2"/>
                      </div>
                      <div class="q-gutter-md text-center" v-if="question.type==='Si / No'">
                        <q-radio v-model="data.answer[index]['yesnot'+question.id]" :val="option.option" :label="option.option.replace('yes:', '').replace('not:','')" :color="handleColorYesNo(option.option)" v-for="(option,index2) in question.options" :key="index2"/>
                      </div>
                      <div class="q-gutter-md text-center q-px-lg" v-if="question.type==='Pregunta Abierta'">
                        <q-input color="primary" v-model="data.answer[index]['question'+question.id]" placeholder="Respuesta" dense></q-input>
                      </div>
                      <div class="q-gutter-md text-center" v-if="question.type==='Selección Multiple'">
                        <q-checkbox :true-value="option.option" keep-color v-model="data.answer[index]['selectmulti'+question.id]"  :val="option.option"  :label="option.option" color="teal" v-for="(option,index2) in question.options" :key="index2" />
                      </div>
                      <div class="q-gutter-md text-center" v-if="question.type==='Rango'">
                          <q-rating
                            v-model="data.answer[index]['range'+question.id]"
                            size="2em"
                            :max="option.option.replace('range:', '')"
                            color="teal"
                            v-for="(option,index2) in question.options" :key="index2"
                          />
                      </div>
                    </div>
                </div>
                  <div class="q-gutter-md col-12 q-pb-md" align="center">
                      <q-btn rounded label="Cerrar" color="primary" :to="{name:'myschedules.student', params: {day: $route.params.day,schedule: $route.params.schedule}}"/>
                      <q-btn rounded @click="handleCheck" label="Revisar" color="teal" />
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
        questions: [],
        answer: []
      },
      color: null,
      cyan: null,
      ratingModel: null
    }
  },
  computed: {

  },
  mounted () {
    this.handleGetQuestionPreview()
  },
  methods: {
    handleNoAnswer (question) {
      if (question.type === 'Selección' || question.type === 'Si / No' || question.type === 'Selección Multiple') {
        if (question.answer_valid.length === 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    handleCheck () {
      this.data.answer.forEach(element => {
        var count = 0
        element.answer_valid.forEach((item, index) => {
          // const name = 'select'.concat(element.element.question_id)
          if (element.type === 'Selección') {
            if (element[Object.keys(element)[0]]) {
              if (item.answer.toLowerCase() === element[Object.keys(element)[0]].toLowerCase()) {
                element.check = 'yes'
              } else {
                element.check = 'not'
              }
            }
          }
          if (element.type === 'Si / No') {
            if (element[Object.keys(element)[0]]) {
              if (item.answer.toLowerCase() === (element[Object.keys(element)[0]].replace('yes:', '').replace('not:', '')).toLowerCase()) {
                element.check = 'yes'
              } else {
                element.check = 'not'
              }
            }
          }
          if (element.type === 'Selección Multiple') {
            if (element[Object.keys(element)[0]].length > 0) {
              if (element[Object.keys(element)[0]].includes(item.answer.toLowerCase())) {
                count++
              } else {
                element.check = 'not'
              }
            } else {
              element.check = 'not'
            }
            if (count === element.answer_valid.length) {
              element.check = 'yes'
            }
          }
        })
        if (element.type === 'Pregunta Abierta') {
          element.check = 'confirmation'
        }
        if (element.type === 'Rango') {
          element.check = 'confirmation'
        }
      })
    },
    handleColorYesNo (option) {
      var string = option.split(':')
      if (string[0] === 'yes') {
        return 'green'
      } else {
        if (string[0] === 'not') {
          return 'red'
        }
      }
    },
    handleGetQuestionPreview () {
      var url = '/panel/teacher/get/questions/preview'
      this.$axios.post(url, this.$route.params.questionnaire).then(response => {
        this.data.questions = response.data
        response.data.forEach(element => {
          if (element.type === 'Selección') {
            this.data.answer.push({
              ['select'.concat(element.id)]: null,
              user_id: this.$auth.user().user.id,
              type: element.type,
              question_id: element.id,
              answer_valid: element.answer_valid,
              check: null
            })
          }
          if (element.type === 'Si / No') {
            this.data.answer.push({
              ['yesnot'.concat(element.id)]: null,
              user_id: this.$auth.user().user.id,
              type: element.type,
              question_id: element.id,
              answer_valid: element.answer_valid,
              check: null
            })
          }
          if (element.type === 'Pregunta Abierta') {
            this.data.answer.push({
              ['question'.concat(element.id)]: null,
              user_id: this.$auth.user().user.id,
              type: element.type,
              question_id: element.id,
              answer_valid: element.answer_valid,
              check: null
            })
          }
          if (element.type === 'Selección Multiple') {
            this.data.answer.push({
              ['selectmulti'.concat(element.id)]: [],
              user_id: this.$auth.user().user.id,
              type: element.type,
              question_id: element.id,
              answer_valid: element.answer_valid,
              check: null
            })
          }
          if (element.type === 'Rango') {
            this.data.answer.push({
              ['range'.concat(element.id)]: 0,
              user_id: this.$auth.user().user.id,
              type: element.type,
              question_id: element.id,
              answer_valid: element.answer_valid,
              check: null
            })
          }
        })
        console.log(this.data.answer)
      })
    }
  }
}
</script>
