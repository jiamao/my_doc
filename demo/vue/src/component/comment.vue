
<template>
    <ul>
        <CommentItem v-for="(item, index) in items" :key="index" :index="index" v-bind="item" v-on:click-item="showUser" v-my-directive="item"  >
            {{ 'q' + index }}
        </CommentItem>
</ul>
</template>
<script>
    import CommentItem from './commentItem.vue';

export default {
   
    components: {
        'CommentItem': CommentItem
    },
    props: ['items'],
    methods: {
        showUser: function(name, e) {
            console.log(e);
        }
    }
}
</script>
