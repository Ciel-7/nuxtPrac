import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import loginProcess from '../../../utils/LoginLogic'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// ログイン認証の処理
// 通常の認証はCredentialsProviderで
// OAuth認証はそれぞれのProviderで行う。
// OAuth認証でログイン後はUserテーブルにレコードを追加する処理を挟む
export default NuxtAuthHandler({
    pages: {
        signIn: "/login",
        newUser: "/",
	},
    providers: [
        // 通常のパスワード認証処理
        CredentialsProvider.default({
            async authorize(credentials: { email: string; password: string }) {
                return loginProcess(credentials.email, credentials.password);
            },
        }),
        // GitHub認証の設定。GitHubで発行したクライアントIDとシークレット値を設定。
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // 1. 最初のログイン時のみ DB から取得したカスタムIDを JWT に保存
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('コールバック、JWT');
            console.log(token);
            console.log(user);
            console.log(account);
            console.log(profile);
            console.log(isNewUser);
            
            if(account){
                token.providerName = account.provider;
            }

            return token;
        },
        async session({ session, token }) {
            console.log('コールバック、セッション');
            console.log(token);
            session.user.id = token.sub;
            session.user.providerName = token.providerName;
            return session;
        },
    },
    events: {
        // OAuthでログインしたユーザが記事の投稿ができるようにUserテーブルに新規ユーザを追加する。
        // この時追加するレコードには、OAuthプロバイダーのアカウントのユーザ名とメールアドレス、IDが入る。
        async signIn(message) {
            console.log("イベント、サインイン");
            message.user.test = 'test';
            console.log(message);
            if (message.account?.type === "oauth") {
                const id = parseInt(message.profile?.id, 10) || null;
                const email = message.profile?.email || null;
                const name = message.profile?.name || "GitHub User";

                // TODO idが見つからなかった場合はログイン失敗にしないといけない
                if (id) {
                    // OAuthに使ったアカウント情報がUserテーブルにないか確認
                    let user = await prisma.user.findFirst({
                        where: {
                            provider: message.account?.provider,
                            providerId: id
                        },
                    });

                    // ない場合は新規作成
                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                name: name,
                                email: email,
                                provider: message.account?.provider,
                                providerId: id
                            }
                        });
                    }                    
                }
            }
        },
    }
})
