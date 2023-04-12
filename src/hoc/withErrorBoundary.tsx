import React, { ComponentType, ReactNode } from "react"
import ErrorBoundary from "components/app/ErrorBoundary/ErrorBoundary"


type InjectedProps = {};

export function withErrorBoundary<PropsType extends JSX.IntrinsicAttributes>(
    Component: ComponentType<PropsType>,
    Content?: ReactNode
) {
    function WithinBoundariesComponent(props: InjectedProps) {
        return (
            <ErrorBoundary content={Content}>
                <Component {...props as PropsType}/>
            </ErrorBoundary>
        )
    }
    return WithinBoundariesComponent
}