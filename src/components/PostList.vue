<template>
  <div>
    <div class="post" v-for="(post, i) in postList" :key="post.id">
      <div class="index">
        <span>
          {{ i + 1 }}
        </span>
      </div>
      <div>
        <div>
          <a target="_blank" :href="post.url">{{ post.title }}</a>
          <div class="count">{{ post.public_reactions_count }}</div>
        </div>
        <div class="post-hashtags">
          <a target="_blank" :href="`https://dev.to/${post.user.username}`" :title="post.user.name">
          <img :src="post.user.profile_image_90" />
          </a>
          <div class="keyword hashtag" v-for="tag in post.tag_list" :key="tag">
            <a target="_blank" :href="`https://dev.to/t/${tag}`">{{ tag }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postList: Array,
  },
};
</script>

<style scoped>
.post {
  display: flex;
  margin-bottom: 20px;
  padding-left: 10px;
  box-shadow: 0px 2px 1px #aaa1;
}

.index span {
  display: inline-block;
  width: 16px;
  font-size: 12px;
  padding: 8px;
  background-color: var(--secondary-color);
  color: #fff;
  font-weight: 400;
  text-align: center;
  margin-right: 20px;
}

.post-hashtags {
    display: flex;
    align-items: center;
}

.post-hashtags img {
  width: 32px;
  border-radius: 100px;
  display: inline-flex;
  margin-right: 10px;
}
</style>