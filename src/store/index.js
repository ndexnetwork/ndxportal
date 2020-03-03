import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        epochBeginning:"",
        api:'http://ndxworld.npay.life/nxt?',
        apiText:'NDX'
    }
})
