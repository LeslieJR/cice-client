<template>
  <div class="nav-bar">
    <v-app-bar color="teal darken-1">
      <v-toolbar-title>
        <v-btn to="/home" plain class="white--text">Ecos</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-dialog
          v-if="!isAuth"
          v-model="dialog"
          max-width="600px"
          min-width="250px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="white--text" plain v-bind="attrs" v-on="on"> Sign In / Register </v-btn>
          </template>
          <div>
            <v-tabs
              v-model="tab"
              show-arrows
              background-color="green darken-1"
              icons-and-text
              dark
              grow
            >
              <v-tabs-slider color="orange"></v-tabs-slider>
              <v-tab v-for="(tab, i) in tabs" :key="i">
                <v-icon medium>{{ tab.icon }}</v-icon>
                <div class="caption py-1">{{ tab.name }}</div>
              </v-tab>
              <v-tab-item>
                <v-card class="px-4">
                  <v-container>
                    <v-card-text>
                      <v-text-field
                        v-model="email"
                        label="Enter email"
                        placeholder="Email"
                        outlined
                        clearable
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Enter password"
                        placeholder="Password"
                        outlined
                        clearable
                        hide-details="auto"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-card-text>
                  </v-container>
                  <v-card-actions>
                    <v-btn @click="onLogin"> Login </v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card class="px-4">
                  <v-container>
                    <v-card-text>
                      <v-text-field
                        v-model="first_name"
                        label="First Name"
                        maxlength="20"
                        outlined
                        clearable
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                      <v-text-field
                        label="Enter email"
                        placeholder="Email"
                        outlined
                        clearable
                        hide-details="auto"
                        v-model="email"
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        outlined
                        clearable
                        hide-details="auto"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                      <v-text-field
                        block
                        v-model="password2"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        outlined
                        clearable
                        hide-details="auto"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-card-text>
                  </v-container>
                  <v-card-actions>
                    <v-btn @click="onRegister">Register</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-dialog>
        <div v-else>
          <v-btn text class="white--text" @click="logout">Logout</v-btn>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

export default {
  <script>
import { signIn, signUp } from "../services";
export default {
  data() {
    return {
      token: null,
      first_name: "",
      email: "",
      password: "",
      password2: "",
      dialog: false,
      tab: 0,
      tabs: [
        { name: "Login", icon: "mdi-account" },
        { name: "Register", icon: "mdi-account-outline" },
      ],
      show1: false,
    };
  },
  asyncData(ctx) {
    const token = ctx?.store.state.user.token;
    if (token) {
      ctx.redirect("/home");
    }
  },
  methods: {
    async onLogin() {
      try {
        if (!this.email || !this.password) {
          alert("Missing email or password info");
        }
        const data = await signIn(this.email, this.password);
        if (data.err) {
          alert(data.err);
        } else {
          localStorage.setItem("email", data.email);
          this.$store.dispatch("user/saveToken", data.token);
          this.dialog = false;
          this.email = "";
          this.password = "";

          this.$router.push("/home");
        }
      } catch (err) {
        alert(err.message);
      }
    },
    async onRegister() {
      try {
        if (this.password !== this.password2) {
          alert("PASSWORDs DO NOT MATCH");
          return;
        }
        const data = await signUp(
          this.first_name,
          this.email,
          this.password,
          this.password2
        );
        this.$router.push("/home");
        if (data.err) {
          alert(data.err);
        } else {
        }
      } catch (err) {
        alert(err.message);
      }
    },
    logout() {
      console.log('logout');
      //console.log(this.$store.getters['user/getToken'])
      this.$store.dispatch("user/removeToken");
      console.log(this.$store.getters['user/getToken'])
    },
  },
  /* watch: {
    "$store.state.user.token"(value) {
      if (value) {
        this.token = value;
      }
    },
  }, */
  computed:{
    isAuth(){
      return this.$store.getters['user/getToken']
    }
  },
};
</script>
<style>
.v-card__actions {
  justify-content: center;
}
</style>