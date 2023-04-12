import React, { useCallback, useEffect } from "react"
import styled from "styled-components"
import Paginator from "./Paginator";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { getWatchedVideoThunk, getSavedVideosThunk, selectCurrentPage, selectSavedVideos } from "store/videoRecordSlice";
import { Records, Result } from "api/types";
import { formatDate } from "./utils";


const MyNotesWrapper = styled.section`
    padding-top: 65px;
    width: 100%;
`;

const Title = styled.h4`
    margin: 0;
    margin-bottom: 24px;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.2;
    color: var(--white);
`;

const MyVideos = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;
    gap: 24px;

    @media (max-width:1024px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
    }
    @media (max-width:768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
    @media (max-width:520px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
`;

const VideoWrapper = styled.div`
    &:hover img {
        opacity: 0.85;
    }
`;

const VideoLink = styled.div`
    display: block;

    &:hover {
        cursor: pointer;
    }
`;

const VideoImage = styled.img`
    width: 100%;
    display: block;
    object-fit: cover;
    margin-bottom: 12px;

    @media (max-width:768px) {
        margin-bottom: 8px;
    }
`;

const ImageInfo = styled.span`
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    color: var(--white);

    @media (max-width:768px) {
        font-size: 14px;
        line-height: 1.2;
    }
`;

const PaginatorWrapper = styled.div`
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width:768px) {
        padding-top: 20px;
    }
`;

export const MyNotesContainer = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const currentPage = useAppSelector(selectCurrentPage)
    const savedRecords: Records| null = useAppSelector(selectSavedVideos)

    useEffect(() => {
        dispatch(getSavedVideosThunk(currentPage))
    }, [dispatch, currentPage])

    const handleMoveToSelectedVideoOnClick = useCallback((recordId: number) => {
        dispatch(getWatchedVideoThunk(recordId))
            .then(() => {
                navigate("/watch")
            })
            .catch((error: any) => {
                // TODO navigate to 400
                navigate("/error")
            })
    }, [dispatch, navigate])

    return (
        <MyNotesWrapper>
            <Title>Мои записи</Title>
            <MyVideos>
                {savedRecords?.results.map((record: Result) => (
                    <VideoWrapper key={record.id}>
                        <VideoLink
                            onClick={() => handleMoveToSelectedVideoOnClick(record.id)}>
                            <VideoImage src={record.image_uri} alt="picture" title="Посмотреть видео" />
                        </VideoLink>
                        <ImageInfo>{ formatDate(record.create_date) }</ImageInfo>
                    </VideoWrapper>
                ))}
            </MyVideos>
            <PaginatorWrapper>
                <Paginator/>
            </PaginatorWrapper>
        </MyNotesWrapper>
    )
}