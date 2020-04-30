import React from 'react'
import { OptionsAppState } from './models/OptionsAppState'
import { useSelector } from 'react-redux';

export interface ErrorProps{
  children: React.ReactNode
}

export const ErrorPage = ({children}: ErrorProps) => {
  const error = useSelector<OptionsAppState, Error | null>(x => x.error);

  if(error){
    return (
      <div>
        {error.message}
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  )
}