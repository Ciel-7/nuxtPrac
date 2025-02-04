<script setup lang="ts">
definePageMeta({
    auth: false
});

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
</script>

<template>
  <div class="ui text container">
    <h1 class="ui header mt-m mb-m">My Page</h1>
  </div>
</template>