import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: 'sudosoph/agentic-architecture',
  },
  ui: {
    brand: { name: 'Agentic Architect' },
  },
  collections: {
    blog: collection({
      label: 'Blog Playbooks',
      path: 'content/blog/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        track: fields.select({
          label: 'Reader Track',
          options: [
            { label: 'Small Business & Workflows', value: 'small-business' },
            { label: 'Models, Tailscale & Rigs', value: 'models-rigs' },
            { label: 'Engineering Deep Dives', value: 'engineering' },
          ],
          defaultValue: 'engineering',
        }),
        kind: fields.select({
          label: 'Article Kind',
          options: [
            { label: 'Deep Dive', value: 'deep-dive' },
            { label: 'Note / Update', value: 'note' },
          ],
          defaultValue: 'deep-dive',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: props => props.value,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
    guides: collection({
      label: 'Step-by-Step Guides',
      path: 'content/guides/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
})
