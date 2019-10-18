
//import CommentItem from './commentItem.vue';

export default {
    template: `<ul>
            <CommentItem v-for="(item, index) in items" :key="index" :index="index" v-bind="item" v-on:click-item="showUser" v-my-directive="item"  >
                {{ 'q' + index }}
            </CommentItem>
    </ul>`,
    components: {
        'CommentItem': httpVueLoader('component/commentItem.vue')
    },
    props: ['items'],
    methods: {
        showUser: function(name, e) {
            console.log(e);
        }
    }
}