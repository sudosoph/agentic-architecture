import { vi } from 'vitest'

const fs = {
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}

export default fs
export const { readdirSync, readFileSync, existsSync } = fs
