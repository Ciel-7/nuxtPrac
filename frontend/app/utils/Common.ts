// 日付オブジェクトをフォーマットして文字列で返す。
export const formatDate = (date: Date, sep=""): string => {
    const yyyy = date.getFullYear();
    const mm = ('00' + (date.getMonth()+1)).slice(-2);
    const dd = ('00' + date.getDate()).slice(-2);
  
    return `${yyyy}${sep}${mm}${sep}${dd}`;
}

export const getUserIdByOAuthUserInfo = async (providerName: String, providerId: String): Promise<int> => {
    const res = await $fetch(`/api/user?providerName=${providerName}&providerId=${providerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.result.id;
}