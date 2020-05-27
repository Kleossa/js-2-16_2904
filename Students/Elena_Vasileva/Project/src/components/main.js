const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function start() {
    let app = new Vue({
        el: '#app',
        data: {
            //внутренние (реактивные переменные экземпляра)
            itemsCatalog: [],
            itemsBasket: [],
            urlCatalog: API + '/catalogData.json',
            urlBasket: API + '/getBasket.json',
            showBasket: true,
            searchLine: ''
        },
        methods: {
            // методы
            get(url) {
                return fetch(url).then(d => d.json());
            },

            // поиск по сайту
            filterGoods() {
                console.log(this.searchLine);
                if (this.searchLine != ''){
                    let items = [];
                    this.itemsCatalog.forEach(el=>{
                        if (el.product_name == this.searchLine)
                            items.push(el);
                    });
                     return  items;
                }
                return this.itemsCatalog;
            },


            // Добавление товара в корзину
            addToBasket(id_product) {
                let find = this.itemsBasket.find(el => el.id_product == id_product);
                if (find == undefined) {
                    let product = this.itemsCatalog.find(el => el.id_product == id_product);
                    if (product != undefined) {
                        let newItem = {
                            id_product: id_product,
                            img: '',
                            quantity: 1,
                            product_name: product.product_name,
                            price: product.price
                        };
                        this.itemsBasket.push(newItem);
                    }
                } else {
                    find.quantity++;
                }

               //console.log (find)
            },

            // Удаление товара из корзины
            removeFromBasket(id_product) {
                let find = this.itemsBasket.find(el => el.id_product == id_product);
                if (find.quantity < 2){
                    let pos = this.itemsBasket.indexOf(find);
                    this.itemsBasket.splice(pos, 1);
                }
                else
                {
                    find.quantity--;
                }
            }

        },
        computed: {
            //"методы", возвращающие *реактивно* какие-то значения //Vue считает их ЗНАЧЕНИЯМИ

        },
        //Hooks - внутренние события жизненного цикла эеземпляра
        // beforeCreate() {
        //     console.log('Я собираюсь создать себя');
        // },
        // created() {
        //     console.log('Я родился');
        // },
        mounted() {
            this.get(this.urlCatalog)
                .then(data => {
                    this.itemsCatalog = data;
                })
                .finally(() => {
                    //console.log(this.itemsCatalog);
                });
            this.get(this.urlBasket)
                .then(data => {
                    this.itemsBasket = data.contents;
                })
                .finally(() => {
                  //  console.log(this.itemsBasket);
                });


            console.log('Я смонтировался')
        },
    });
}



export default function() {
    start();
}