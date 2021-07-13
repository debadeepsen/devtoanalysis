<template>
  <div id="app">
    <div id="loading_spinner" v-show="!results || !results.length">
      Loading...
    </div>
    <app-menu></app-menu>
    <h1>Dev.to articles statistical analysis</h1>
    <!------------------------------------------------------------>
    <div id="top_words">
      <h2>
        <i class="fas fa-book"></i>
        Top words parsed from the title (occurring at least
        {{ word_max_freq }} times)
      </h2>
      <word-cloud :wordList="keywords"></word-cloud>
    </div>
    <!------------------------------------------------------------>
    <div id="top_tags">
      <h2>
        <i class="fas fa-tags"></i>
        Top tags (occurring at least
        {{ word_max_freq }} times)
      </h2>
      <word-cloud :wordList="tags"></word-cloud>
    </div>
    <!------------------------------------------------------------>
    <div id="most_reacted_posts">
      <h2>
        <i class="fas fa-smile-beam"></i>
        Top {{ number_of_articles }} posts with the most reactions
      </h2>
      <div>
        <post-list
          :postList="most_reacted_posts"
          countKey="public_reactions_count"
        ></post-list>
      </div>
    </div>
    <!------------------------------------------------------------>
    <div id="most_commented_posts">
      <h2>
        <i class="fas fa-comments"></i>
        Top {{ number_of_articles }} posts with the most comments
      </h2>
      <div>
        <post-list
          :postList="most_commented_posts"
          countKey="comments_count"
        ></post-list>
      </div>
    </div>
    <!------------------------------------------------------------>
    <div id="reaction_stats">
      <h2>Reaction distribution statistics</h2>
      <div>
        <b>Mean:</b> {{ stats.reactions.mean }}<br />
        <b>Median:</b> {{ stats.reactions.median }}<br />
        <b>Mode:</b> {{ stats.reactions.mode }}<br />
        <b>Standard Deviation:</b> {{ stats.reactions.standardDeviation }}
      </div>
    </div>
    <!------------------------------------------------------------>
    <div id="comment_stats">
      <h2>Comment distribution statistics</h2>
      <div>
        <b>Mean:</b> {{ stats.comments.mean }}<br />
        <b>Median:</b> {{ stats.comments.median }}<br />
        <b>Mode:</b> {{ stats.comments.mode }}<br />
        <b>Standard Deviation:</b> {{ stats.comments.standardDeviation }}
      </div>
    </div>
    <!------------------------------------------------------------>
    <div id="reactions_vs_comments">
      <h2>Reactions vs Comments</h2>
      <chart
        chartName="reactions_vs_comments"
        chartType="scatter"
        xAxisType="numeric"
        xAxisLabel="Comments"
        yAxisLabel="Reactions"
        :seriesData="r_v_c_chart_data"
      ></chart>
      <div>
        <b>Correlation Coefficient:</b> {{ r_v_c_data.correlation_coefficient }}
        <br />
        <b>Euclidean Distance:</b> {{ r_v_c_data.euclidean_distance }}
      </div>
    </div>
    <!------------------------------------------------------------>
    <div id="trend_over_months">
      <h2>Trend over Months</h2>
    </div>
    <!------------------------------------------------------------>
    <div id="trend_over_years">
      <h2>Trend over Years</h2>
    </div>
    <!------------------------------------------------------------>
    <div id="user_behavior">
      <h2>User posting behavior</h2>
    </div>
    <!------------------------------------------------------------>
  </div>
</template>

<script>
import AppMenu from "./components/AppMenu.vue";
import Chart from "./components/Chart.vue";
import PostList from "./components/PostList.vue";
import WordCloud from "./components/WordCloud.vue";
import {
  correlation_coefficient,
  euclidean,
  mean,
  median,
  mode,
  sd,
} from "./libraries/StatMethods";

import {
  API_URL,
  WORD_MAX_FREQ,
  NUMBER_OF_ARTICLES,
} from "./libraries/Constants";
import { populate, trim } from "./libraries/Lib";

export default {
  components: { PostList, AppMenu, WordCloud, Chart },
  data() {
    return {
      results: [],
      keywords: [],
      tags: [],
      most_reacted_posts: [],
      most_commented_posts: [],
      r_v_c_chart_data: [],
      r_v_c_data: {
        reactions: [],
        comments: [],
        correlation_coefficient: 0,
      },
      stats: {
        reactions: {
          mean: null,
          median: null,
          mode: null,
          standardDeviation: null,
        },
        comments: {
          mean: null,
          median: null,
          mode: null,
          standardDeviation: null,
        },
      },
    };
  },

  computed: {
    word_max_freq() {
      return WORD_MAX_FREQ;
    },

    number_of_articles() {
      return NUMBER_OF_ARTICLES;
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      document.body.style.overflowY = "hidden";

      fetch(API_URL)
        .then((r) => r.json())
        .then((article_list) => {
          this.results = article_list;

          this.loadChartData(article_list);

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
          this.most_reacted_posts = article_list.filter(
            (a, i) => i < NUMBER_OF_ARTICLES
          );

          // most commented posts
          article_list.sort((a, b) => b.comments_count - a.comments_count);
          this.most_commented_posts = article_list.filter(
            (a, i) => i < NUMBER_OF_ARTICLES
          );

          document.body.style.overflowY = "auto";
        });
    },

    loadChartData(results) {
      let data = [];
      let r = [];
      let c = [];

      results.forEach((p) => {
        if (p.public_reactions_count && p.comments_count)
          data.push({ x: p.comments_count, y: p.public_reactions_count });
        r.push(p.public_reactions_count);
        c.push(p.comments_count);
      });

      this.r_v_c_chart_data = data;
      this.r_v_c_data.reactions = r;
      this.r_v_c_data.comments = c;

      this.stats.reactions.mean = mean(r);
      this.stats.reactions.median = median(r);
      this.stats.reactions.mode = mode(r);
      this.stats.reactions.standardDeviation = sd(r);

      this.stats.comments.mean = mean(c);
      this.stats.comments.median = median(c);
      this.stats.comments.mode = mode(c);
      this.stats.comments.standardDeviation = sd(c);

      this.r_v_c_data.correlation_coefficient = correlation_coefficient(r, c);
      this.r_v_c_data.euclidean_distance = euclidean(r, c);
    },
  },
};
</script>

<style>
@import url(./App.css);
</style>