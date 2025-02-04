<script lang="ts" setup>
// 認可の設定
definePageMeta({
    // 未ログインユーザのみアクセス許可。
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/' // 未ログインユーザのみ許可時にログインユーザが来たときのリダイレクト先
        // navigateUnauthenticatedTo: '/' ログインユーザのみ許可時に未ログインユーザが来たときのリダイレクト先
    }
});

// 入力欄の値、ログイン処理のメソッド
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const { status, signIn } = useAuth();

// ログイン処理を試み、成功なら一覧ページにリダイレクト、失敗 or 例外ならエラーメッセージ表示。
const handleLogin = async () => {
    try {
        // ログイン処理呼び出し
        const response = await signIn('credentials', {
            email: email.value,
            password: password.value,
            redirect: false,
        });

        // 成功
        if (response.error === null) {
            navigateTo('/');
        // 失敗
        }else {
            errorMessage.value = 'ログインに失敗しました。メールアドレスまたはパスワードを確認してください。';
        }
    } catch (error) {
        errorMessage.value = 'エラーが発生しました。後でもう一度お試しください。';
    }
}
</script>

<template>
    <div class="ui middle aligned center aligned grid">
        <div class="column" style="width: 30%;">
            <div v-if="errorMessage" class="ui red message">
                {{ errorMessage }}
            </div>
            <h2 class="ui image header">
                <div class="content">
                    Log-in to your account
                </div>
            </h2>
            <form @submit.prevent="handleLogin" class="ui large form">
                <div class="ui stacked secondary  segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address"  v-model="email" required>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" v-model="password" required>
                        </div>
                    </div>
                    <button class="ui fluid large teal submit button" type="submit">Login</button>
                </div>
            </form>

            <div class="ui message">
                New to us? <NuxtLink to="/register-user"><a href="#">Register</a></NuxtLink>
            </div>

            <div class="ui horizontal divider">
                Or
            </div>

            <button class="ui secondary basic button" @click="signIn('github')">
                <i class="github icon"></i>
                GitHub でログイン
            </button>
        </div>
    </div>
</template>