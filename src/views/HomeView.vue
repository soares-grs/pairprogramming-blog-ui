<script setup lang="ts">
import postService from '@/services/post-service';
import dateUtils from '@/utils/date.utils';
import { Card } from 'primevue';
import { onMounted, ref } from 'vue';

type Post = {
  id: string,
  title: string,
  content: string,
  createdAt: string,
}

const posts = ref<Post[]>([]);

onMounted(() => {
  postService.getAll()
    .then(({data}) => {
      posts.value = data;
    })
})

</script>

<template>
  <main class="flex justify-center mt-8 flex-col w-full items-center gap-4">
    <div v-for="post in posts" class="w-full flex justify-center">
      <Card class="w-5/12">
        <template #title>{{ post.title }}</template>
        <template #content>
          <div v-html="post.content"></div>
        </template>
        <template #footer>
          <div>
            Criado em {{ dateUtils.formatDateTime(post.createdAt) }}
          </div>
          <div class="flex justify-end gap-4">
            <i class="pi pi-heart text-red-400 cursor-pointer" style="font-size: 1.2rem" v-tooltip.top="'Curtir'"></i>
            <i class="pi pi-eye text-green-300 400 cursor-pointer" style="font-size: 1.2rem" v-tooltip.top="'Ver mais'"></i>
          </div>
        </template>
      </Card>
    </div>
  </main>
</template>
