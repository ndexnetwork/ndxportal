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
                        {{$store.state.apiText}} Block<i class="el-icon-arrow-down el-icon--right"></i>
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
    font: 400 1rem/1.625rem "Ubuntu",source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace, sans-serif;
    margin: 0;
    background: #fafbff;
}

a {
    text-decoration: none !important;
    color: #606266;
}

.el_head{
    background-color: #1852b7 !important;
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
    -webkit-box-shadow: 2px 2px 12px 3px rgba(0,0,0,0.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    border-radius: 10px; background-color: #ffffff;
}
.el-card__header {
    padding: 18px 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #020202;
    font-weight: 600;
    font-size: 20px;
}
.el-table thead {
    color: #404144;
    font-size: 16px;
    font-weight: 600;
}
.el-table {
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #86888d;
    font-weight: 600;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
}
.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
    line-height: 20px;
}
.el-form-item__label {
    text-align: left;
    float: left;
    font-size: 14px;
    color: #101010;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: 600;
}
.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    color: #86888d;
    font-weight: 600;
}
.el-collapse-item__header {
    height: 48px;
    line-height: 48px;
    color: #409EFF;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
    font-size: 13px;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    -o-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
}
.el-message-box {
    display: inline-block;
    width: 60%;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.el_head .logoTxt {
    font-weight: bold;
    font-size: 12px;
    float: left;
    color: #fff;
    line-height: normal;
    margin-left: 5px;
    margin-top: 20px;
}
.el-dropdown {
    display: inline-block;
    position: relative;
    font-size: 12px;
}
.footer {
    background: #ffffff;
    line-height: normal;
    text-align: center;
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #9a9fb3;
}
</style> 
