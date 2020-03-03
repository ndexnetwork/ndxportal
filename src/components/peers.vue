<template>
    <el-container>
        <fhead></fhead>
        <el-main >
            <el-breadcrumb class="center" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item>Node</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card class="box-card center" style="margin-top: 16px">
                <div slot="header" class="clearfix">
                    <span>Node <span style="color: rgb(144, 147, 153);">（Peer-to-Peer Network {{peers.length}}，Not all nodes）</span></span>
                </div>
                <el-table class="center"
                          v-loading="peersLoading"

                          stripe
                          :data="peers"
                          style="width: 100%">
                    <el-table-column
                            label="id"
                            width="60">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="IP Address"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="version"
                            label="Client Version"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="platform"
                            label="Platform / Owner"
                            width="280">
                    </el-table-column>
                    <el-table-column
                            label="Service"
                            width="320">
                        <template slot-scope="scope">
                            {{scope.row.services.toString()}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="Last Updated">
                        <template slot-scope="scope">
                            {{$g.wallet.formatDateTime(scope.row.lastUpdated*1000+($store.state.epochBeginning-500))}}
                        </template>
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

    export default {
        name: 'peers',
        components: {
            fhead
        },
        data () {
            return {
                peersLoading:true,
                peers:[],
            }
        },
        created: function () {
            this.$ajax({
                method: 'get',
                url: 'requestType=getPeers&active=true&includePeerInfo=true'
            }).then(response => {
                this.peersLoading=false;
                this.peers=response.peers
            });
        }
    }
</script>


<style scoped>
</style>  
