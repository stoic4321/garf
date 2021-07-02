import React from 'react'

export default function LoginRedirect() {
  return (
    <div className='h-100 w-100 center flex-column' style={{marginTop: '-15rem'}}>
      <h2>Please sign in or sign up to view this page.</h2>
      <br/>
      <br/>
      <br/>
      <br/>
      <a className='h3-font-size my-3' href='/users/sign_in'>Sign In</a>
      <a className='h3-font-size my-3' href='/users/sign_up'>Sign up</a>
    </div>
  )
}
