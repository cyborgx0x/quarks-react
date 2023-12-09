import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import type { ReactElement } from 'react'

interface Properties {
	error?: Error
}
export default function LoadingOrError({ error }: Properties): ReactElement {
	return (
		<div className='bg-gray-800'>
			<div className='flex min-h-screen items-center justify-center'>
				<h1 className='text-xl' data-testid='LoadingOrError'>
					{error ? (
						error.message
					) : (
						<Box sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
							<CircularProgress />
						</Box>
					)}
				</h1>
			</div>
		</div>
	)
}
LoadingOrError.defaultProps = {
	error: undefined
}