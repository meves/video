import React from "react"

type Props = {
    width: string
    height: string
    fill: string
    stroke: string
    strokeWidth: string
}

export const ArrowDownSelect = (props: Props) => {
    const { width, height, fill, stroke, strokeWidth } = props

    return (
        <svg width={width} height={height} viewBox="0 0 14 8" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}