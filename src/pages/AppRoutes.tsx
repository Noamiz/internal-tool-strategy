import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { DataExplorerPage } from '@/features/data-explorer/DataExplorerPage'
import { SettingsPage } from '@/features/settings/SettingsPage'
import { SystemPage } from '@/features/system/SystemPage'
import { UsersPage } from '@/features/users/UsersPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/data-explorer" element={<DataExplorerPage />} />
          <Route path="/system" element={<SystemPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

