import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { PlayVideoButton } from "components/common/SVG/PlayVideoButton";
import EmptyPictureImage from "assets/images/video/watch/empty_picture.png"
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useCommentInitialState } from "components/Forms/utils/hooks";
import { EditPencil } from "components/common/SVG/EditPencil";
import { QuestionComment } from "components/Forms/widgets/Formicons/Question/Question";
import { CommentInputErrors, CommentInputState, CommentVisisted } from "components/Forms/utils/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { saveComment, selectRecordingVideo, selectWatchedVideo, setRecordingVideo } from "store/videoRecordSlice";
import { isInputErrors, validateInputsAndSetInputErrors } from "components/Forms/utils/utils";
import { Record } from "api/types";
import { WatchVideo } from "components/RecordVideo/widgets/Video/WatchVideo";


const VideoWrapper = styled.div`    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 64px 0 36.5px;
`;

const Date = styled.p`
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
    color: var(--white);
    margin-top: 0;
    margin-bottom: 12px;
`;

const Container = styled.div`
    position: relative;
    width: 854px;
    height: 483px;
    margin-bottom: 12px;
    background-color: #1F2D40;
`;

const ImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    img {
        width: 190px;
        height: 133px;
    }
`;

const PlayButtonWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: pointer;
`;

const CommentWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Comment = styled.textarea`
    width: 100%;
    height: 98px;
    padding: 16px;
    margin-bottom: 8px;
    border: 1px solid var(--blue-accent);
    border-radius: 10px;
    outline: none;
    font-size: 16px;     
    resize: none;     
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
`;

const SendButton = styled.button`
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    padding: 16px 32px;
    border: none;
    border-radius: 20px;
    color: ${props => props.disabled ? "var(--black)" : "var(--white)"};
    background-color: ${props => props.disabled ? "var(--grey)" : "var(--blue-accent)"};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    transition: all 0.15s ease-in;
    
    &:hover {
        background-color: ${props => props.disabled ? "" : "var(--blue-start-hover)"};
    }

    &:active {
        color: ${props => props.disabled ? "" : "var(--black)"};
        background-color: ${props => props.disabled ? "" : "var(--blue-start-active)"};
    }
`;

const GoToMyNotesLink = styled(NavLink)`
    padding: 16px 32px;
    border: 1px solid var(--blue-accent);
    border-radius: 20px;
    font-size: 18px;
    text-decoration: none;
    color: var(--white);
    transition: all 0.15s ease-in;

    &:hover {
        background-color: var(--blue-start-hover);
    }

    &:active {
        color: var(--black);
        background-color: var(--blue-start-active);
    }
`;

const EditPencilWrapper = styled.div`
    position: absolute; 
    top: 7%;
    right: 2%; 
`;

const QuestionWrapper = styled.div`
    position: absolute;
    top: 5%;
    right: -5%;
`

export const VideoWatchContainer = () => {    
    const dispatch = useAppDispatch()
    
    const watchedVideo: Record | null = useAppSelector(selectWatchedVideo)
    const recording = useAppSelector(selectRecordingVideo)
    const commentRef = useRef<HTMLTextAreaElement>(null)

    const [sendCommentButtonDisabled, setSendCommentButtonDisabled] = useState<boolean>(true)
    const [showPencil, setShowPencil] = useState<boolean>(true)

    const { initialInputErrors, initialVisited } = useCommentInitialState()

    const [inputState, setInputState] = useState<CommentInputState>({comment: watchedVideo?.comment})
    const [inputVisisted, setInputVisited] = useState<CommentVisisted>(initialVisited)
    const [inputErrors, setInputErrors] = useState<CommentInputErrors>(initialInputErrors)

    const handleCommentOnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        setInputState(prevInputState => ({...prevInputState, [name]: value}))
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))
        validateInputsAndSetInputErrors<CommentInputErrors>(name, value, setInputErrors)
    }, [])

    useEffect(() => {
        if (inputVisisted.comment) {
            setSendCommentButtonDisabled(isInputErrors(inputErrors))
        }
    }, [inputErrors, setSendCommentButtonDisabled, inputVisisted.comment])

    const handleEditNameOnClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const textarea = commentRef.current
        if (textarea) {
            textarea.disabled = false
            textarea.focus()
        }
        setShowPencil(false)
    }, [])

    const handleSendCommentOnClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setSendCommentButtonDisabled(true)
        if (commentRef.current) {
            commentRef.current.disabled = true
        }
        if (watchedVideo) {
            dispatch(saveComment(watchedVideo.id, inputState.comment as string))
                .then(() => {
                    setInputVisited(initialVisited)
                    setInputErrors(initialInputErrors)
                    setShowPencil(true)
                })
                .catch((error: any) => {
    
                })
        }
        
    }, [dispatch, initialInputErrors, initialVisited, inputState.comment, watchedVideo])

    const handlePlayVideoOnClick = useCallback(() => {
        // TODO
        dispatch(setRecordingVideo(true))
    }, [dispatch])

    useEffect(() => {
        return () => {
            dispatch(setRecordingVideo(false))
        }
    }, [dispatch])

    return (
        <VideoWrapper>
            <Date>01.08.2022</Date>            
            <Container>
                <WatchVideo/>
                <ImageWrapper>
                    <img 
                        src={watchedVideo ? watchedVideo.image_uri : EmptyPictureImage}
                        alt="Described figure" 
                    />
                </ImageWrapper>
                {!recording && 
                    <PlayButtonWrapper 
                        onClick={handlePlayVideoOnClick}
                        title="play video"
                    >
                        <PlayVideoButton/>
                    </PlayButtonWrapper>
                }
            </Container>
            
            <CommentWrapper>
                <Comment 
                    ref={commentRef}
                    className={`input ${(inputVisisted.comment && inputErrors.comment) ? "input_error" 
                        : (inputVisisted.comment && !inputErrors.comment) ? "input_success" : ""}`}
                    value={inputState.comment}
                    onChange={handleCommentOnChange}
                    name="comment" 
                    disabled={true}
                    rows={6}
                />
                <EditPencilWrapper 
                    onClick={handleEditNameOnClick}>
                    { showPencil ? <EditPencil/> : null }
                </EditPencilWrapper>
                <QuestionWrapper>
                    <QuestionComment/>
                </QuestionWrapper>
            </CommentWrapper>
            { (inputVisisted.comment && inputErrors.comment) &&
                <div className="error-message">{inputErrors.comment}</div>}
            
            <ButtonsWrapper>
                <SendButton>
                    Отправить запись на почту
                </SendButton>
                <GoToMyNotesLink to="/mynotes">
                    Мои записи
                </GoToMyNotesLink>
                <SendButton    
                    type="submit"
                    onClick={handleSendCommentOnClick}
                    disabled={sendCommentButtonDisabled}                    
                >
                    Сохранить комментарий
                </SendButton>
            </ButtonsWrapper>

        </VideoWrapper>
    )
}