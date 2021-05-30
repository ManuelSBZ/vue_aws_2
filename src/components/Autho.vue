<template>
<v-row justify="center" class="mt-10">
  <amplify-authenticator></amplify-authenticator>
</v-row>
</template>


<script>
import { Auth} from 'aws-amplify'
import {AmplifyEventBus} from 'aws-amplify-vue'

export default {
name:"Autho",
async mounted () {
AmplifyEventBus.$on("authState", eventInfo =>{
  if (eventInfo === "signedIn"){
    this.$router.push({name:"todo"}).catch((error) => console.log(error))
  }else if (eventInfo==="signedOut"){
    this.$router.push({name:"Auth"}).catch((error) => console.log(error))
  }
})

try {
    const user = await Auth.currentAuthenticatedUser()
    this.$store.dispatch('toggle', true)
    let details = user.attributes 
    details.username = user.username
    this.$store.dispatch('setuser', details)
    this.$router.push({name:"todo"}).catch((error) => console.log(error))

  } catch (error) {
    this.$store.dispatch('toggle', false)
    this.$store.dispatch('setuser', {})
    this.$router.push({name:"Auth"}).catch((error) => console.log(error))
  }
}
}
</script>
