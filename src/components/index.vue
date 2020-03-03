<template>
  <el-container>
    <fhead></fhead>
    <el-main >
      <el-card class="box-card center">
        <div slot="header" class="clearfix">
          <span>Block</span>
        </div>
        <el-table
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
                        label="Handling Fee"
                        width="180">
                  <template slot-scope="scope">
                    {{$g.wallet.amount(scope.row.feeNQT)}}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

          <el-table-column
                  label="Height"
                  width="180">
            <template  slot-scope="scope">
              <router-link :to="'block/'+scope.row.height">
                <el-button type="text"> {{scope.row.height}}</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
                  label="Date"
                  width="180">
            <template slot-scope="scope">
              {{$g.wallet.formatDateTime(scope.row.timestamp*1000+($store.state.epochBeginning-500))}}
            </template>
          </el-table-column>
          <el-table-column
                  label="Number of Tx"
                  width="180">
            <template slot-scope="scope">
              {{$g.wallet.amount(scope.row.totalAmountNQT)}}
            </template>
          </el-table-column>
          <el-table-column
                  label="TX Fee"
                  width="120">
            <template slot-scope="scope">
              {{$g.wallet.amount(scope.row.totalFeeNQT)}}
            </template>
          </el-table-column>
          <el-table-column
                  prop="transactions.length"
                  label="TX No"
                  width="80">
          </el-table-column>
          <el-table-column
                  label="Block Producer"
                  width="280">
            <template slot-scope="scope">
              <router-link :to="'/account/'+scope.row.generatorRS">
                <el-button type="text"> {{scope.row.generatorRS}}</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card center" style="margin-top: 60px">
        <div slot="header" class="clearfix">
          <span>Forging Pool</span>
          <span style="color: #909399;">（Forging number：{{nextBlock.activeCount}}，Non-full forging number）</span>
        </div>
        <el-table
                v-loading="nextBlockLoading"
                stripe
                  :data="nextBlock.generators"
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
                        label="Number of Leases"
                        width="180">
                  <template slot-scope="scope">
                    {{$g.wallet.amount(scope.row.guaranteedBalanceNQT)}}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
                  label="Account Address"
                  width="280">
            <template slot-scope="scope">
              <router-link :to="'/account/'+scope.row.accountRS">
                <el-button type="text"> {{scope.row.accountRS}}</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
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
                  label="Countdown Time"
                  width="180">
          </el-table-column>

        </el-table>
      </el-card>
    </el-main>
    <el-footer class="footer">
      COPYRIGHT © 2018-2020. ALL RIGHTS RESERVED. DESIGNED BY
      <a target="_blank" href="https://ndexnetwork.com/">nDEX Network Ltd.</a>
    </el-footer>
  </el-container>
</template>

<script>
  import fhead from './fhead.vue';
  var deadline;
  var load;
  var loadline;
  export default {
    name: 'HelloWorld',
      components: {
          fhead
      },
    data () {
      return {
          BlocksLoading:true,
          nextBlockLoading:true,
          BlocksData:[],
          nextBlock:{
              generators:[]
          }
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
        Lessors(item){
            this.$ajax({
                method: 'get',
                url: 'requestType=getAccountLessors&account='+item.accountRS,
            }).then(response=>{
                item.lessors=response.lessors;
                item.sum=response.lessors.length;
            })
        },
        Generators(){
            this.nextBlockLoading=true;

            this.$ajax({
                method: 'get',
                url: 'requestType=getNextBlockGenerators&limit=5',
            }).then(response => {
                if(this.nextBlock.generators.length!=0&&
                    response.generators[0].hitTime==
                    this.nextBlock.generators[0].hitTime){

                }else{
                    this.nextBlock=response;
                }
                this.nextBlockLoading=false;

                this.nextBlock.generators.forEach(item=>{
                    this.Lessors(item);
                    item.deadline=this.$g.wallet.timeDiff(
                        this.$g.wallet.formatDateTime(
                            item.hitTime*1000+(this.$store.state.epochBeginning-500)
                        )
                    );
                })
                window.clearInterval(deadline);

                deadline=setInterval(()=>{
                    this.nextBlock.generators.forEach(item=> {
                        --item.deadline;
                    });
                },1000);
            });
        },
        Blocks(){
            this.BlocksLoading=true;
            this.$ajax({
                method: 'get',
                url: 'requestType=getBlocks&firstIndex=0&lastIndex=5&includeTransactions=true',
            }).then(response => {
                this.BlocksLoading=false;
                if(this.BlocksData.length!=0&&
                        this.BlocksData[0].height!=response.blocks[0].height) {
                    this.BlocksData.unshift(response.blocks[0]);
                    this.Transactions(this.BlocksData[0]);
                    this.BlocksData.pop();
                }

                if(this.BlocksData.length==0){
                    this.BlocksData=response.blocks;
                    this.BlocksData.forEach(item=>{
                        this.Transactions(item);
                    })
                    this.BlocksData=response.blocks;
                }

            });
        }
    },
      beforeDestroy: function () {
          window.clearInterval(load)
          window.clearInterval(loadline)
          window.clearInterval(deadline)
      },
    created: function () {
        load = setInterval(() => {
            if (this.$store.state.epochBeginning != '') {
                this.Generators()
                this.Blocks();
                loadline=setInterval(() => {
                    this.Blocks();
                    this.Generators()
                }, 10000)
                window.clearInterval(load)
            }
        }, 2000);

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
