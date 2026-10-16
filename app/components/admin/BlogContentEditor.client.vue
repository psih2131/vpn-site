<template>
    <div class="admin-editor">
        <div class="admin-editor__toolbar">
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('bold') }" @click="editor?.chain().focus().toggleBold().run()">B</button>
            <button type="button" class="admin-editor__tool admin-editor__tool--italic" :class="{ 'is-active': editor?.isActive('italic') }" @click="editor?.chain().focus().toggleItalic().run()">I</button>
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }" @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('heading', { level: 3 }) }" @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()">H3</button>
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('heading', { level: 4 }) }" @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()">H4</button>
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('paragraph') }" @click="editor?.chain().focus().setParagraph().run()">P</button>
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('bulletList') }" @click="editor?.chain().focus().toggleBulletList().run()">• List</button>
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('orderedList') }" @click="editor?.chain().focus().toggleOrderedList().run()">1. List</button>
            <button type="button" class="admin-editor__tool" :class="{ 'is-active': editor?.isActive('blockquote') }" @click="editor?.chain().focus().toggleBlockquote().run()">Quote</button>
            <button type="button" class="admin-editor__tool" @click="setLink">Link</button>
            <button type="button" class="admin-editor__tool" @click="editor?.chain().focus().unsetLink().run()">Unlink</button>
            <button type="button" class="admin-editor__tool" @click="imageModalOpen = true">Img</button>
            <button type="button" class="admin-editor__tool" @click="editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">Table</button>
            <template v-if="editor?.isActive('table')">
                <button type="button" class="admin-editor__tool" @click="editor?.chain().focus().addRowAfter().run()">+ Row</button>
                <button type="button" class="admin-editor__tool" @click="editor?.chain().focus().deleteRow().run()">− Row</button>
                <button type="button" class="admin-editor__tool" @click="editor?.chain().focus().addColumnAfter().run()">+ Col</button>
                <button type="button" class="admin-editor__tool" @click="editor?.chain().focus().deleteColumn().run()">− Col</button>
                <button type="button" class="admin-editor__tool" @click="editor?.chain().focus().deleteTable().run()">Del table</button>
            </template>
        </div>

        <div class="admin-editor__panels">
            <div class="admin-editor__panel">
                <div class="admin-editor__panel-title">Редактор</div>
                <div class="admin-editor__canvas text-content">
                    <EditorContent :editor="editor" />
                </div>
            </div>

            <div class="admin-editor__panel">
                <div class="admin-editor__panel-title">HTML-код</div>
                <pre class="admin-editor__code">{{ htmlCode || '<!-- пусто -->' }}</pre>
            </div>
        </div>

        <AdminBlogImageUploadModal
            v-if="imageModalOpen"
            @close="imageModalOpen = false"
            @confirm="onImageConfirm"
        />
    </div>
</template>

<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { TableKit } from '@tiptap/extension-table'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue'])

const htmlCode = ref(props.modelValue || '')
const imageModalOpen = ref(false)

const editor = useEditor({
    content: props.modelValue || '',
    extensions: [
        StarterKit,
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                rel: 'noopener noreferrer',
            },
        }),
        Image.configure({
            inline: false,
            allowBase64: true,
            HTMLAttributes: {
                class: 'blog-content-image',
            },
        }),
        Placeholder.configure({
            placeholder: 'Начните писать текст статьи…',
        }),
        TableKit.configure({
            table: { resizable: false },
        }),
    ],
    onUpdate: ({ editor: current }) => {
        const html = current.getHTML()
        htmlCode.value = html
        emit('update:modelValue', html)
    },
})

watch(
    () => props.modelValue,
    (value) => {
        if (!editor.value) return
        const current = editor.value.getHTML()
        if (value !== current) {
            editor.value.commands.setContent(value || '', false)
            htmlCode.value = value || ''
        }
    },
)

function setLink() {
    if (!editor.value) return
    const previous = editor.value.getAttributes('link').href
    const url = window.prompt('URL ссылки', previous || 'https://')
    if (url === null) return
    if (url === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function onImageConfirm(url) {
    imageModalOpen.value = false
    if (!editor.value || !url) return
    const alt = window.prompt('Alt для картинки (описание)', 'Иллюстрация к статье')
    editor.value.chain().focus().setImage({
        src: url,
        alt: (alt || 'Иллюстрация к статье').trim(),
    }).run()
}

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>
