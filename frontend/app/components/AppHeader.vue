<script lang="ts" setup>
  const {
    status,
    data,
    signOut
  } = useAuth()

  const isAuthenticated = computed(() => status.value === 'authenticated');
  const isUnauthenticated = computed(() => status.value === 'unauthenticated');
</script>

<template>
  <div class="ui inverted menu">
    <div class="ui container">
      <div class="item">
        <NuxtLink to="/">
          <i class="chess queen icon"></i>
          <span>MyApp</span>
        </NuxtLink>
      </div>
      <div class="right menu">
        <div v-if="isUnauthenticated" class="item">
          <NuxtLink to="/login">
            <span>Login</span>
          </NuxtLink>
        </div>

        <div v-if="isAuthenticated" class="item">
          <NuxtLink to="/userpage/${data.value.user.id}">
            <span>My Page</span>
          </NuxtLink>
        </div>

        <a v-if="isAuthenticated" class="item" @click="signOut">
          <span>Logout</span>
        </a>
      </div>
    </div>
  </div>
</template>