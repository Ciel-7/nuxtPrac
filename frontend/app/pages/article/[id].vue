<script setup lang="ts">
import { getUserIdByOAuthUserInfo } from '../../utils/Common';

definePageMeta({
    auth: false,
});

const {
    status,
    data,
} = useAuth();

const route = useRoute();
const articleId = route.params.id;
const isEditable = ref(false);

// 記事情報の取得
const article = await useFetch(`/api/article/${articleId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
});

const id = article.data.value.result.author.id;
const title = article.data.value.result.title;
const author = article.data.value.result.author.name;
const body = article.data.value.result.body;

if (status.value === 'authenticated') {
  const providerName = data.value.user.providerName;
  const userId = providerName === "credentials" ? parseInt(data.value.user.id, 10) : await getUserIdByOAuthUserInfo(providerName, data.value.user.id);
  isEditable.value = id === userId;
}

const isAuthenticated = computed(() => status.value === 'authenticated');
const isUnauthenticated = computed(() => status.value === 'unauthenticated');
</script>

<template>
  <div class="ui text container">
    <h1 class="ui header mt-m mb-m">{{ title }}</h1>
    <span>{{ author }}</span>

    <p class="ui">{{ body }}</p>

    <NuxtLink v-if="isEditable" v-bind:to="{ name: 'article-edit-id', params: { id: id } }">
      <button  class="ui button">編集</button>
    </NuxtLink>
  </div>
</template>