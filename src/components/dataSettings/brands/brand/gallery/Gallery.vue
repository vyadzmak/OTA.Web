<template>
  <v-container
    fluid
    grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <div class="card-top-action">
            <div><v-btn icon><v-icon color="info">mdi-pen</v-icon></v-btn></div>
            <div><v-btn icon><v-icon color="error">mdi-delete-variant</v-icon></v-btn></div>
          </div>
          <v-card-media
            :src="'/static/p'+props.item%8+'.png'"
            height="200px"/>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <v-btn
      v-show="filesCount>0"
      block
      color="info"
      dark
      @click="uploadFiles()">Загрузить</v-btn>
    <v-progress-linear
      v-show="showProgress"
      v-model="totalProgress"
      height="30"
      color="info"/>
    <p
      v-show="showProgress"
      class="text-xs-center">{{ totalProgress | currency('', 0) }}%</p>
    <vue-transmit
      ref="uploader"
      v-bind="options"
      class="col-12 mb-2"
      tag="section"
      @sending-multiple = "beforeSend"
      @complete-multiple = "completeSend"
      @total-upload-progress = "totalProgressChanged"
      @accepted-file = "filesAcceptedFunction"
      @removed-file = "fileRemovedFunction">
      <v-card-media
        v-show="!showProgress"
        height="180px" >
        <v-container
          fill-height
          fluid>
          <v-layout fill-height>
            <v-flex
              xs12
              align-end
              flexbox>
              <div
                class="d-flex align-items-center justify-content-center w-100"
                style="height:140px; border-radius: 1rem; border: dashed 5px #546E7A;">
                <v-layout
                  row
                  wrap>
                  <v-flex
                    xs12
                    px-1><v-btn
                      block
                      dark
                      color="info"
                      @click="triggerBrowse">Выбрать файлы</v-btn></v-flex>
                  <v-flex
                    xs12
                    text-xs-center><v-icon>fa-upload fa-3x</v-icon></v-flex>
                  <v-flex
                    xs12
                    text-xs-center
                    grey--text>Перетяните изображения сюда</v-flex>
                </v-layout>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <template
        slot="files"
        slot-scope="props">
        <v-card-text v-show="props.files.length>0">
          <v-list>
            <v-divider/>
            <template
              v-for="item in props.files">
              <v-list-tile
                :key="item.id"
                avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.name"/>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    icon
                    large
                    @click="removeFile(item)"><v-icon
                      color="error"
                      large>mdi-delete-variant</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider :key="item.id+'divider'"/>
            </template>
          </v-list>
        </v-card-text>
      </template>
    </vue-transmit>
  </v-container>
</template>

<script src="./gallery.js"></script>

<style scoped></style>
