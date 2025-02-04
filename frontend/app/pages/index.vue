<script setup lang="ts">
// ページのアクセス権限の設定
definePageMeta({
    auth: false // 認証不要で誰でも見れる
});

// 認証関連のオブジェクト
const {
    status,
    data,
    lastRefreshedAt,
    getCsrfToken,
    getProviders,
    getSession,
    signIn,
    signOut
} = useAuth()

// 記事情報の取得
// useFetchはsetupやmiddleware内で使う
// $fetchはユーザのアクションに応じてfetchする時に使う
const articles = await useFetch('/api/article', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
});

console.log(articles);
console.log(data.value);
</script>

<template>
  <div class="ui text container">
    <h1 class="ui header">
      Articles
      <NuxtLink to="/post">
        <button class="ui right floated blue button">Post</button>
      </NuxtLink>
    </h1>
    <div class="ui three cards">
      <ArticleListItem v-for="article in articles.data.value.result" :key="article.id"
        :title="article.title"
        :author="article.author.name"
        :createdAt="article.createdAt"
      />
    </div>
  </div>
</template>