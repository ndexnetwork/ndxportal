<template>
    <el-container>
        <fhead></fhead>
        <el-main >
            <el-breadcrumb class="center" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>所有区块</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card class="box-card center" style="margin-top: 16px">
                <div slot="header" class="clearfix">
                    <span>区块</span>
                </div>
                <el-table class="center"
                          v-loading="BlocksLoading"
                          stripe
                          :data="BlocksData"
                          style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <el-table
                                    :data="scope.row.transactions"
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
                                        label="手续费">
                                    <template slot-scope="scope">
                                        {{$g.wallet.amount(scope.row.feeNQT)}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="高度"
                            width="140">
                        <template  slot-scope="scope">
                            <router-link :to="'/block/'+scope.row.height">
                                <el-button type="text"> {{scope.row.height}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="block"
                            label="区块id"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="时间"
                            width="180">
                        <template slot-scope="scope">
                            {{$g.wallet.formatDateTime(scope.row.timestamp*1000+($store.state.epochBeginning-500))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="总转账数量"
                            width="180">
                        <template slot-scope="scope">
                            {{$g.wallet.amount(scope.row.totalAmountNQT)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="交易费"
                            width="120">
                        <template slot-scope="scope">
                            {{$g.wallet.amount(scope.row.totalFeeNQT)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="transactions.length"
                            label="交易数"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="generatorRS"
                            label="出块者"
                            width="280">
                        <template slot-scope="scope">
                            <router-link :to="'/account/'+scope.row.generatorRS">
                                <el-button type="text"> {{scope.row.generatorRS}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        style="text-align: center;"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="14"
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
            </el-card>
        </el-main>
        <el-footer class="footer">
            COPYRIGHT © 2018. ALL RIGHTS RESERVED. DESIGNED BY
            <a target="_blank" href="https://NDX.com/">NDX</a>
        </el-footer>
    </el-container>
</template>


<script>
    var load;
    var loadBlocks;
    var currentPage=1;
    import fhead from '../fhead.vue';
    export default {
        name: 'blocks',
        components: {
            fhead
        },
        data () {
            return {
                BlocksLoading:true,
                BlocksData:[],
                currentPage:1,
                total:0
            }
        },
        methods: {
            Transactions(item){
                if(item.transactions.length!=0&&!item.transactions[0].amountNQT){
                    this.$ajax({
                        method: 'get',
                        url: 'requestType=getBlock&height='+item.height+'&includeTransactions=true&includeExecutedPhased=true'
                    }).then(response => {
                        item.transactions=response.transactions
                    });
                }
            },
            handleCurrentChange(val) {
               this.currentPage=val;
               currentPage=val;
               this.Blocks(1);
            },
            Blocks(state){
                this.BlocksLoading=true;
                this.$ajax({
                    method: 'get',
                    url: 'requestType=getBlocks&includeTransactions=true&firstIndex='+(this.currentPage-1)*14+'&lastIndex='+((this.currentPage-1)*14+14),
                }).then(response => {
                    this.total=response.blocks[0].height
                    this.BlocksLoading=false;
                    if(this.currentPage==1&&state==0){
                        if(this.BlocksData.length!=0&&
                            this.BlocksData[0].height!=response.blocks[0].height){
                            this.BlocksData.unshift(response.blocks[0]);
                            this.Transactions(this.BlocksData[0]);
                            this.BlocksData.pop();
                        }
                    }
                    if(this.BlocksData.length==0||state==1){
                        this.BlocksData=response.blocks;
                        this.BlocksData.forEach(item=>{
                            this.Transactions(item);
                        })
                    }
                });
            }
        },
        created: function () {
            load =setInterval(()=>{
                if(this.$store.state.epochBeginning!=''){
                    this.Blocks();
                    loadBlocks=setInterval(()=>{
                        if(currentPage==1) {
                            this.Blocks(0);
                        }
                    },6000)
                    window.clearInterval(load)
                }
            },2000);

        },
        beforeDestroy: function () {
            window.clearInterval(load)
            window.clearInterval(loadBlocks)

        }
    }
</script>


<style scoped>
</style>  
