<template>
    <div id="app">
        <topbar></topbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import {
        user as userAPI
    } from '@/api';
    import Topbar from '@/components/topbar/topbar'


    export default {
        async created(){
            let result = await userAPI.info();
            if(result && result.data && result.data.code === 0){
                this.$store.commit('initUser', result.data.data);
            }
        },
        components:{
            Topbar
        }
    }
</script>
<style lang="scss">
    #app {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }
</style>