import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getThemeThunk, selectTheme } from "store/themeSlice";
import { useNavigate } from "react-router-dom";
import { RecordTitle } from "../widgets/RecordTitle";
import { selectLang } from "store/langSlice";
import styled from "styled-components"
import { Langs, Theme } from "store/types";


const ImageWrapper = styled.figure`
    margin: 0;
    width: 708px;
    height: 600px;
    background-color: var(--video-bg);
    border-radius: 20px;    
    //overflow: hidden;
    `;

const Image = styled.img`
    border-radius: 20px;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Author = styled.figcaption`
    color: var(--white);

    a {
        text-decoration: none;
        transition: color 0.15s ease-in;
        
        &:link {
            color: var(--blue-accent);
        }
        &:visited {
            color: var(--white);
        }
        &:hover {
            color: var(--blue-accent);
        }
        &:active {
            color: var(blue-cookie-hover);
        }
    }
`;

const Word = styled.span`
    text-transform: capitalize;  
`;

export const RecordImageBlock = () => {
    const lang: Langs = useAppSelector(selectLang)
    const theme: Theme | null = useAppSelector(selectTheme)
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getThemeThunk())
    }, [dispatch, navigate])

    return (
        <section>
            <RecordTitle>
                {lang === Langs.RU ? ` Категория` : `Category`} “
                <Word>
                    {lang === Langs.RU ? theme?.category.name : theme?.category.translate}
                </Word>": <Word>
                    {lang === Langs.RU ? theme?.word : theme?.translate}
                </Word>
            </RecordTitle>
            <ImageWrapper>
                <Image src={theme?.image_uri} alt={theme?.word}/>
                <Author>
                    {lang === Langs.RU ? "Автор: " : "Author: "}
                        <a href={ theme?.image_author } target="_blank" rel="noreferrer noopener">
                            { theme?.image_author }
                        </a>
                </Author>
            </ImageWrapper>
        </section>
    )
}