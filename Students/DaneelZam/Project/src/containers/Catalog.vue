<template>
    <div class="goods-list products">
        <goods v-for="goods in filteredGoods" :key="goods.id_product" :type="'catalog'" :goods="goods"/>
    </div>
</template>

<script>
    import goods from '../components/Goods.vue'
    export default {
        components: {
            goods
        },
        data() {
            return {
                unfilteredGoods: [],
                filteredGoods: [],
                url: '/api/catalog'
            }
        },
        mounted() {
            this.$parent.get(this.url).then(dataJson => {
                this.unfilteredGoods = dataJson;
                this.filteredGoods = dataJson;
            })
        }
    }
</script>

<style>

</style>