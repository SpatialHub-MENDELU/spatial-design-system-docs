<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  showNewFolderDialog: () => void;
  showNewFileDialog: () => void;
}>();

// Interface for folder items
interface FolderItem {
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
  isOpen?: boolean; // For toggling folder visibility
}

// Folder structure data
const folders = ref<FolderItem[]>([
  {
    name: 'Homepage',
    type: 'folder',
    isOpen: false,
    children: [
      { name: 'homepage.html', type: 'file' },
      { name: 'homepage.css', type: 'file' },
      { name: 'homepage.js', type: 'file' }
    ]
  },
  {
    name: 'About',
    type: 'folder',
    isOpen: false,
    children: [
      { name: 'about.html', type: 'file' },
      { name: 'about.css', type: 'file' },
      { name: 'about.js', type: 'file' }
    ]
  },
  {
    name: 'Why we',
    type: 'folder',
    isOpen: false,
    children: [
      { name: 'whyWe.html', type: 'file' },
      { name: 'whyWe.css', type: 'file' },
      { name: 'whyWe.js', type: 'file' }
    ]
  },
  {
    name: 'Contact',
    type: 'folder',
    isOpen: false,
    children: [
      { name: 'contact.html', type: 'file' },
      { name: 'contact.css', type: 'file' },
      { name: 'contact.js', type: 'file' }
    ]
  }
]);

// Toggle function for folder visibility
const toggleFolder = (folder: FolderItem) => {
  folder.isOpen = !folder.isOpen;
};

// Icon button actions
const folderStructureData = [
  {
    icon: "file",
    onClick: () => { console.log("file clicked") }
  },
  {
    icon: "folder",
    onClick: () => { console.log("folder clicked") }
  },
  {
    icon: "download",
    onClick: () => { console.log("download clicked") }
  }
];
</script>

<template>
  <div class="border-r border-border-color">
    <!-- Header with buttons and title -->
    <div class="flex justify-between p-3 min-w-[15rem] border-b border-border-color">
      <span class="font-bold lg:text-[20px] text-[16px]">Files</span>
      <div class="flex gap-1.5">
        <button v-for="(item, index) in folderStructureData" :key="index" @click="item.onClick">
          <i :class="`pi pi-${item.icon} text-[16px] duration-300 hover:text-primary`"></i>
        </button>
      </div>
    </div>

    <!-- Folder structure -->
    <div class="p-3">
      <ul>
        <li v-for="(folder, index) in folders" :key="index">
          <div class="flex items-center cursor-pointer" @click="toggleFolder(folder)">
            <!-- Chevron indicating open/close state -->
            <i :class="`pi pi-chevron-${folder.isOpen ? 'down' : 'right'} text-[16px] mr-2`"></i>
            <i :class="`pi pi-folder${folder.isOpen ? '-open' : ''} text-[16px] mr-2`"></i>
            <span>{{ folder.name }}</span>
          </div>

          <!-- Render files if folder is open -->
          <ul v-if="folder.isOpen" class="pl-6 ml-7">
            <li v-for="(file, fileIndex) in folder.children" :key="fileIndex">
              <div class="flex items-center">
                <i class="pi pi-file text-[16px] mr-2" />
                <span>{{ file.name }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Styling for folder and file elements */
ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin: 4px 0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
