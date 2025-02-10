import { Metadata } from 'next'
import Form from './Form'
import React from 'react'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function Signin() {
  return (<><Form /></>)
}
