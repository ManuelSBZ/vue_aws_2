<template>
<v-card class="ma-16" color="rgb(156, 163, 213)">
  <v-card-title>This is a simple calculator</v-card-title>
<v-row justify="center" class="pa-10">
  <v-col cols="6" class="justify-end">
     <v-text-field
      label="first operand"
      hide-details="auto"
      v-model="operandOne"
    ></v-text-field>
  </v-col>  
  <v-col cols="6" class="justify-start">
     <v-text-field
      label="second operand"
      hide-details="auto"
      v-model="operandTwo"
    ></v-text-field>
  </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn @click="onclick">
        sumar
      </v-btn>
    </v-col>
    <v-col>result : {{this.result.result}}</v-col>
    <v-col> 
      <v-btn @click="onclick2">
       api task get
      </v-btn>
      <v-btn @click="post">
       api task post
      </v-btn>
      <v-btn @click="Delete">
       api task delete
      </v-btn>
      <v-btn @click="update">
       api task update
      </v-btn>
    </v-col>
</v-row>
</v-card>
</template>
<script>
import todoService from "@/services/todoService"
import {AmplifyEventBus} from 'aws-amplify-vue'
export default {
  name:"About",
async mounted () {
AmplifyEventBus.$on("authState", eventInfo =>{
 if (eventInfo==="signedOut"){
    this.$router.push({name:"Auth"}).catch((error) => console.log(error))
  }
})},
  data () {
    return {
    operandOne: 0,
    operandTwo: 0,
    result: "Nan"
    }
  },
  methods:{
    async onclick(){
      this.result = await todoService.postAdd(this.operandOne, this.operandTwo)
    },
    async onclick2(){
      const result = await todoService.getTasks()
      console.log(JSON.stringify(result))
    },
    async post(){
            const result = await todoService.postTasks({
              description:"esto es una tarea",
              done:false,
              responsible:"manuel"
            })
      console.log(JSON.stringify(result))
    },
    async update(){
            const result = await todoService.updateTasks({
              description:"esto es una tarea",
              done:false,
              responsible:"manuel",
              id: "vnibdzpwsjckp9180lr"
            })
      console.log(JSON.stringify(result))
    },
    async Delete(){
        console.log("delete")
        const result = await todoService.deleteTasks("ss5k1jxp19kp83m605")
        console.log(JSON.stringify(result))
    }
  }
}
</script>
