import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="space-y-8">
          {/* 404 Large Text */}
          <div className="space-y-2">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl font-semibold">Page Not Found</h2>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Decorative Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-teal mx-auto rounded-full" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-brand-blue to-brand-teal text-white hover:opacity-90"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
