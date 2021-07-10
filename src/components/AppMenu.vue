<template>
  <div id="menu">
    <img id="logo" src="@/assets/dev.png" />
    <button @click="goto('top_words')">
      <i class="fas fa-book"></i>
      Top Words
    </button>
    <button @click="goto('top_tags')">
      <i class="fas fa-tags"></i>
      Top Tags
    </button>
    <button @click="goto('most_reacted_posts')">
      <i class="fas fa-smile-beam"></i>
      Most Reactions
    </button>
    <button @click="goto('most_commented_posts')">
      <i class="fas fa-comments"></i>
      Most Comments
    </button>
    <button @click="goto('reactions_vs_comments')">
      <i class="fas fa-comments"></i>
      Reactions vs Comments
    </button>
  </div>
</template>

<script>
import { scrollIntoView } from "../libraries/Lib";
export default {
  name: "AppMenu",

  methods: {
    goto(id) {
      scrollIntoView(id);
    },
  },
};
</script>

<style scoped>
#logo {
  width: 40%;
  margin: 10% 30%;
}

#menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 15vw;
  height: 100%;
  z-index: 3;
  box-sizing: border-box;
}

button {
  font-size: 1rem;
  display: block;
  padding: 15px 12px;
  transition: all 0.2s;
  width:100%;
  border: 0;
  padding-left: 15px;
  background-color: #0000;
  text-align: left;
  font-family: 'Nunito', sans-serif;
  color: var(--link-color);
  cursor: pointer;
}

button:hover {
  background-color: #6ec2bb22;
  color: var(--link-color);
}

.fas {
  display: inline-block;
  margin-right: 3px;
}
</style>