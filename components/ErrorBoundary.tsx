import React, { type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-lg font-semibold mb-2">Oops, there was an error!</h2>
          <p>Something went wrong. Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

