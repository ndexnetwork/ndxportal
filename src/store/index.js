import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        epochBeginning:"",
        api:'https://seed.npay.life/nxt?',
        apiText:'NDX'
    }
})
