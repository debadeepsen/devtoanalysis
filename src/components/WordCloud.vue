<template>
  <div class="wc-main">
    <div class="cloud-container">
      <vue-word-cloud
        style="height: 400px; width: 100%"
        :words="getArray()"
        :color="([, weight]) => getColor(weight)"
        :spacing="1"
        font-family="Nunito"
      />
    </div>
    <div class="button-container">
      <button class="link-button" @click="showCount = !showCount">
        <i
          class="fas fa-caret-down"
          :style="{ transform: showCount ? 'rotate(180deg)' : 'rotate(0deg)' }"
        ></i>
        {{ showCount ? "Hide" : "Show" }} counts
      </button>
    </div>
    <div
      class="word-container"
      :style="{ maxHeight: showCount ? '10000px' : '0px' }"
    >
      <div v-for="w in wordList" class="keyword" :key="w.text">
        {{ w.text }}
        <div class="count">{{ w.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VueWordCloud from "vuewordcloud";
export default {
  name: "WordCloud",

  props: {
    wordList: Array,
  },

  components: {
    VueWordCloud,
  },

  data() {
    return {
      showCount: false,
    };
  },

  methods: {
    getArray() {
      let arr = [];
      this.$props.wordList.forEach((p) => {
        arr.push([p.text, p.value]);
      });

      return arr;
    },

    getColor(weight) {
      let w = weight > 255 ? 255 : weight;

      let r = Math.round(Math.random() * w);
      let g = Math.round(Math.random() * w);
      let b = Math.round(Math.random() * w);

      return `rgb(${r}, ${g}, ${b})`;
    },
  },
};
</script>

<style>
.wc-main > div {
  margin-bottom: 10px;
}

.cloud-container {
  margin: 10px;
  margin-top: -10px;
  padding: 10px;
  background-color: var(--secondary-color-faint);
}

.button-container {
}

.fa-caret-down {
  display: inline-block;
  margin-right: 6px;
  transition: all 0.35s;
}

.word-container {
  max-height: 0px;
  overflow: hidden;
  transition: all 0.35s;
}
</style>