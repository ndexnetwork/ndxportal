<template>
    <el-container>
        <fhead></fhead>
        <el-main >
            <el-breadcrumb class="center" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/blocks' }">所有区块</el-breadcrumb-item>
                <el-breadcrumb-item>区块高度</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card  v-loading="loading" class="box-card center" style="margin-top: 16px">
                <div slot="header" class="clearfix">
                    <span>{{height}}</span>
                    <el-button @click="update(0)" style="float: right; padding: 3px 0" type="text">下一个区块</el-button>
                    <el-button @click="update(1)" style="float: right; padding: 3px 0;margin-right: 20px" type="text">上一个区块</el-button>
                </div>

                <el-form  size="mini"  label-width="100px" >
                    <el-form-item label="区块id">
                        {{Blocks.block}}
                    </el-form-item>
                    <el-form-item label="区块高度">
                        {{Blocks.height}}
                    </el-form-item>
                    <el-form-item label="区块时间">
                        {{$g.wallet.formatDateTime(Blocks.timestamp*1000+($store.state.epochBeginning-500))}}
                    </el-form-item>
                    <el-form-item label="区块锻造者">
                        <router-link :to="'/account/'+Blocks.generatorRS">
                            <el-button style="font-size: 14px" type="text"> {{Blocks.generatorRS}}</el-button>
                        </router-link>
                    </el-form-item>
                    <el-form-item label="区块交易数">
                        {{Blocks.transactions.length}}
                    </el-form-item>
                    <el-form-item label="总转账数量">
                        {{$g.wallet.amount(Blocks.totalAmountNQT)}}
                    </el-form-item>
                    <el-form-item label="区块交易费">
                        {{$g.wallet.amount(Blocks.totalFeeNQT)}}
                    </el-form-item>
                </el-form>

                <el-collapse v-model="activeNames">
                    <el-collapse-item title="交易信息列表" name="1">
                        <el-table
                                :data="Blocks.transactions"
                                border
                                style="width: 100%">
                            <el-table-column
                                    label="发送地址"
                                    width="280">
                                <template slot-scope="scope">
                                    <router-link :to="'/account/'+scope.row.senderRS">
                                        <el-button type="text"> {{scope.row.senderRS}}</el-button>
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="接收地址"
                                    width="280">
                                <template slot-scope="scope">
                                    <router-link :to="'/account/'+scope.row.recipientRS">
                                        <el-button type="text"> {{scope.row.recipientRS}}</el-button>
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="数量"
                                    width="180">
                                <template slot-scope="scope">
                                    {{$g.wallet.amount(scope.row.amountNQT)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="手续费"
                                    width="180">
                                <template slot-scope="scope">
                                    {{$g.wallet.amount(scope.row.feeNQT)}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-main>
        <el-footer class="footer">
            COPYRIGHT © 2018. ALL RIGHTS RESERVED. DESIGNED BY
            <a target="_blank" href="https://nexbit.io/">NEXBIT</a>
        </el-footer>
    </el-container>
</template>


<script>
    import fhead from '../fhead.vue';
    export default {
        name: 'block',
        data () {
            return {
                loading:true,
                height:0,
                Blocks:{
                    transactions:[]
                },
                activeNames:[0]
            }
        },
        components: {
            fhead
        },
        methods: {
            update(state){
                if(state==0){
                    this.height++;
                }else{
                    this.height--;
                }
                this.$router.push('/block/'+this.height);
                this.load();
            },
            load(){
                this.activeNames=[0];
                this.loading=true;
                this.Blocks={
                    transactions:[]
                }
                this.height=this.$route.params.height;
                if(!this.height){
                    this.$router.replace('blocks');
                }
                this.loading=true;
                this.$ajax({
                    method: 'get',
                    url: 'requestType=getBlock&height='+this.height+'&includeTransactions=true',
                })
                    .then(response => {
                    if(response.errorCode){
                        this.$alert('高度错误', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.replace('/blocks');
                            }
                        });
                    }else{
                        this.Blocks=response;
                        this.loading=false;
                    }
                });
            }
        },
        created: function () {
            this.load()
        },
        watch: {
            '$route' (to, from) {
                this.load()
            }
        }
    }
</script>


<style scoped>
</style>  
