import React from 'react'

type TIcon = {
  width?: string
  height?: string
  color?: string
  className?: string
  onClick?: () => void
}

export const SmileFaceIcon: React.FC<TIcon> = (props) => {
  return (
    <>
      <svg
        className={`${props.className} inline-block`}
        width={props.width || '40'}
        height={props.height || '40'}
        onClick={props.onClick}
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='40' height='40' fill='white' />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z'
          fill={props.color || 'var(--white)'}
          stroke='black'
          stroke-width='1.5'
        />
        <path
          d='M13.332 23.333C14.4286 25.2856 17.1469 26.6663 20.0026 26.6663C22.8462 26.6663 25.5593 25.2821 26.6654 23.3379'
          stroke='black'
          stroke-width='1.5'
          stroke-linecap='round'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.9987 16.6663C15.9192 16.6663 16.6654 15.9201 16.6654 14.9997C16.6654 14.0792 15.9192 13.333 14.9987 13.333C14.0782 13.333 13.332 14.0792 13.332 14.9997C13.332 15.9201 14.0782 16.6663 14.9987 16.6663Z'
          fill='black'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24.9987 16.6663C25.9192 16.6663 26.6654 15.9201 26.6654 14.9997C26.6654 14.0792 25.9192 13.333 24.9987 13.333C24.0782 13.333 23.332 14.0792 23.332 14.9997C23.332 15.9201 24.0782 16.6663 24.9987 16.6663Z'
          fill='black'
        />
      </svg>
    </>
  )
}

export const SadFaceIcon: React.FC<TIcon> = (props) => {
  return (
    <>
      <svg
        className={`${props.className} inline-block`}
        width={props.width || '40'}
        height={props.height || '40'}
        onClick={props.onClick}
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z'
          fill={props.color || 'var(--white)'}
          stroke='black'
          stroke-width='1.5'
        />
        <path
          d='M26.668 25C25.5714 23.0474 22.8531 21.6667 19.9974 21.6667C17.1538 21.6667 14.4407 23.051 13.3346 24.9951'
          stroke='black'
          stroke-width='1.5'
          stroke-linecap='round'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.9987 16.6663C15.9192 16.6663 16.6654 15.9201 16.6654 14.9997C16.6654 14.0792 15.9192 13.333 14.9987 13.333C14.0782 13.333 13.332 14.0792 13.332 14.9997C13.332 15.9201 14.0782 16.6663 14.9987 16.6663Z'
          fill='black'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24.9987 16.6663C25.9192 16.6663 26.6654 15.9201 26.6654 14.9997C26.6654 14.0792 25.9192 13.333 24.9987 13.333C24.0782 13.333 23.332 14.0792 23.332 14.9997C23.332 15.9201 24.0782 16.6663 24.9987 16.6663Z'
          fill='black'
        />
      </svg>
    </>
  )
}
