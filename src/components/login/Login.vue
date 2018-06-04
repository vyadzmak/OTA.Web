<template>
  <v-content>
    <v-container
      fluid
      fill-height>
      <v-layout
        align-center
        justify-center>
        <v-flex
          xs12
          sm8
          md4>
          <v-card class="elevation-12">
            <v-toolbar
              dark
              color="primary">
              <img
                width="50"
                src="@/assets/img/share.svg">
              <v-toolbar-title>{{ msg }}
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                v-model="valid"
                @submit.prevent="loginUser">
                <v-card-text primary-title>
                  <v-text-field
                    v-model="loginData.Login"
                    :rules="emailRules"
                    :disabled="controlsDisabled"
                    prepend-icon="person"
                    label="Логин"
                    class="input-group--focused"
                    autofocus
                    required
                  />
                </v-card-text>
                <v-card-text primary-title>
                  <v-text-field
                    v-model="loginData.Password"
                    :counter="10"
                    :disabled="controlsDisabled"
                    :rules="passwordRules"
                    prepend-icon="lock"
                    label="Пароль"
                    type="password"
                    class="input-group--focused"
                    required
                  />
                </v-card-text>

                <v-card-actions class="white">
                  <v-checkbox
                    v-model="rememberMe"
                    :disabled="controlsDisabled"
                    label="Запомнить меня"
                    color="indigo"
                    hide-details/>
                  <v-btn
                    :disabled="controlsDisabled"
                    type="submit"
                    color="error"
                    dark
                    large>Вход</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script src="./login.js"></script>

<style scoped></style>
