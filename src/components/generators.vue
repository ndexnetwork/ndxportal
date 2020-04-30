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
                    <span>Forging Pool<span style="color: rgb(144, 147, 153);">（Before 30）</span></span>
                </div>
                <el-table class="center"
                          v-loading="GeneratorsLoading"
                          stripe
                          :data="GeneratorsData"
                          style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <el-table
                                    :data="scope.row.lessors"
                                    border
                                    style="width: 460px">
                                <el-table-column
                                        label="Rental Address"
                                        width="280">
                                    <template slot-scope="scope">
                                        <router-link :to="'/account/'+scope.row.lessorRS">
                                            <el-button type="text"> {{scope.row.lessorRS}}</el-button>
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Number of Leases">
                                    <template slot-scope="scope">
                                        {{$g.wallet.amount(scope.row.guaranteedBalanceNQT)}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="id"
                            width="80">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="accountRS"
                            label="Account Address"
                            width="280">
                        <template slot-scope="scope">
                            <router-link :to="'/account/'+scope.row.accountRS">
                                <el-button type="text"> {{scope.row.accountRS}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="effectiveBalanceNXT"
                            label="Forging Quantity"
                            width="180">
                        <template slot-scope="scope">
                            <div v-if="scope.row.effectiveBalanceNXT">
                                {{scope.row.effectiveBalanceNXT}}
                            </div>
                            <div v-if="scope.row.effectiveBalanceAPL">
                                {{scope.row.effectiveBalanceAPL}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sum"
                            label="Number of Lessors"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="Block Time"
                            width="180">
                        <template slot-scope="scope">
                            {{$g.wallet.formatDateTime(scope.row.hitTime*1000+($store.state.epochBeginning-500))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="deadline"
                            label="Countdown Time">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-main>
        <el-footer class="footer" style="height: 40px; padding-top: 7px;">
            COPYRIGHT © 2018-2020. ALL RIGHTS RESERVED. DESIGNED BY
            <a target="_blank" href="https://ndexnetwork.com/">nDEX Network Ltd.</a>
        </el-footer>
    </el-container>
</template>


<script>
    import fhead from './fhead.vue';
    var load;

    export default {
        name: 'generators',
        components: {
            fhead
        },
        data () {
            return {
                GeneratorsLoading:true,
                GeneratorsData:[],
                sum:0
            }
        },
        methods: {
            Lessors(item){

                this.$ajax({
                    method: 'get',
                    url: 'requestType=getAccountLessors&account='+item.accountRS,
                }).then(response=>{
                    this.sum--;
                    item.lessors=response.lessors;
                    item.sum=response.lessors.length;
                    if(this.sum==0){
                        this.GeneratorsData=JSON.parse(JSON.stringify(this.GeneratorsData))
                    }
                })
            },
            Generators(){
                this.GeneratorsLoading=true;
                this.$ajax({
                    method: 'get',
                    url: 'requestType=getNextBlockGenerators&limit=30',
                }).then(response => {
                    this.GeneratorsLoading=false;
                    this.total=response.activeCount;
                    this.GeneratorsData=response.generators;
                    this.sum=this.GeneratorsData.length;
                    this.GeneratorsData.forEach(item=>{
                        this.Lessors(item);
                        item.deadline=this.$g.wallet.timeDiff(
                            this.$g.wallet.formatDateTime(
                                item.hitTime*1000+(this.$store.state.epochBeginning-500)
                            )
                        );
                    })
                });
            }
        },
        created: function () {
            load =setInterval(()=>{
                if(this.$store.state.epochBeginning!=''){
                    this.Generators();
                    window.clearInterval(load)
                }
            },2000);

        },
    }
</script>


<style scoped>
</style>  
