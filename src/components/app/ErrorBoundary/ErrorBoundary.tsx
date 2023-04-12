import React, { Component, ReactNode } from "react"
import { StandartErrorContent } from "./StandartErrorContent"


type Props = {
    children: ReactNode
    content?: ReactNode
}

type State = {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }
    // to render a fallback UI after an error has been thrown
    static getDerivedStateFromError (error: Error): State {
        return { hasError: true }
    }
    // to log error
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // TODO
        console.warn(`${error}: ${errorInfo}`);        
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    { this.props.content && <StandartErrorContent/> }
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary