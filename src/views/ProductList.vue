<template>
  <div class="product-list">
    <div class="container">
      <div class="page-header">
        <h1>{{ categoryTitle }} <span class="heart-icon">❤️</span></h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <span>{{ categoryTitle }}</span>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="sidebar">
          <div class="filter-section">
            <h3>Categories <span class="emoji">💻</span></h3>
            <ul>
              <li v-for="category in categories" :key="category.id">
                <router-link :to="'/products?category=' + category.slug">
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="filter-section">
            <h3>Price Range <span class="emoji">💲</span></h3>
            <div class="price-inputs">
              <input type="number" placeholder="Min" v-model="priceMin" />
              <span>-</span>
              <input type="number" placeholder="Max" v-model="priceMax" />
            </div>
            <button class="filter-btn" @click="applyFilters">Apply ✨</button>
          </div>
        </div>

        <div class="main-content">
          <div class="sort-bar">
            <span>{{ filteredProducts.length }} products found</span>
            <div class="sort-options">
              <label for="sort">Sort by:</label>
              <select id="sort" v-model="sortOption">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div class="products-grid">
            <template v-if="filteredProducts.length > 0">
              <product-card
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
              />
            </template>
            <div v-else class="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      sortOption: 'price-low',
      priceMin: '',
      priceMax: '',
      appliedPriceMin: null,
      appliedPriceMax: null
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    categorySlug() {
      return this.$route.query.category || ''
    },
    categoryTitle() {
      if (this.categorySlug) {
        const category = this.categories.find(cat => cat.slug === this.categorySlug)
        return category ? category.name : 'All Products'
      }
      return 'All Products'
    },
    filteredProducts() {
      let filtered = [...this.products]

      // Filter by category
      if (this.categorySlug) {
        filtered = filtered.filter(product => product.category === this.categorySlug)
      }

      // Filter by price range
      if (this.appliedPriceMin !== null) {
        filtered = filtered.filter(product => product.price >= this.appliedPriceMin)
      }

      if (this.appliedPriceMax !== null) {
        filtered = filtered.filter(product => product.price <= this.appliedPriceMax)
      }

      // Sort products
      switch (this.sortOption) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
      }

      return filtered
    }
  },
  methods: {
    applyFilters() {
      this.appliedPriceMin = this.priceMin !== '' ? parseInt(this.priceMin) : null
      this.appliedPriceMax = this.priceMax !== '' ? parseInt(this.priceMax) : null
    }
  },
  watch: {
    '$route.query.category'() {
      // Reset filters when category changes
      this.priceMin = ''
      this.priceMax = ''
      this.appliedPriceMin = null
      this.appliedPriceMax = null
    }
  }
}
</script>

<style scoped>
.product-list {
  margin-bottom: 40px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #dc2626;
  font-weight: bold;
}

.breadcrumbs {
  color: #991b1b;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #991b1b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.content-wrapper {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.filter-section {
  background-color: #fff;
  padding: 18px;
  border-radius: 18px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(220, 38, 38, 0.1);
  border: 1px solid #fecaca;
  transition: all 0.3s ease;
  animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.filter-section h3 {
  font-size: 16px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #fecaca;
  color: #dc2626;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-section ul li {
  margin-bottom: 10px;
}

.filter-section ul li a {
  color: #991b1b;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 5px;
}

.filter-section ul li a::before {
  content: '❤';
  position: absolute;
  left: -15px;
  font-size: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.filter-section ul li a:hover::before {
  opacity: 1;
}

.filter-section ul li a:hover {
  color: #ef4444;
}

.heart-icon {
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.emoji {
  display: inline-block;
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-5px); }
}

.price-inputs {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.price-inputs input {
  width: 80px;
  padding: 10px;
  border: 1px solid #fecaca;
  border-radius: 12px;
  background-color: #fff;
  color: #991b1b;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(220, 38, 38, 0.05);
}

.price-inputs input:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

.price-inputs span {
  margin: 0 10px;
}

.filter-btn {
  width: 100%;
  padding: 10px 15px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
  position: relative;
  overflow: hidden;
}

.filter-btn:hover {
  background-color: #dc2626;
  transform: translateY(-3px);
  box-shadow: 0 6px 8px rgba(220, 38, 38, 0.3);
}

.filter-btn:active {
  transform: translateY(1px);
}

.filter-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

.main-content {
  flex-grow: 1;
}

.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 18px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(220, 38, 38, 0.1);
  border: 1px solid #fecaca;
  animation: fadeIn 0.8s ease;
}

.sort-options select {
  margin-left: 10px;
  padding: 8px 12px;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #991b1b;
  background-color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(220, 38, 38, 0.05);
}

.sort-options select:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.sort-options label {
  color: #991b1b;
  font-weight: 500;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.no-products {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 5px 15px rgba(220, 38, 38, 0.1);
  border: 1px solid #fecaca;
}

.no-products p {
  color: #991b1b;
  font-size: 16px;
  animation: fadeIn 1s ease;
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .sort-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .sort-options {
    margin-top: 10px;
  }
}
</style>
