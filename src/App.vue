<template>
  <div id="app">
    <h1>Dev.to articles statistical analysis</h1>
    <div>
      <h2>
        Top words parsed from the title (occurring at least
        {{ word_max_freq }} times)
      </h2>
      <div>
        <div v-if="!results || !results.length">Loading...</div>
        <!-- <cloud :data="keywords" :fontSizeMapper="fontSizeMapper" /> -->
        <div v-for="kw in keywords" class="keyword" :key="kw.text">
          {{ kw.text }}
          <div class="count">{{ kw.value }}</div>
        </div>
      </div>
    </div>
    <div>
      <h2>
        Top tags (occurring at least
        {{ word_max_freq }} times)
      </h2>
      <div>
        <div v-if="!results || !results.length">Loading...</div>
        <div v-for="tag in tags" class="keyword" :key="tag.text">
          {{ tag.text }}
          <div class="count">{{ tag.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Cloud from "vue-d3-cloud";

import { API_URL, WORD_MAX_FREQ } from "./Constants";
import { populate, trim } from "./Lib";

export default {
  // components: {
  //   Cloud,
  // },

  data() {
    return {
      results: [],
      keywords: [],
      tags: [],
    };
  },

  computed: {
    word_max_freq() {
      return WORD_MAX_FREQ;
    },

    fontSizeMapper(word) {
      return Math.log2(word.value) * 5;
    },
  },

  mounted() {
    fetch(API_URL)
      .then((r) => r.json())
      .then((article_list) => {
        this.results = article_list;

        let keyword_array = [];
        let tag_array = [];

        article_list.forEach((article) => {
          // extracted keywords
          let t = article.title.toLowerCase();
          let words_in_current_title = t.split(" ");
          populate(keyword_array, words_in_current_title);

          // extracted tags
          let tags_in_current_article = article.tag_list;
          populate(tag_array, tags_in_current_article);
        });

        this.keywords = trim(keyword_array);
        this.tags = trim(tag_array);
      });
  },
};
</script>

<style>
@import url(./App.css);
</style>