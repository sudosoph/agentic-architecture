import { redirect } from 'next/navigation'

// /book used to host its own list of cal.com events, which duplicated the
// services on /work-with-me. Best practice is one canonical services page
// with booking integrated. Redirect any incoming /book links there.
export default function BookRedirect() {
  redirect('/work-with-me')
}
