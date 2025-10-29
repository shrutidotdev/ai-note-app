import Link from 'next/link'
import {Button} from '@/components/ui/button'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h2 className="text-5xl font-extrabold mb-4">404 - Not Found</h2>
      <p className="text-lg mb-8 text-gray-300">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-white rounded-md shadow-md transition-all duration-300"
      >
        <Button>⬅️ Return Home</Button>
      </Link>
    </div>
  )
}