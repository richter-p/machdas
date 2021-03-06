import Vue from "vue";
import {TasksResource} from "../services/resources";
import Add from "./card/add";
import Tasks from "./card/tasks";

export default Vue.extend({

    template: require('./views/card.html'),
    components: {
        tasks: Tasks,
        add: Add
    },

    init: function() {
        let refresh = () => this.refresh();
        this.$on('tasks.+', refresh);
        this.$on('tasks.updated', refresh)
    },

    data: function() {
        return {
            models: []
        }
    },

    methods: {
        loadModels: function() {
            let params = {
                id: this.$route.params.id,
                'order-by': 'priority,desc'
            };

            return TasksResource.queryByCardId(params);
        },
        refresh: function() {
            this.loadModels().then(response => {
                this.models = response.data;
            });
        }
    },

    route: {

        data: function() {
            return this.loadModels().then(response => {
                return { models: response.data };
            })
        },

        canReuse: false

    }

});