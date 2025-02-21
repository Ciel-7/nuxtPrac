<script setup lang="ts">
import { getUserIdByOAuthUserInfo } from '../../../utils/Common';

definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  },
});

const {
    data,
} = useAuth();

const title = ref('');
const body = ref('');
const selectedTopics = ref([]);
const successMessage = ref('');
const errorMessage = ref('');
const isWorking = ref(false);

// console.log(data.value.user);

const topics = await $fetch('/api/topic', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
});

async function registerArticle(){
    try {
        isWorking.value = true;

        let userId = data.value.user.id;
        const providerName = data.value.user.providerName;
        if (providerName !== "credentials") {
            userId = getUserIdByOAuthUserInfo(providerName, userId);
        }

        const res = await $fetch('/api/article/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                title: title.value,
                body: body.value,
                topics: selectedTopics.value,
                id: userId
            }
        });

        if (res.success) {
            errorMessage.value = '';
            successMessage.value = '投稿完了。3秒後にログイン画面に遷移します。';
            setTimeout(() => {
                navigateTo('/');
            }, 3000);
        }else {
            errorMessage.value = res.error;
            successMessage.value = ''
        }
    } catch (error) {
        errorMessage.value = error.message;
        successMessage.value = ''
        console.log(error);
    } finally {
        isWorking.value = false;
    }
}

</script>

<template>
    <div class="ui text container">
      <h1 class="ui header">
        Post
      </h1>
      <div v-if="errorMessage" class="ui red message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="ui green message">{{ successMessage }}</div>
      <form class="ui form" @submit.prevent="registerArticle">
        <div class="ui form">
            <div class="field">
                <label>Title</label>
                <input v-model="title" type="text" required/>
            </div>
            <div class="field">
                <label>Body</label>
                <textarea v-model="body" rows="10" required></textarea>
            </div>
            <div class="fields">
                <div v-for="topic in topics.result" :key="topic.id" class="field">
                    <div class="ui checkbox">
                        <input :id="topic.name" type="checkbox" name="topic" :value="topic.id" v-model="selectedTopics">
                        <label :for="topic.name">{{ topic.name }}</label>
                    </div>
                </div>     
            </div>
            
            <button :disabled="isWorking" class="ui blue button" type="submit">Post</button>
        </div>
      </form>
    </div>
  </template>