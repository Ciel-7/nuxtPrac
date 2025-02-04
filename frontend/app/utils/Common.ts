// 日付オブジェクトをフォーマットして文字列で返す。
export const formatDate = (date: Date, sep=""): string => {
    const yyyy = date.getFullYear();
    const mm = ('00' + (date.getMonth()+1)).slice(-2);
    const dd = ('00' + date.getDate()).slice(-2);
  
    return `${yyyy}${sep}${mm}${sep}${dd}`;
}