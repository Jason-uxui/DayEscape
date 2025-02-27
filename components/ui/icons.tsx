import type { SVGProps } from "react"

export function CreditCard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

export function PaypalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M18.5 5.5c-1.89-1.56-4.31-1.56-5.73-1.56H7.89c-.46 0-.91.3-1.05.75L3.83 16.56c-.12.37.15.74.54.74h3.28l.79-3.43v.15c.14-.45.59-.75 1.05-.75h2.35c4.45 0 7.15-2.06 7.85-6.38c.35-1.98-.09-3.29-1.19-4.39z"
      />
    </svg>
  )
}

