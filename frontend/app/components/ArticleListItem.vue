<script setup lang="ts">
import { formatDate } from '../utils/Common'

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: 'Title'
    },
    author: {
        type: String,
        default: 'Author'
    },
    createdAt: {
        type: String,
        default: '1999-04-27'
    }
});

const formatedDate = formatDate(new Date(props.createdAt), "-");
</script>

<template>
    <div class="ui card visible">
        <NuxtLink v-bind:to="{ name: 'article-id', params: { id: id } }" class="content">
            <div class="ui header">{{ title }}</div>
            <div class="ui item">{{ author }}</div>
            <div class="ui item">{{ formatedDate }}</div>
        </NuxtLink>
    </div>
</template>