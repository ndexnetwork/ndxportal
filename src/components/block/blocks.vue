<template>
    <el-container>
        <fhead></fhead>
        <el-main >
            <el-breadcrumb class="center" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item>All Blocks</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card class="box-card center" style="margin-top: 16px">
                <div slot="header" class="clearfix">
                    <span>Block</span>
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
                                        label="Sending Address"
                                        width="280">
                                    <template slot-scope="scope">
                                        <router-link :to="'/account/'+scope.row.senderRS">
                                            <el-button type="text"> {{scope.row.senderRS}}</el-button>
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Receiving Address"
                                        width="280">
                                    <template slot-scope="scope">
                                        <router-link :to="'/account/'+scope.row.recipientRS">
                                            <el-button type="text"> {{scope.row.recipientRS}}</el-button>
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Quantity"
                                        width="180">
                                    <template slot-scope="scope">
                                        {{$g.wallet.amount(scope.row.amountNQT)}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Fees">
                                    <template slot-scope="scope">
                                        {{$g.wallet.amount(scope.row.feeNQT)}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Height"
                            width="140">
                        <template  slot-scope="scope">
                            <router-link :to="'/block/'+scope.row.height">
                                <el-button type="text"> {{scope.row.height}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="block"
                            label="Block ID"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="Block Time"
                            width="180">
                        <template slot-scope="scope">
                            {{$g.wallet.formatDateTime(scope.row.timestamp*1000+($store.state.epochBeginning-500))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Total Transfers"
                            width="180">
                        <template slot-scope="scope">
                            {{$g.wallet.amount(scope.row.totalAmountNQT)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Transaction Fee"
                            width="120">
                        <template slot-scope="scope">
                            {{$g.wallet.amount(scope.row.totalFeeNQT)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="transactions.length"
                            label="Number of Transactions"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="generatorRS"
                            label="Block Generator"
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
            COPYRIGHT © 2018-2020. ALL RIGHTS RESERVED. DESIGNED BY
            <a target="_blank" href="https://ndexnetwork.com/">nDEX Network Ltd.</a>
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
