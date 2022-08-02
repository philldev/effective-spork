import {
	FunctionComponent,
	InputHTMLAttributes,
	PropsWithoutRef,
	useId,
} from 'react'

type TextInputProps = {
	label: string
	type?: string
	className?: string
	error?: string
	name?: string
} & InputHTMLAttributes<HTMLInputElement>

export const TextInput: FunctionComponent<TextInputProps> = ({
	className,
	label,
	error,
	type,
	...props
}) => {
	const id = useId()
	return (
		<div className='flex flex-col'>
			<label htmlFor={id} className='mb-1 text-sm text-gray-500'>
				{label}
			</label>
			<input
				id={id}
				className={`${className} h-10 rounded ${
					error ? 'border-red-300' : 'border-gray-300'
				} focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-700`}
				type={type ?? 'text'}
				{...props}
			/>
			{error && <small className='text-red-500'>{error}</small>}
		</div>
	)
}
