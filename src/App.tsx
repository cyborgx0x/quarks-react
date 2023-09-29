import LoadingOrError from './components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const NucleiOptionView = lazy(async () => import('./pages/NucleiOption'))
const ScanProgress = lazy(async () => import('./pages/ScanProgress'))
const TemplateSelections = lazy(async () => import('./pages/TemplateSelections'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/templates' element={<TemplateSelections />} />
					<Route path='/scan/:uuid' element={<ScanProgress />} />
					<Route path='/profiles' element={<NucleiOptionView />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
