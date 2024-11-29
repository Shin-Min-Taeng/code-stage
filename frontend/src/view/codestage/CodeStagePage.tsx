import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Editor} from "@monaco-editor/react";
import S from './CodeStage.style';
import Text, {TextSize} from "../../shared/component/Text";
import './style.css';
import {SendIcon} from "../../shared/component/Icons";
import ReviewCell from "../../shared/component/ReviewCell";
import {css} from "styled-components";
import githubrepositoryRepo from "../../data/githubrepository.repo";
import reviewRepo from "../../data/review.repo";
import {HomeToCodeStage} from "../../navigation/navigation.type";
import GithubDirectory from "shared/dist/github.tree.response.dto";
import DirectoryCell from "./component/DirectoryCell";
import ReviewResponseDto from "shared/dist/review/dto/review.response.dto";
import GithubrepositoryResponseDto from "shared/dist/github/dto/githubrepository.response.dto";
import LanguageUtil from "../../shared/util/LanguageUtil";
import {Row} from "../../shared/component/FlexLayout";

const sortGithubDirectories = (directories: GithubDirectory[]): GithubDirectory[] => {
    return directories
        .map(directory => ({
            ...directory,
            contents: directory.contents ? sortGithubDirectories(directory.contents) : undefined, // 재귀 정렬
        }))
        .sort((a, b) => {
            if (a.type === b.type) {
                return a.name.localeCompare(b.name); // 같은 타입이면 이름으로 정렬
            }
            return a.type === 'directory' ? -1 : 1; // directory를 앞에 배치
        });
};

interface File {
    name: string;
    path: string;
    content: string;
    extension: string;
}

export default function CodeStagePage() {
    const [reviews, setReviews] = useState<ReviewResponseDto[]>();
    const [directories, setDirectories] = useState<GithubDirectory[]>();
    const [file, setFile] = useState<File>();
    const [repository, setRepository] = useState<GithubrepositoryResponseDto>();

    const reviewTextareaRef = useRef<HTMLTextAreaElement>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const filteredReviews = reviews?.filter(review => review.filePath === file?.path)
    const sortedDictionaries = directories && sortGithubDirectories(directories);

    useEffect(() => {
        if (!location.state) {
            navigate('/');
            return;
        }
        const {id}: HomeToCodeStage = location.state;

        (async () => {
            const response = await githubrepositoryRepo.getTree(id);
            setDirectories(response.data);
        })();

        (async () => {
            await fetchReviews();
        })();

        (async () => {
            const response = await githubrepositoryRepo.get(id);
            setRepository(response.data);
        })();
    }, []);

    const fetchReviews = async () => {
        const {id}: HomeToCodeStage = location.state;

        const response = await reviewRepo.get(id);
        setReviews(response.data);
    };

    const registerReview = () => {
        const {id}: HomeToCodeStage = location.state;

        const reviewTextarea = reviewTextareaRef.current
        if (!reviewTextarea?.value || !file) return;

        (async () => {
            await reviewRepo.register(id, {
                content: reviewTextarea.value,
                filePath: file.path,
                lineNumber: 0
            });
            reviewTextarea.value = '';
            await fetchReviews();
        })();
    }

    const onDirectoryClick = (path: string[]) => {
        if (!repository) return;

        const {id}: HomeToCodeStage = location.state;
        const clearedPath = path.join('%2F').replaceAll('/', '%2F');

        (async () => {
            const response = await githubrepositoryRepo.getFile(id, clearedPath);
            const fileName = path[path.length - 1];
            const splittedFileName = fileName.split('.');

            const file: File = {
                name: fileName,
                path: clearedPath,
                content: response.data?.file ?? '',
                extension: splittedFileName[splittedFileName.length - 1]
            };
            setFile(file);
        })();
    };

    return (
        <S.root>
            <S.treeContainer>
                <Row alignItems={'center'} customStyle={css`
                    margin-left: 4px;
                    cursor: pointer;
                    padding: 4px;
                `}>
                    <span onClick={() => {
                        navigate('/');
                    }}>{'<'}</span>
                    <Text size={TextSize.Large} text={'파일'} customStyle={css`padding: 16px`}/>
                </Row>
                {sortedDictionaries && (
                    <DirectoryCell
                        directory={sortedDictionaries[0].contents![0]}
                        depth={0}
                        selectedFilePathId={0}
                        onClick={onDirectoryClick}
                    />
                )}
            </S.treeContainer>
            <Editor
                className={'code-editor'}
                height={'100%'}
                width={'calc(100vw - 480px - 280px)'}
                value={file?.content ?? ''}
                language={LanguageUtil.getLanguage(file?.extension ?? '')}
                // onChange={value => {
                //     setFile(i => {
                //         if (!i) return undefined; 
                //         return {
                //             ...i,
                //             content: value ?? ''
                //         }
                //     })
                // }}
                // theme={'vs-dark'}
            />
            <S.sidebarContainer>
                <Text size={TextSize.Large} text={'코드 리뷰'} customStyle={css`padding: 16px`}/>
                <S.commentContainer>
                    {filteredReviews && filteredReviews.map(review => (
                        <ReviewCell key={review.reviewId} review={review}/>
                    ))}
                </S.commentContainer>
                <S.inputContainer>
                    <S.textareaContainer>
                        <S.textarea ref={reviewTextareaRef}/>
                    </S.textareaContainer>
                    <S.sendButton>
                        <SendIcon onClick={registerReview} width={32} height={32} fill={'var(--primary)'}/>
                    </S.sendButton>
                </S.inputContainer>
            </S.sidebarContainer>
        </S.root>
    )
};