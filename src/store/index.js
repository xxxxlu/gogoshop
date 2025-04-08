import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    categories: [
      { id: 1, name: 'MenFashion', slug: 'MenFashion' },
      { id: 2, name: 'MenAccessories', slug: 'MenAccessories' },
      { id: 3, name: 'MobilePhones', slug: 'MobilePhones' },
      { id: 4, name: 'WomenFashion', slug: 'WomenFashion' },
      { id: 5, name: 'Grocery', slug: 'Grocery' },
      { id: 6, name: 'HealthBeauty', slug: 'HealthBeauty' },
      { id: 7, name: 'LaundryHousehold', slug: 'LaundryHousehold' },
    ]
  },
  getters: {
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    cartCount: state => {
      return state.cart.reduce((count, item) => {
        return count + item.quantity
      }, 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        })
      }
    },
    updateCartItem(state, { id, quantity }) {
      const item = state.cart.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id)
    },
    clearCart(state) {
      state.cart = []
    }
  },
  actions: {
    fetchProducts({ commit }) {
      // In a real app, this would be an API call
      // For now, we'll use hardcoded data
      const products = [
        {
          "id": 1,
          "name": "Export Surplus Random Printed T-Shirt For Men",
          "price": 599,
          "originalPrice": 718.8,
          "description": "Export Surplus branded quality t-shirt with random print designs for men, comfortable cotton fabric.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/1740329215.jpeg",
          "stock": 15
        },
        {
          "id": 2,
          "name": "Export Surplus Polo T-Shirt For Men Dark",
          "price": 1099,
          "originalPrice": 1318.8,
          "description": "Premium quality polo t-shirt for men, dark colored with comfortable fabric and classic fit.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/714814667.jpeg",
          "stock": 20
        },
        {
          "id": 3,
          "name": "Export Surplus Basic Half Sleeves T-Shirt White",
          "price": 399,
          "originalPrice": 478.8,
          "description": "Basic white t-shirt with half sleeves, made with soft cotton fabric for everyday wear.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/3726342568.jpeg",
          "stock": 25
        },
        {
          "id": 4,
          "name": "Export Surplus Basic Half Sleeves T-Shirt Yellow",
          "price": 399,
          "originalPrice": 478.8, 
          "description": "Basic yellow t-shirt with half sleeves, made with soft cotton fabric for everyday wear.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/2417972370.jpeg",
          "stock": 18
        },
        {
          "id": 5,
          "name": "Bershka Hooded Sweatshirt For Mens",
          "price": 1350,
          "originalPrice": 1620,
          "description": "Stylish hooded sweatshirt from Bershka, perfect for casual outings and cool weather.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/1796002849.jpeg",
          "stock": 12
        },
        {
          "id": 6,
          "name": "Export Surplus Basic Half Sleeves T-Shirt Green",
          "price": 399,
          "originalPrice": 478.8,
          "description": "Basic green t-shirt with half sleeves, made with soft cotton fabric for everyday wear.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/2372258461.jpeg",
          "stock": 22
        },
        {
          "id": 7,
          "name": "Naviforce Black Leather Watch For Men",
          "price": 2999,
          "originalPrice": 3598.8,
          "description": "Elegant black leather strap watch from Naviforce, water-resistant with multiple functions.",
          "category": "MenAccessories",
          "image": "https://ext.same-assets.com/2797696504/2349423998.jpeg",
          "stock": 10
        },
        {
          "id": 8,
          "name": "Naviforce Brown Leather Watch For Men",
          "price": 2999,
          "originalPrice": 3598.8,
          "description": "Classic brown leather strap watch from Naviforce, water-resistant with elegant design.",
          "category": "MenAccessories",
          "image": "https://ext.same-assets.com/2797696504/3724466734.jpeg",
          "stock": 8
        },
        {
          "id": 9,
          "name": "Curren Digital Sports Watch For Men",
          "price": 1999,
          "originalPrice": 2398.8,
          "description": "Multi-functional digital sports watch with chronograph and water resistance features.",
          "category": "MenAccessories",
          "image": "https://ext.same-assets.com/2797696504/3241978175.jpeg",
          "stock": 15
        },
        {
          "id": 10,
          "name": "Samsung Galaxy A70 Dual Sim 6GB RAM",
          "price": 66649,
          "originalPrice": 79978.8,
          "description": "Samsung Galaxy A70 smartphone with dual SIM capability and 6GB RAM for smooth performance.",
          "category": "MobilePhones",
          "image": "https://ext.same-assets.com/1465839245/354157306.jpeg",
          "stock": 5
        },
        {
          "id": 11,
          "name": "Export Surplus Random Printed T-Shirt For Men Blue",
          "price": 599,
          "originalPrice": 718.8,
          "description": "Export Surplus branded quality blue t-shirt with random print designs for men.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/2372258461.jpeg",
          "stock": 20
        },
        {
          "id": 12,
          "name": "KINARI Printed Shirt For Women",
          "price": 1399,
          "originalPrice": 1678.8,
          "description": "Stylish printed shirt for women from KINARI, perfect for casual and semi-formal occasions.",
          "category": "WomenFashion",
          "image": "https://m.media-amazon.com/images/I/91yzhKVnGGL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 18
        },
        {
          "id": 13,
          "name": "Veet Sensitive Touch High Precision Trim",
          "price": 3000,
          "originalPrice": 3600,
          "description": "Veet sensitive touch high precision trimmer for women, gentle on skin with multiple attachments.",
          "category": "HealthBeauty",
          "image": "https://ext.same-assets.com/624373019/2787080317.jpeg",
          "stock": 12
        },
        {
          "id": 14,
          "name": "Nestle Nido 1000gm",
          "price": 1140,
          "originalPrice": 1368,
          "description": "Nestle Nido fortified milk powder, 1000gm pack, rich in essential nutrients.",
          "category": "Grocery",
          "image": "https://ext.same-assets.com/624373019/2688352450.jpeg",
          "stock": 30
        },
        {
          "id": 15,
          "name": "Nestle Everyday 1000gm",
          "price": 910,
          "originalPrice": 1092,
          "description": "Nestle Everyday tea whitener, 1000gm pack, perfect for making creamy tea.",
          "category": "Grocery",
          "image": "https://ext.same-assets.com/624373019/3115658252.png",
          "stock": 25
        },
        {
          "id": 16,
          "name": "Tapal Danedar Pouch 950gm",
          "price": 950,
          "originalPrice": 1140,
          "description": "Tapal Danedar premium tea pouch, 950gm pack, rich flavor for the perfect cup of tea.",
          "category": "Grocery",
          "image": "https://ext.same-assets.com/624373019/1572263651.jpeg",
          "stock": 22
        },
        {
          "id": 17,
          "name": "Free Tennis Ball With Surf Excel Washing",
          "price": 650,
          "originalPrice": 780,
          "description": "Surf Excel washing powder with a free tennis ball, effective stain removal.",
          "category": "LaundryHousehold",
          "image": "https://ext.same-assets.com/624373019/167566417.png",
          "stock": 15
        },
        {
          "id": 18,
          "name": "Mortein LED Refill 60 Nights",
          "price": 450,
          "originalPrice": 540,
          "description": "Mortein LED mosquito repellent refill, effective for up to 60 nights of protection.",
          "category": "LaundryHousehold",
          "image": "https://ext.same-assets.com/624373019/843648768.jpeg",
          "stock": 30
        },
        {
          "id": 19,
          "name": "Export Surplus Basic Half Sleeves T-Shirt Black",
          "price": 399,
          "originalPrice": 478.8,
          "description": "Basic black t-shirt with half sleeves, made with soft cotton fabric for everyday wear.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/3726342568.jpeg",
          "stock": 20
        },
        {
          "id": 20,
          "name": "Export Surplus Basic Half Sleeves T-Shirt Red",
          "price": 399,
          "originalPrice": 478.8,
          "description": "Basic red t-shirt with half sleeves, made with soft cotton fabric for everyday wear.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/714814667.jpeg",
          "stock": 18
        },
        {
          "id": 21,
          "name": "Export Surplus Random Printed Full Sleeve T-Shirt",
          "price": 999,
          "originalPrice": 1198.8,
          "description": "Full sleeve printed t-shirt for men, comfortable fabric with stylish random print designs.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/1796002849.jpeg",
          "stock": 15
        },
        {
          "id": 22,
          "name": "Export Surplus Random Printed T-Shirt For Men Grey",
          "price": 599,
          "originalPrice": 718.8,
          "description": "Export Surplus branded quality grey t-shirt with random print designs for men.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/1740329215.jpeg",
          "stock": 12
        },
        {
          "id": 23,
          "name": "Naviforce Digital Watch For Men",
          "price": 3499,
          "originalPrice": 4198.8,
          "description": "Modern digital watch from Naviforce with multiple functions and sporty design.",
          "category": "MenAccessories",
          "image": "https://ext.same-assets.com/2797696504/2349423998.jpeg",
          "stock": 8
        },
        {
          "id": 24,
          "name": "Curren Leather Watch For Men",
          "price": 2499,
          "originalPrice": 2998.8,
          "description": "Elegant leather strap watch from Curren, water-resistant with classic design.",
          "category": "MenAccessories",
          "image": "https://ext.same-assets.com/2797696504/3724466734.jpeg",
          "stock": 10
        },
        {
          "id": 25,
          "name": "Naviforce Sports Watch For Men",
          "price": 3999,
          "originalPrice": 4798.8,
          "description": "Sporty watch from Naviforce with multiple functions, perfect for outdoor activities.",
          "category": "MenAccessories",
          "image": "https://ext.same-assets.com/2797696504/3241978175.jpeg",
          "stock": 6
        },
        {
          "id": 26,
          "name": "KINARI Printed Shirt For Women KI-14 Mud",
          "price": 1399,
          "originalPrice": 1678.8,
          "description": "Stylish mud-colored printed shirt for women from KINARI, perfect for casual occasions.",
          "category": "WomenFashion",
          "image": "https://m.media-amazon.com/images/I/81bjg36TLqL._AC_UL640_FMwebp_QL65_.jpg",
          "stock": 15
        },
        {
          "id": 27,
          "name": "KINARI Printed Shirt For Women KI-07 Mud",
          "price": 1399,
          "originalPrice": 1678.8,
          "description": "Stylish mud-colored printed shirt for women from KINARI, variant KI-07 design.",
          "category": "WomenFashion",
          "image": "https://ext.same-assets.com/624373019/2787080317.jpeg",
          "stock": 12
        },
        {
          "id": 28,
          "name": "KINARI Printed Shirt For Women KI-05 Mud",
          "price": 1399,
          "originalPrice": 1678.8,
          "description": "Stylish mud-colored printed shirt for women from KINARI, variant KI-05 design.",
          "category": "WomenFashion",
          "image": "https://ext.same-assets.com/624373019/2688352450.jpeg",
          "stock": 14
        },
        {
          "id": 29,
          "name": "Export Surplus Chinos For Men",
          "price": 1299,
          "originalPrice": 1558.8,
          "description": "Comfortable export surplus chinos pants for men, perfect for casual and semi-formal occasions.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/1796002849.jpeg",
          "stock": 10
        },
        {
          "id": 30,
          "name": "Export Surplus Shirts For Men",
          "price": 1199,
          "originalPrice": 1438.8,
          "description": "Export surplus branded shirts for men, available in different designs and colors.",
          "category": "MenFashion",
          "image": "https://ext.same-assets.com/1141641775/2372258461.jpeg",
          "stock": 18
        }
      ]

      // Add more products to get to 32

      commit('setProducts', products)
    }
  }
})
