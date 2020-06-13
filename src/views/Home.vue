<template>
  <div class="home">
    <div class="home--banner">
      <img src="../assets/HomepageBanner.jpg" class="img-fluid" />
      <div class="container">
        <h1>Welcome to Hospitality Brands</h1>
      </div>
    </div>

    <div class="home--tabs">
      <ul class="nav nav-fill justify-content-center py-2">
        <li class="nav-item">
          <a data-toggle="tab" href="#started" class="nav-link">Let's Get Started</a>
        </li>
        <li class="nav-item">
          <a data-toggle="tab" href="#home-new" class="nav-link">New</a>
        </li>
        <li class="nav-item">
          <a data-toggle="tab" href="#tailor-made" class="nav-link">Tailor Made</a>
        </li>
        <li class="nav-item">
          <a data-toggle="tab" href="#home-eco" class="nav-link">Sustainability</a>
        </li>
      </ul>
    </div>
    <div class="home--tabs-content tab-content">
      <div id="started" class="tab-pane active">
        <div class="container">
          <div class="p-4">
            <div class="row">
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control bg-gray search-input p-3 mb-3"
                  @input="updateQ($event, 'qProducts')"
                  placeholder="I'm looking for..."
                />
              </div>
            </div>
          </div>
          <products db="products" :q="qProducts" flimit="4"></products>
        </div>
      </div>
      <div id="home-new" class="tab-pane">
        <div class="container">
          <div class="p-4">
            <div class="row">
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control bg-gray search-input p-3 mb-3"
                  @input="updateQ($event, 'nProducts')"
                  placeholder="I'm looking for..."
                />
              </div>
            </div>
          </div>
          <products db="newproducts" :q="nProducts" flimit="4"></products>
        </div>
      </div>
      <div id="tailor-made" class="tab-pane">
        <img src="../assets/tailormade.jpg" class="img-fluid" />

        <div class="content">
          <div class="card text-dark bg-light m-4">
            <div class="card-body">
              <p>
                We exist to inspire the success of our partners, our clients,
                and everyone of the individuals we touch with every serve.
                Cheers to your success.
              </p>
              <router-link to="/tailormade" class="btn btn-block btn-outline-dark">Go to Tailormade</router-link>
            </div>
          </div>
        </div>
      </div>
      <div id="home-eco" class="tab-pane">
        <img src="../assets/sustain.jpg" class="img-fluid" />
        <div class="content">
          <div class="card text-white bg-dark m-4">
            <div class="card-body">
              <p>
                Hospitality Brands is committed to not only taking concrete
                steps to reduce it’s carbon footprint, but leading the charge to
                bring environmentally sustainable products to the hospitality
                industry. Our catalog includes 100% recyclable glass, developed
                completely sustain- ably, ensuring environmentally concious
                production, without any compromise on style of quality.
              </p>
              <router-link
                to="/sustainability"
                class="btn btn-block btn-outline-light"
              >Go to Sustainability</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <news :user="user"></news>
  </div>
</template>
<script>
var qcallback = window.debounce(function($event, varq) {
  this[varq] = $event.target.value;
}, 300);

export default {
  name: "home",
  props: ["user"],
  components: {
    News: () => import("../components/News"),
    Products: () => import("../components/Products")
  },
  data() {
    return {
      sbackground: require("../assets/home2.jpg"),
      qProducts: "",
      nProducts: ""
    };
  },
  methods: {
    updateQ: qcallback
  }
};
</script>
