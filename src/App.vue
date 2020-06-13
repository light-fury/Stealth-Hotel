<template>
  <div class="bmd-layout-container bmd-drawer-f-l" ref="main">
    <header class="bmd-layout-header fixed-top">
      <div class="navbar navbar-light bg-white">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="drawer"
          data-target="#dw-s1"
        >
          <span class="sr-only">Toggle drawer</span>
          <i class="material-icons">menu</i>
        </button>
        <router-link to="/" class="navbar-brand ml-2 mr-auto">
          <img src="./assets/hos.png" class="img-fluid" />
        </router-link>
        <app-nav></app-nav>
        <div class="sub-menu">
          <div class="container d-none d-lg-block py-2">
            <ul class="nav nav-fill justify-content-center">
              <li class="nav-item">
                <router-link to="/glassware" class="nav-link"
                  >Glassware</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/eco" class="nav-link"
                  >Unbreakable Drinkware</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/barware" class="nav-link"
                  >Barware</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/tableware" class="nav-link"
                  >Creative Tableware</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <div id="dw-s1" class="bmd-layout-drawer bg-white">
      <app-drawer
        :user="user"
        @close-draw="closeDraw"
        @logout="logout"
      ></app-drawer>
    </div>
    <main class="bmd-layout-content" ref="container">
      <router-view :user="user"></router-view>
      <app-footer></app-footer>
    </main>

    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      id="modal-login"
      data-backdrop="false"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="loading" class="modal-body">
            <div class="alert alert-info">Loading...</div>
          </div>
          <form v-else @submit.prevent="doLogin">
            <div class="modal-body">
              <div v-if="message" class="alert alert-danger">{{ message }}</div>
              <div class="form-group bmd-form-group">
                <label for="email" class="bmd-label-floating">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="login.email"
                  id="email"
                  required
                  autocomplete="off"
                  autofill="off"
                />
              </div>
              <div class="form-group bmd-form-group">
                <label for="password" class="bmd-label-floating"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  v-model="login.password"
                  id="password"
                  required
                  autocomplete="off"
                  autofill="off"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Login</button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AppDrawer: () => import("./components/Drawer"),
    AppNav: () => import("./components/Nav"),
    AppFooter: () => import("./components/Footer")
  },
  watch: {
    $route() {
      this.closeDraw();
      window.restart();
    }
  },
  data() {
    return {
      user: false,
      loading: false,
      message: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    closeDraw() {
      this.$refs["main"].classList.remove("bmd-drawer-in");
      this.$refs["container"].scrollTo(0, 0);
    },
    doLogin() {
      this.loading = true;

      window.$http
        .post("/auth/login", this.login)
        .then(response => {

          this.loading = false;
          setTimeout(function() {
            window.restart();
          }, 300);

          if (response.data.success) {
            window.$('#modal-login').modal('toggle');
            this.loadUser();
            this.$ls.set('token', response.data.token);
            window.$http.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          } else {
            this.message = response.data.error;
            this.$ls.set('token', false);
          }
        });
    },
    logout() {
      this.$ls.set("token", false);
      this.user = false;
    },
    loadUser() {
      window.$http.get("/auth/me").then(response => {
        this.user = response.data.data;
      });
    }
  },
  mounted() {
    var token = this.$ls.get('token');
    if (token) {
      this.loadUser();
    }
  }
};
</script>
