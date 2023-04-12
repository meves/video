import React, { BaseSyntheticEvent, FC, useState } from 'react';
import { 
    EndPageBlockIcon, 
    NextPageBlockIcon, 
    PreviousPageBlockIcon, 
    StartPageBlockIcon 
} from 'components/common/SVG/PaginatorButtons';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentPage, selectSavedVideos, setCurrentPage } from 'store/videoRecordSlice';


const Wrapper = styled.div`
    margin-top: 40px;
`;

const Pagination = styled.div`
    display: flex;
    align-items: center;
`;

const Pages = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    gap: 4px;
`;

const PageNumber = styled.span`
    display: block;
    width: 24px;
    height: 24px;
    text-align: center;
    /* padding: 0 6px; */
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    transition: all 0.15s ease-in;
    
    &:hover {
        cursor: pointer;
        background-color: var(--white);
        border-radius: 4px;
        color: var(--black);
    }
`;

const SelectedNumber = styled(PageNumber)`
    color: var(--black);
    background-color: var(--light-grey);
    border-radius: 4px;
`;

const buttons = css`
    display: flex;
    align-items: center;
    border: none;
    background-color: var(--transparent);

    &:hover {
        cursor: pointer;
    }
`;

const PrevNextButton = styled.button`
    ${ buttons };
    
    &:nth-child(2) {
        margin-right: 17px;
    }
    &:nth-child(4) {
        margin-left: 17px;
    }
`;

const StartStopButton = styled.button`
    ${ buttons };
    
    &:nth-child(1) {
        margin-right: 25px;
    }
    &:nth-child(5) {
        margin-left: 25px;
    }
`

/** React Component Paginator */
type PropsType = {
    pageSize?: number
    blockSize?: number
}

const Paginator: FC<PropsType> = ({
    pageSize=12, 
    blockSize=5
}) => {   
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(selectCurrentPage)
    const totalRecordsCount = useAppSelector(selectSavedVideos)?.count as number

    const pagesCount: number = Math.ceil(totalRecordsCount / pageSize)
    const blocksCount: number = Math.ceil(pagesCount / blockSize)
    const [blockNumber, setBlockNumber] = useState(1)
    
    let start: number = (blockNumber - 1) * blockSize + 1;
    let end: number = (blockNumber * blockSize) > pagesCount ? pagesCount : (blockNumber * blockSize);

    const pages: Array<number> = [];
    for (let i: number = start; i <= end; i++) {
        pages.push(i);
    }

    const handleStartClick = () => {
        setBlockNumber(1);
    }

    const handlePrevClick = () => {
        if (start > 1) {
            setBlockNumber(blockNumber - 1);
        }
    }

    const handleNextClick = () => {
        if (blockNumber < blocksCount)
        setBlockNumber(blockNumber + 1);
    }

    const handleLastClick = () => {
        setBlockNumber(blocksCount);
    }

    const handleChangePageOnClick = (event: BaseSyntheticEvent) => {
        const selectedPage = (Number(event.target.innerText))
        dispatch(setCurrentPage(selectedPage))
    }

    const pagesItems =  pages.map((page: number) => (
        currentPage === page ? 
        <SelectedNumber key={page}>
            { page }
        </SelectedNumber> :
        <PageNumber key={page}>
            { page }
        </PageNumber>
    ))

    return (
        <Wrapper>
            <Pagination>

                <StartStopButton 
                    onClick={handleStartClick}>
                        <StartPageBlockIcon/>
                </StartStopButton>

                <PrevNextButton 
                    onClick={handlePrevClick}>
                        <PreviousPageBlockIcon/>
                </PrevNextButton>

                <Pages 
                    onClick={handleChangePageOnClick}>
                        { pagesItems }
                </Pages>

                <PrevNextButton 
                    onClick={handleNextClick}>
                        <NextPageBlockIcon/>
                </PrevNextButton>

                <StartStopButton 
                    onClick={handleLastClick}>
                        <EndPageBlockIcon/>
                </StartStopButton>

            </Pagination>
        </Wrapper>  
    )
}

export default Paginator;
