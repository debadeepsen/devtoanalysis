<template>
  <div id="app">
    <app-menu></app-menu>
    <h1>Dev.to articles statistical analysis</h1>
    <div id="top_words">
      <h2>
        <i class="fas fa-book"></i>
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
    <div id="top_tags">
      <h2>
        <i class="fas fa-tags"></i>
        Top tags (occurring at least
        {{ word_max_freq }} times)
      </h2>
      <div>
        <div v-if="!results || !results.length">Loading...</div>
        <div v-for="tag in tags" class="keyword hashtag" :key="tag.text">
          <a target="_blank" :href="`https://dev.to/t/${tag.text}`">{{ tag.text }}</a>
          <div class="count">{{ tag.value }}</div>
        </div>
      </div>
    </div>
    <div id="most_reacted_posts">
      <h2>
        <i class="fas fa-smile-beam"></i>
        Top 20 posts with the most reactions</h2>
      <div>
        <div v-if="!results || !results.length">Loading...</div>
        <post-list :postList="most_reacted_posts" countKey="public_reactions_count"></post-list>
      </div>
    </div>
    <div id="most_commented_posts">
      <h2>
        <i class="fas fa-comments"></i>
        Top 20 posts with the most comments</h2>
      <div>
        <div v-if="!results || !results.length">Loading...</div>
        <post-list :postList="most_commented_posts" countKey="comments_count"></post-list>
      </div>
    </div>
    <div id="reactions_vs_comments">
      <h2>Reactions vs Comments</h2>
    </div>
  </div>
</template>

<script>
import AppMenu from './components/AppMenu.vue';
import PostList from './components/PostList.vue';
// import Cloud from "vue-d3-cloud";

import { API_URL, WORD_MAX_FREQ } from "./Constants";
import { populate, trim } from "./Lib";

export default {
  components: { PostList, AppMenu },
  data() {
    return {
      results: [],
      keywords: [],
      tags: [],
      most_reacted_posts: [],
      most_commented_posts: [],
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

        // most reacted posts
        article_list.sort(
          (a, b) => b.public_reactions_count - a.public_reactions_count
        );
        this.most_reacted_posts = article_list.filter((a, i) => i < 20);

        // most commented posts
        article_list.sort((a, b) => b.comments_count - a.comments_count);
        this.most_commented_posts = article_list.filter((a, i) => i < 20);
      });
  },
};
</script>

<style>
@import url(./App.css);
</style>