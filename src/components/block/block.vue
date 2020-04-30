<template>
    <el-container>
        <fhead></fhead>
        <el-main >
            <el-breadcrumb class="center" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/blocks' }">All Blocks</el-breadcrumb-item>
                <el-breadcrumb-item>Block Height</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card  v-loading="loading" class="box-card center" style="margin-top: 16px">
                <div slot="header" class="clearfix">
                    <span>Block {{height}}</span>
                    <el-button @click="update(0)" style="float: right; padding: 3px 0" type="text">Next Block</el-button>
                    <el-button @click="update(1)" style="float: right; padding: 3px 0;margin-right: 20px" type="text">Prev Block</el-button>
                </div>

                <el-form  size="mini"  label-width="120px" >
                    <el-form-item label="Block ID">
                        {{Blocks.block}}
                    </el-form-item>
                    <el-form-item label="Block Height">
                        {{Blocks.height}}
                    </el-form-item>
                    <el-form-item label="Block Time">
                        {{$g.wallet.formatDateTime(Blocks.timestamp*1000+($store.state.epochBeginning-500))}}
                    </el-form-item>
                    <el-form-item label="Block Time">
                        <router-link :to="'/account/'+Blocks.generatorRS">
                            <el-button style="font-size: 14px" type="text"> {{Blocks.generatorRS}}</el-button>
                        </router-link>
                    </el-form-item>
                    <el-form-item label="No of Block Tx">
                        {{Blocks.transactions.length}}
                    </el-form-item>
                    <el-form-item label="Total Transfers">
                        {{$g.wallet.amount(Blocks.totalAmountNQT)}}
                    </el-form-item>
                    <el-form-item label="Block Tx Fee">
                        {{$g.wallet.amount(Blocks.totalFeeNQT)}}
                    </el-form-item>
                </el-form>

                <el-collapse v-model="activeNames">
                    <el-collapse-item title="More Transaction Information List" name="1">
                        <el-table
                                :data="Blocks.transactions"
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
                                    label="Fees"
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
        <el-footer class="footer" style="height: 40px; padding-top: 7px;">
            COPYRIGHT © 2018-2020. ALL RIGHTS RESERVED. DESIGNED BY
            <a target="_blank" href="https://ndexnetwork.com/">nDEX Network Ltd.</a>
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
                        this.$alert('Height Error', 'Prompt', {
                            confirmButtonText: 'Determine',
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
