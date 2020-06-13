<template>
  <div class="tailormade">
    <div class="tailormade--banner">
      <img src="../assets/tailormade.jpg" class="img-fluid" />
    </div>

    <div class="container">
      <div class="row py-4">
        <div class="col-md-4">
          <img src="../assets/coupedesign.png" class="img-fluid" />
        </div>
        <div class="col-md-8">
          <img src="../assets/things.png" class="img-fluid" />
          <h2 class="mt-3">
            "- Design the experience, let us bring it to table."
          </h2>
        </div>
      </div>

      <div class="tailormade--tabs">
        <ul class="nav nav-fill justify-content-center py-2">
          <li class="nav-item">
            <a data-toggle="tab" href="#mission" class="nav-link active"
              >Mission</a
            >
          </li>
          <li class="nav-item">
            <a data-toggle="tab" href="#purpose" class="nav-link">Purpose</a>
          </li>
          <li class="nav-item">
            <a data-toggle="tab" href="#values" class="nav-link">Values</a>
          </li>
        </ul>
      </div>
      <div class="tailormade--tabs-content tab-content">
        <div id="mission" class="tab-pane active">
          <img src="../assets/mission.jpg" class="img-fluid" />
          <div class="card-body">
            <strong
              >We exist to inspire the success of our partners, our clients, and
              everyone of the individuals we touch with every serve. Cheers to
              your success.</strong
            >
          </div>
        </div>
        <div id="purpose" class="tab-pane">
          <img src="../assets/purpose.jpg" class="img-fluid" />
          <div class="card-body">
            <strong
              >We strive to be the premier supplier of innovative glassware,
              drinkware, barware, and creative tableware products to the
              hospitality industry.</strong
            >
          </div>
        </div>
        <div id="values" class="tab-pane">
          <img src="../assets/Values.jpg" class="img-fluid" />
          <div class="row py-3">
            <div class="col-md-4 my-3 border-right">
              <h2>Quality</h2>
              <p>
                We will be relentless in our pursuit to partner only with those
                people, organizations, and brands that produce the highest
                quality work and products.
              </p>
            </div>
            <div class="col-md-4 my-3 border-right">
              <h2>Innovation</h2>
              <p>
                We will be relentless in our pursuit to partner only with those
                people, organizations, and brands that produce the highest
                quality work and products.
              </p>
            </div>
            <div class="col-md-4 my-3">
              <h2>Experience</h2>
              <p>
                We will be relentless in our pursuit to partner only with those
                people, organizations, and brands that produce the highest
                quality work and products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tailormade",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>
