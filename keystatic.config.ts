import { config, collection, fields } from '@keystatic/core'

const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as
  | `${string}/${string}`
  | undefined

export default config({
  storage: githubRepo
    ? {
        kind: 'github',
        repo: githubRepo,
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: { name: 'Agentic Architect' },
  },
  collections: {
    blog: collection({
      label: 'Essays & Architecture Notes',
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
        briefing: fields.array(fields.text({ label: 'Briefing Takeaway' }), {
          label: '30-Second Briefing (3 Bullets)',
          itemLabel: props => props.value,
        }),
        track: fields.select({
          label: 'Reader Track',
          options: [
            { label: 'Strategy & Operations', value: 'small-business' },
            { label: 'Models & Infrastructure', value: 'models-rigs' },
            { label: 'Systems Architecture', value: 'engineering' },
          ],
          defaultValue: 'engineering',
        }),
        kind: fields.select({
          label: 'Article Kind',
          options: [
            { label: 'Deep Dive', value: 'deep-dive' },
            { label: 'Post', value: 'post' },
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
