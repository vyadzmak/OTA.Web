<template>
  <div>
    <v-navigation-drawer
      :mini-variant="appliedMiniVariant"
      :clipped="clipped"
      v-model="drawer"
      class="aside-background"
      app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          v-if="item.visible"
          :key="i"
          :class="item.isActive?'active-route':'route'"
          @click="goToRoute(item.path)"
        >
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon
                slot="activator"
                :class="item.isActive?'active-icon':''"
                light
                v-html="item.icon"/>
              <span v-text="item.title"/>
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-speed-dial
        v-model="fab"
        direction="top"
        transition="slide-y-reverse-transition"
        absolute
      ><v-btn
        slot="activator"
        v-model="fab"
        color="warning"
        dark
        fab
        hover
      ><v-icon>settings</v-icon><v-icon>close</v-icon></v-btn>
        <v-btn
          fab
          dark
          small
          class="green"
          @click.stop="miniVariant = !miniVariant"
        ><v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/></v-btn>
        <v-btn
          fab
          dark
          small
          class="indigo"
          @click.stop="clipped = !clipped"
        ><v-icon>web</v-icon></v-btn>
      </v-speed-dial>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      app
      fixed
      dark
      color="primary">
      <v-toolbar-side-icon
        dark
        @click.stop="drawer = !drawer"/>
      <img
        width="50"
        src="@/assets/img/share.svg">
      <v-toolbar-title
        @click="logOut()"
        v-html="title"/>
      <v-spacer/>
      <v-menu
        bottom
        left>
        <v-btn
          slot="activator"
          class="hidden-sm-and-down"
          flat
          dark>
          Профиль
          <v-icon right>fas fa-user</v-icon>
        </v-btn>
        <v-btn
          slot="activator"
          class="hidden-md-and-up"
          icon
          dark>
          <v-icon>fas fa-user</v-icon>
        </v-btn>
        <v-card>
          <v-container
            fluid
            grid-list-lg>
            <v-layout row>
              <v-flex xs7>
                <div>
                  <div>Профиль пользователя</div>
                  <div class="headline">{{ userData.first_name + ' ' + userData.last_name }}</div>
                </div>
              </v-flex>
              <v-flex xs5>
                <v-avatar size="125px">
                  <img
                    class="img-circle elevation-7 mb-1"
                    src="https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg"
                  >
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-media class="text-xs-center"/>
          <v-list>
            <v-list-tile @click="showUpdateModal()">
              <v-list-tile-action><v-icon>mdi-account</v-icon></v-list-tile-action>
              <v-list-tile-content>Редактировать профиль</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action><v-icon>mdi-settings</v-icon></v-list-tile-action>
              <v-list-tile-content>Настройки</v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="logOut()">
              <v-list-tile-action><v-icon>mdi-logout</v-icon></v-list-tile-action>
              <v-list-tile-title>Выход</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </div>
</template>

<script src="./dashboard.js"></script>

<style scoped lang="scss" src="./dashboard.scss"></style>
