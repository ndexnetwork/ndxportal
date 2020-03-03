<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    created: function () {
      let type=this.$route.query.type;
        if(type) {
          type=type.toLowerCase()
          if(type=='ndx'){
              this.$store.state.api='http://seed.npay.life/nxt?'
              this.$store.state.apiText="NDX"
          }
          if(type=='nxt'){
              this.$store.state.api='http://nxterchina.org/nxt?'
              this.$store.state.apiText="NXT"
          }
          if(type=='ardr'){
              this.$store.state.api='http://ardor.jelurida.com/nxt?'
              this.$store.state.apiText="ARDR"
          }
          if(type=='apl'){
              this.$store.state.api='https://apollowallet.org/apl?'
              this.$store.state.apiText="APL"
          }
      }
        this.$ajax({
            method: 'get',
            url: 'requestType=getConstants',
        }).then(response => {
            this.$store.state.epochBeginning=response.epochBeginning;
        });
    },
    watch: {
        '$route' (to, from) {
            this.$router.replace({
                path: this.$route.path,
                query: {
                    type:this.$store.state.apiText,
                }
            })
        }
    }
}
</script>

<style lang="less">
  .el-form-item__content{
    word-wrap: break-word;
    word-break: normal;
  }
  .footer{
    background: #FAFAFA;line-height: 60px;text-align: center;color: #606266;
    a{
      color: #606266
    }
  }
  .center{
    max-width: 1280px;margin: 0 auto
  }
html,body,#app,.el-container{
  height: 100%;
}
</style>
