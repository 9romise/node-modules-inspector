import type { ServerFunctions } from '../shared/types'
import process from 'node:process'
import { listPackageDependencies } from 'node-modules-tools'

export function createServerFunctions(): ServerFunctions {
  return {
    async listDependencies() {
      const result = await listPackageDependencies({
        cwd: process.cwd(),
        depth: 25,
        monorepo: true,
      })
      return result
    },
    async openInEditor(filename: string) {
      // @ts-expect-error missing types
      await import('launch-editor').then(r => (r.default || r)(filename))
    },
    async openInFinder(filename: string) {
      await import('open').then(r => r.default(filename))
    },
  }
}
