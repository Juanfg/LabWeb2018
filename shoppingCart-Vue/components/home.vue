<template>
  <b-container fluid>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-card>
        <b-form-group>
          <b-form-select @change="selectedProductChanged" id="products" :options="options" v-model="form.product"></b-form-select>
          <b-form-input type="number" id="quantity" v-model="form.quantity"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-img center v-bind:src="image" fluid alt="Responsive image"/>
        </b-form-group>
      </b-card>        
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-table striped hover :fields="fields" :items="productsInCart">
        <template  slot="image" slot-scope="data">
          <b-img v-bind:src="data.item.image_path" style="width: 100px; height= 100px;"></b-img>
        </template>
      </b-table>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";

const products = [];

export default {
  data() {
    return {
      form: {
        quantity: 1,
        product: 1
      },
      selected: 0,
      options: [],
      image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
      productsInCart: [],
      show: true,
      fields: [
        'quantity',
        'name',
        'price',
        'image'
      ]
    };
  },
  methods: {
    searchProducts() {
      axios.get("https://api.myjson.com/bins/hlnmx").then(response => {
        this.products = response.data.products;
        this.products.forEach(product => {
          this.options.push({
            value: product.id,
            text: product.name
          });
        });
      });
    },
    selectedProductChanged(value) {
      this.image = this.products[value - 1].image_path;
    },
    onSubmit (evt) {
      evt.preventDefault();
      this.addToCart(this.form.product - 1, this.form.quantity);
    },
    onReset (evt) {
      evt.preventDefault();
      this.form.quantity = 1;
      this.form.product = null;
      this.productsInCart = [];
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    addToCart(productId, quantity) {
      var productAlreadyInCart = false;
      this.productsInCart.forEach(product => {
        if (product.id === productId + 1) {
          productAlreadyInCart = true;
        }
      });
      if (!productAlreadyInCart) {
        this.products[productId].quantity = parseInt(quantity);
        this.productsInCart.push(this.products[productId]);
      } else {
        this.products[productId].quantity += parseInt(quantity);
      }
    }
  },
  mounted() {
    this.searchProducts();
  }
};
</script>
