import React, { Suspense, ComponentType } from "react";
import { Preloader } from "../components/common/Preloader/Preloader";


type InjectedProps = {};

export function withSuspense<PropsType extends JSX.IntrinsicAttributes>(Component: ComponentType<PropsType>) {
    function SuspenseComponent(props: InjectedProps) {
        return (
                <Suspense fallback={<Preloader/>}>
                    <Component {...props as PropsType}/>
                </Suspense>
        )
    } 
    return <SuspenseComponent/>
}