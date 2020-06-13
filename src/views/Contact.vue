<template>
  <div class="contact">
    <div class="contact--banner">
      <img src="../assets/contact.jpg" class="img-fluid" />
    </div>

    <div class="container my-3">
      <div class="row py-4">
        <div class="col-md-6">
          <gmap-map></gmap-map>
        </div>
        <div class="col-md-6">
          <img src="../assets/showroom.jpeg" class="img-fluid" />
        </div>
      </div>

      <div class="row py-4">
        <div class="col-md-6">
          <div class="card-body">
            <h3>We'd love to hear from you!</h3>
            <p>
              Whether you're interested in visiting one of our showrooms across
              the country, seeing a sample of one of our products, or looking to
              build a relationship, send us a message!
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="text-black">
            <ul class="list-group">
              <li class="list-group-item">T: (800) 869-5258</li>
              <li class="list-group-item">info@hospitalitybrandsusa.com</li>
              <li class="list-group-item">185 Industrial Ave, Ridgefield Park, New Jersey 07660</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="alert" class="alert alert-success">Your email has been sent.</div>
      <form @submit.prevent="contact" class="needs-validation" novalidate ref="form">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group bmd-form-group">
              <label for="firstname" class="bmd-label-floating">First Name</label>
              <input
                type="text"
                class="form-control"
                v-model="data.firstname"
                id="firstname"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="lastname" class="bmd-label-floating">Last Name</label>
              <input
                type="text"
                class="form-control"
                v-model="data.lastname"
                id="lastname"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="email" class="bmd-label-floating">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="data.email"
                id="email"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="phone" class="bmd-label-floating">Your Phone</label>
              <input
                type="text"
                class="form-control"
                v-model="data.phone"
                id="phone"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="job_title" class="bmd-label-floating">Job Title</label>
              <input
                type="text"
                class="form-control"
                v-model="data.job_title"
                id="job_title"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="company" class="bmd-label-floating">Company</label>
              <input
                type="text"
                class="form-control"
                v-model="data.company"
                id="company"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="address1" class="bmd-label-floating">Address 1</label>
              <input
                type="text"
                class="form-control"
                v-model="data.address1"
                id="address1"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="address2" class="bmd-label-floating">Address 2</label>
              <input
                type="text"
                class="form-control"
                v-model="data.address2"
                id="address2"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group bmd-form-group">
              <label for="city" class="bmd-label-floating">City</label>
              <input
                type="text"
                class="form-control"
                v-model="data.city"
                id="city"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="state" class="bmd-label-floating">State</label>
              <input
                type="text"
                class="form-control"
                v-model="data.state"
                id="state"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="zip_code" class="bmd-label-floating">Zip Code</label>
              <input
                type="text"
                class="form-control"
                v-model="data.zip_code"
                id="zip_code"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group">
              <label for="title" class="bmd-label-floating">Subject Title</label>
              <input
                type="text"
                class="form-control"
                v-model="data.title"
                id="title"
                required
                autocomplete="off"
                autofill="off"
              />
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <div class="form-group bmd-form-group message">
              <label for="message" class="bmd-label-floating">Message</label>
              <textarea
                class="form-control message-form px-3"
                v-model="data.message"
                id="message"
                required
                autocomplete="off"
                autofill="off"
              ></textarea>
              <div class="invalid-feedback">Please type something.</div>
            </div>

            <button type="submit" class="btn btn-success active">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "contact",
  components: {
    GmapMap: () => import("../components/GmapMap")
  },
  data() {
    return {
      alert: false,
      data: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        job_title: "",
        company: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip_code: "",
        title: "",
        message: ""
      }
    };
  },
  computed: {},
  methods: {
    contact() {
      var form = this.$refs.form;
      var vm = this;
      if (form.checkValidity() === false) {
        form.classList.add("was-validated");
      } else {
        window.$http.post("/contact", this.data).then(response => {
          if (response.data.success) {
            vm.alert = true;
            vm.data = {
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              job_title: "",
              company: "",
              address1: "",
              address2: "",
              city: "",
              state: "",
              zip_code: "",
              title: "",
              message: ""
            };
          }
        });
      }
    }
  },
  mounted() {}
};
</script>
