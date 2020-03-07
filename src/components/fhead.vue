<template>
    <el-header class="el_head">
      <div class="center">
          <el-row type="flex">
              <el-col :span="24">
                  <router-link to="/">
                     <img class="img" src="./../assets/ndx-logo.png"/>
                     <div class="logoTxt"> nDEX Portal <br> NDX Block Explorer </div>
                  </router-link>
                  <el-dropdown class="el_dropdown" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{$store.state.apiText}}Block<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="blocks">Blocks</el-dropdown-item>
                          <el-dropdown-item command="peers">Peers</el-dropdown-item>
                          <el-dropdown-item command="generators">Generators</el-dropdown-item>
                          <a target="_blank" href="/#/?type=NDX">
                              <el-dropdown-item divided>NDX 
                          </el-dropdown-item></a>
                          <a target="_blank" href="/#/?type=NXT">
                              <el-dropdown-item>NXT</el-dropdown-item>
                          </a>
                          <a target="_blank" href="/#/?type=ARDR">
                              <el-dropdown-item>ARDR </el-dropdown-item>
                          </a>
                          <a target="_blank" href="/#/?type=APL">
                              <el-dropdown-item>APL </el-dropdown-item>
                          </a>
                      </el-dropdown-menu>
                  </el-dropdown>
                  <el-button @click="search" style="float: right;margin-top: 10px;" icon="el-icon-search" circle></el-button>
              </el-col>
          </el-row>
      </div>
    </el-header>

    <!--<el-container>-->

    <!--</el-container>-->
</template>


<script>
    export default {
        name: 'fhead',
        methods: {
            handleCommand(command) {
                if(command&&command.indexOf("type")==-1){
                    this.$router.push('/'+command)
                }
            },
            search(){
                this.$prompt('Please Enter Account Address / Block Height', 'Search', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                }).then(({ value }) => {
                    if(value.indexOf('-')!=-1){
                        this.$router.replace('/account/'+value);
                    }else{
                        this.$router.replace('/block/'+value);
                    }

                })
            }
        }
    }
</script>


<style  lang="less">
body {
    font: 400 1rem/1.625rem "Cabin", sans-serif;
    margin: 0;
    background: #13182d;
}

a {
    text-decoration: none !important;
    color: #606266;
}

.el_head{
    background-color: #202644 !important;
    box-shadow: 0 1px 0px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24)!important;
.el-dropdown-link{
    color: #fff;
}

.el_dropdown{
    margin-top: 25px;margin-left: 20px;
}

.img{float: left;width: 40px;margin-top: 10px;}

.logoTxt{font-weight: bold;font-size: 16px;float: left;color: #fff;margin: 5px;}
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 2px 2px 12px 3px rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
    border-radius: 10px; background-color: #202644;

}
</style> 
