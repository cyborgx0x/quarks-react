import LoadingOrError from './components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const NucleiOptionView = lazy(async () => import('./pages/NucleiOption'))
const ScanProgress = lazy(async () => import('./pages/ScanProgress'))
const TemplateSelections = lazy(async () => import('./pages/TemplateSelections'))
const Templates = lazy(async () => import('./pages/Templates'))
const Login = lazy(async () => import('./pages/Login'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/templates' element={<Templates />} />
					<Route path='/scan/select' element={<TemplateSelections />} />
					<Route path='/scan/:uuid' element={<ScanProgress />} />
					<Route path='/profiles' element={<NucleiOptionView />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
