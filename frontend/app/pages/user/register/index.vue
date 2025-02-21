<script lang="ts" setup>
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    }
});

const name = ref('');
const email = ref('');
const password = ref('');
const isWorking = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Submit押下時に呼ばれるユーザの新規登録処理。
// 成功すればログイン画面にリダイレクト、失敗 or 例外ならエラーメッセージを表示する。
async function registerUser(){
    try {
        isWorking.value = true;

        const res = await $fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                name: name.value,
                email: email.value,
                password: password.value
            }
        });

        if (res.success) {
            errorMessage.value = '';
            successMessage.value = 'ユーザ登録完了。3秒後にログイン画面に遷移します。';
            setTimeout(() => {
                navigateTo('/login');
            }, 3000);
        }else {
            errorMessage.value = res.error;
            successMessage.value = ''
        }
    } catch (error) {
        console.log(error);
    } finally {
        isWorking.value = false;
    }
}
</script>

<template>
    <div class="ui text container">
        <div v-if="errorMessage" class="ui red message">{{ errorMessage }}</div>
        <div v-if="successMessage" class="ui green message">{{ successMessage }}</div>
        <form class="ui form" @submit.prevent="registerUser">
            <div class="field">
                <label>User Name</label>
                <input type="text" name="name" placeholder="User Name" v-model="name">
            </div>
            <div class="field">
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" v-model="email"> 
            </div>
            <div class="field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
            <div class="field">
                <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden">
                <label>I agree to the Terms and Conditions</label>
                </div>
            </div>
            <button :disabled="isWorking" class="ui button" type="submit">Submit</button>
        </form>
    </div>
</template>