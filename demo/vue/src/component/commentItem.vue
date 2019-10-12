
export default {
    template: `<li  v-bind:user="user" @click.prevent="$emit(\'click-item\', user, $event)" :style="{color: index%2==0?\'red\':\'green\'}">
            <slot></slot>
            <p v-html="message"></p> 
            <br />
            {{ message }}
            <input v-model.lazy="message">
        </li>`,
    props: [ 'user', 'content', 'index' ],
    data() {
        return {
            msg: this.content
        }
    },
    watch: {
        message(v) {
            //this.content = v;
        }
    },
    computed: {
        message: {
            get: function() {
                return this.msg + ' test';
            },
            set: function(v) {
                this.msg = v;
            }
        }
    }
}