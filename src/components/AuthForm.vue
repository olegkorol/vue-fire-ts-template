<template>
  <v-row align="center" class="login">
    <v-form ref="form" v-model="valid">
      <h3 v-if="formType === 'signIn'">Sign in</h3>
      <h3 v-if="formType === 'signUp'">Sign up</h3>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail*"
        required
      ></v-text-field>

      <v-text-field
        v-if="formType === 'signUp'"
        v-model="password"
        :counter="21"
        :rules="passwordRules"
        label="Password*"
        type="password"
        required
      ></v-text-field>

      <v-text-field
        v-if="formType === 'signIn'"
        v-model="password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password*"
        type="password"
        required
      ></v-text-field>

      <v-checkbox
        v-if="formType === 'signUp'"
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="I agree with the terms.*"
        required
      ></v-checkbox>

      <p>
        Fields marked with
        <sup>*</sup> are required.
      </p>
      <v-btn
        v-if="formType === 'signIn'"
        :disabled="!valid"
        :loading="isLoading"
        color="success"
        class="mr-4"
        @click="
          validate();
          signInWithEmailAndPassword();
        "
        >Sign in</v-btn
      >

      <v-btn
        v-if="formType === 'signUp'"
        :disabled="!valid"
        :loading="isLoading"
        color="success"
        class="mr-4"
        @click="
          validate();
          createUserWithEmailAndPassword();
        "
        >Sign up</v-btn
      >

      <div v-if="formType === 'signIn'" class="mt-5">
        <p>Or, if you are not registered yet, please sign up here:</p>
        <v-btn
          color="blue"
          class="mr-4"
          :disabled="isLoading"
          align="center"
          @click="switchFormType"
          >Sign up</v-btn
        >
      </div>

      <div v-if="formType === 'signUp'">
        <p class="mt-4">
          If you already have an account, please sign in instead.
        </p>
        <v-btn
          color="blue"
          class="mr-4"
          :disabled="isLoading"
          @click="switchFormType"
          >Sign in</v-btn
        >
      </div>
    </v-form>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@/firebase/auth/sdk-methods";

@Component({
  computed: mapState("authentication", ["isLoading"]),
})
export default class AuthForm extends Vue {
  // Class properties will be component data
  formType: "signIn" | "signUp" = "signIn";
  valid = true;
  email = "";
  emailRules = [
    (v: any) => !!v || "E-mail is required",
    (v: any) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];
  password = "";
  passwordRules = [
    (v: any) => !!v || "Password is required",
    (v: any) =>
      (v && v.length <= 21 && v.length >= 8) ||
      "At least 8 characters long (max. 21)",
  ];
  select = null;
  checkbox = false;

  // Class methods will be component methods
  // Form methods
  private validate(): void {
    const form: any = this.$refs.form;
    form.validate();
  }
  private reset(): void {
    const form: any = this.$refs.form;
    form.reset();
  }
  private resetValidation(): void {
    const form: any = this.$refs.form;
    form.resetValidation();
  }
  private switchFormType(): void {
    switch (this.formType) {
      case "signIn":
        this.formType = "signUp";
        break;
      default:
        this.formType = "signIn";
        break;
    }
  }
  // Firebase Auth SDK calls
  private createUserWithEmailAndPassword(): void {
    createUserWithEmailAndPassword(this.email, this.password);
  }
  private signInWithEmailAndPassword(): void {
    signInWithEmailAndPassword(this.email, this.password);
  }
}
</script>

<style scoped lang="scss">
// You can use SCSS
a {
  color: #42b983;
}
</style>
