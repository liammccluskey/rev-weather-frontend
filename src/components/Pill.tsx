import React from 'react'
import styled from 'styled-components'

type Props = {
    title: string;
    selected: boolean;
    color?: 'clear';
    size?: 's' | 'm' | 'l';
    className?: string;

    onClick: () => void;

    style?: any;
}

export const PillLabel = (props: Props) => {
    const {
        title,
        selected,
        color = 'clear', 
        size = 's', // 's' | 'm' | 'l'

        onClick,

        ...rest
    } = props

    return (
        <Root {...rest} className={`${color} ${size} ${selected && 'selected'} ${props.className}`} onClick={onClick}>
            {size === 's' ?
                <h6>{title}</h6>
            : size === 'm' ?
                <h5>{title}</h5>
                : <h4>{title}</h4>
            }
        </Root>
    )
}

const Root = styled.div`
    border: 1px solid;
    border: none;
    white-space: nowrap;
    cursor: pointer;

    &.clear {
        background-color: transparent;
        border-color: var(--border-color) !important;
        border: 1px solid;
    }
    &.clear h6,
    &.clear h5,
    &.clear h4 {
        color: var(--text-main);
    }

    &.selected {
        background-color: var(--tint-translucent);
        border-color: var(--tint) !important;
        border: 1px solid;
    }
    &.selected h6,
    &.selected h5,
    &.selected h4 {
        color: var(--tint);
    }

    &.s {
        padding: 1px 5px;
        border-radius: 10px;
    }
    &.m {
        padding: 3px 7px;
        border-radius: 13px;
    }
    &.l {
        padding: 5px 10px;
        border-radius: 20px;
    }
`