'use client'

import { Keystatic } from '@keystatic/core/ui'
import type { Config } from '@keystatic/core'
import config from '@/keystatic.config'

export default function KeystaticPage() {
  return <Keystatic config={config as Config} />
}
