<template>
    <div id="app" v-bind:title="message" :class="{show: isshow}">
        <Comment :items="items" />
    </div>    
</template>
<style>
.hide {display: none;}
.show {display: inline;}
</style>


<script>
//import Comment from './component/comment.vue';


export default {
    data() {
        return {
            isshow: true,
            message: 'test',
            items: [
                {
                    //index: 1,
                    content: 'msg 1',
                    user: 'fefe'
                },
                {
                    //index: 2,
                    content: 'msg2',
                    user: 'tong'
                }
            ]
        }
    },
    components: {
        //Comment
        'Comment': ()=>import('./component/comment.vue')
    }
}
</script>