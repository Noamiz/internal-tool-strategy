import { useOutletContext } from 'react-router-dom'
import type { LayoutContextValue } from './layoutTypes'

export function useLayout() {
  return useOutletContext<LayoutContextValue>()
}

