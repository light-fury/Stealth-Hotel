<template>
  <div v-if="main" class="about">

    <div v-if="user" class="editor-bar">
      <div v-if="!editing" class="crud-options">
        <a class="btn btn-outline-info mr-3" href="#" @click.prevent="editing = true">Edit</a>
      </div>
      <div v-else-if="loading">
        <a href="#" class="btn-outline-warning">Loading...</a>
      </div>
      <div v-else-if="editing">
        <a class="btn btn-outline-info mr-3" href="#" @click.prevent="save">Save</a>
        <a class="btn btn-outline-danger" href="#" @click.prevent="editing = false">Cancel</a>
      </div>
    </div>


    <div class="about--banner">
      <img :src="main.banner" class="img-fluid" />
      <div v-if="editing" class="form-group container mt-3">
        <label>Banner</label>
        <input type="file" ref="image" accept="image/*" class="form-control">
      </div>
    </div>

    <div class="container py-3">
      <div class="row">
        <div class="col-12">
          <div v-if="editing" class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="update.content.description"></textarea>
          </div>
          <p v-else v-html="main.content.description"></p>
          <div v-if="editing" class="form-group">
            <label>Second Description</label>
            <textarea class="form-control" v-model="update.content.seconddescription"></textarea>
          </div>
          <p v-else v-html="main.content.seconddescription"></p>
        </div>
      </div>
      <div class="about--tabs">
        <ul class="nav nav-fill justify-content-center py-2">
          <li class="nav-item">
            <a data-toggle="tab" href="#mission" class="nav-link active">Mission</a>
          </li>
          <li class="nav-item">
            <a data-toggle="tab" href="#purpose" class="nav-link">Purpose</a>
          </li>
          <li class="nav-item">
            <a data-toggle="tab" href="#values" class="nav-link">Values</a>
          </li>
        </ul>
      </div>
      <div class="about--tabs-content tab-content">
        <div id="mission" class="tab-pane active">
          <img src="../assets/mission.jpg" class="img-fluid" />
          <div class="card-body">
            <div v-if="editing" class="form-group">
              <label>Mission</label>
              <textarea class="form-control" v-model="update.content.mission"></textarea>
            </div>
            <strong v-else v-html="main.content.mission"></strong>
          </div>
        </div>
        <div id="purpose" class="tab-pane">
          <img src="../assets/purpose.jpg" class="img-fluid" />
          <div class="card-body">
            <div v-if="editing" class="form-group">
              <label>Purpose</label>
              <textarea class="form-control" v-model="update.content.purpose"></textarea>
            </div>
            <strong v-else v-html="main.content.purpose"></strong>
          </div>
        </div>
        <div id="values" class="tab-pane">
          <img src="../assets/Values.jpg" class="img-fluid" />
          <div class="row py-3">
            <div class="col-md-4 my-3 border-right">
              <h2>Quality</h2>
              <div v-if="editing" class="form-group">
                <textarea class="form-control" v-model="update.content.quality"></textarea>
              </div>
              <p v-else v-html="main.content.quality"></p>
            </div>
            <div class="col-md-4 my-3 border-right">
              <h2>Innovation</h2>
              <div v-if="editing" class="form-group">
                <textarea class="form-control" v-model="update.content.innovation"></textarea>
              </div>
              <p v-else v-html="main.content.innovation"></p>
            </div>
            <div class="col-md-4 my-3">
              <h2>Experience</h2>
              <div v-if="editing" class="form-group">
                <textarea class="form-control" v-model="update.content.experience"></textarea>
              </div>
              <p v-else v-html="main.content.experience"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container my-3 px-0">
      <div class="row">
        <div class="col-md-6">
          <div v-if="editing" class="form-group">
            <label>Video</label>
            <input type="text" class="form-control" v-model="update.content.video">
          </div>
          <iframe
            v-else
            class="video"
            width="100%"
            height="500px"
            :src="main.content.video"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
        <div class="col-md-6 d-none d-md-block">
          <div v-if="editing" class="form-group">
            <label>Video Text</label>
            <textarea class="form-control" v-model="update.content.videotext"></textarea>
          </div>
          <p v-else class="about--video-description" v-html="main.content.videotext"></p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="alert alert-info text-center">Loading...</div>
</template>
<script>
export default {
  name: "about",
  props: ['user'],
  data() {
    return {
      main: false,
      editing: false,
      loading: false,
      update: false,
    };
  },
  methods: {
    save() {
      var form_data = new FormData();
      for (var key in this.update) {
        if (key == 'content') {
          form_data.append(key, JSON.stringify(this.update[key]));
        } else {
          form_data.append(key, this.update[key]);
        }
      }
      if (this.$refs.image.files.length) {
        form_data.append("image", this.$refs.image.files[0]);
      }

      this.loading = true;
      window.$http.put('/content/' +  this.main._id, form_data).then(() => {
        this.loading = false;
        this.editing = false;
        this.load();
      });
    },
    load(){
      window.$http.get("/content?path=about").then(({ data }) => {
        if (data.data.length) {
          this.main = Object.assign({}, data.data[0]);
          this.update = data.data[0];
          delete this.update._id;
          delete this.update.created_at;
          delete this.update.__v;
        }
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>
