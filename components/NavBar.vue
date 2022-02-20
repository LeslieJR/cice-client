<template>
  <div class="nav-bar">
    <v-app-bar color="teal darken-1">
      <v-toolbar-title>
        <v-btn to="/home" plain class="white--text">Ecos</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-dialog
          v-if="isAuth =='' || isAuth == null"
          v-model="dialog"
          max-width="600px"
          min-width="250px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="white--text" plain v-bind="attrs" v-on="on">
              Sign In / Register
            </v-btn>
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
              <v-tabs-slider color="orange darken-4"></v-tabs-slider>
              <v-tab v-for="(tab, i) in tabs" :key="i">
                <v-icon medium>{{ tab.icon }}</v-icon>
                <div class="caption py-1">{{ tab.name }}</div>
              </v-tab>
              <v-tab-item>
                <v-form ref="logform">
                  <v-card class="px-4">
                    <v-container>
                      <v-card-text>
                        <v-text-field
                          v-model="loginEmail"
                          label="Enter email"
                          placeholder="Email"
                          outlined
                          clearable
                          hide-details="auto"
                          :rules="loginEmailRules"
                          required
                        ></v-text-field>
                      </v-card-text>
                      <v-card-text>
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'eye' : 'eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Enter password"
                          placeholder="Password"
                          outlined
                          clearable
                          hide-details="auto"
                          :rules="[rules.required, rules.min]"
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-card-text>
                    </v-container>
                    <v-card-actions>
                      <v-btn class="white--text green lighten-1" @click="onLogin"> Login </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-tab-item>
              <v-tab-item>
                <v-form ref="regform">
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
                          :rules="[rules.required]"
                          required
                        ></v-text-field>
                      </v-card-text>
                      <v-card-text>
                        <v-text-field
                          v-model="email"
                          label="Enter email"
                          outlined
                          clearable
                          hide-details="auto"
                          :rules="emailRules"
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
                          :rules="[rules.required, rules.min]"
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
                          :rules="[rules.required, passwordMatch]"
                        ></v-text-field>
                      </v-card-text>
                    </v-container>
                    <v-card-actions>
                      <v-btn class="white--text green lighten-1" @click="onRegister" >Register</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
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

<script>
import { signIn, signUp } from "../services";
export default {
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
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
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      loginEmailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    validateEmail(email) {
      let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(emailFormat)) {
        return true;
      } else {
        return false;
      }
    },
    async onLogin() {
      try {
        if (!this.loginEmail || !this.loginPassword) {
          this.$swal("Error!", "Missing email or password info", "error");
          return;
        }
        const emailValid = this.validateEmail(this.loginEmail);
        if (!emailValid) {
          this.$swal("Error!", "Invalid email address", "error");
          return;
        }
        const data = await signIn(this.loginEmail, this.loginPassword);
        if (data.err) {
          alert(data.err);
        } else {
          console.log('user/saveToken: '+data.token)
          this.$store.dispatch("user/saveToken", data.token);
          this.dialog = false;
          this.loginEmail = "";
          this.loginPassword = "";
          console.log('check localStorage')
          this.$swal("Success!", "You are now logged in", "success");
        }
      } catch (err) {
        alert(err.message);
      }
    },
    async onRegister() {
      try {
        if (this.password !== this.password2) {
          this.$swal("Error!", "Passwords do not match", "error");
          return;
        }
        const emailValid = this.validateEmail(this.email);
        if (!emailValid) {
          this.$swal("Error!", "Invalid email address", "error");
          return;
        }
        const data = await signUp(
          this.first_name,
          this.email,
          this.password,
          this.password2
        );

        if (data.err) {
          alert(data.err);
        } else {
          this.$swal("Success!", "You have registered successfully", "success");
        }
      } catch (err) {
        alert(err.message);
      }
    },
    logout() {
      this.$store.dispatch("user/removeToken");
      this.$swal("Attention!", "You are now logged out", "warning");
    },
  },
  watch: {
    dialog(val) {
      if (val) {
        if(this.$refs.logform){
          this.$refs.logform.reset();
        }
        this.loginEmail = "";
        this.loginPassword = "";
        if(this.$refs.regform){
          this.$refs.regform.reset();
        }
        this.first_name = "";
        this.email = "";
        this.password = "";
        this.password2 = "";
      }
    },
  },
  computed: {
     isAuth() {
      console.log('***NavBar isAuth computed: '+this.$store.getters["user/getToken"])
      const token = this.$store.getters["user/getToken"];
      if(token==''){console.log(true)}
      return this.$store.getters["user/getToken"];
    }, 
    passwordMatch() {
      return () => this.password === this.password2 || "Password must match";
    },
    
  },
};
</script>
<style>
.v-card__actions {
  justify-content: center;
}

</style>
