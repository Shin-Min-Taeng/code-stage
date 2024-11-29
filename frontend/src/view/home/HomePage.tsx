import S from './HomePage.style';
import RepositoryCell from "./component/RepositoryCell";
import {useEffect, useState} from "react";
import Logo from "../../shared/component/Logo";
import Button from "../../shared/component/Button";
import RegisterRepositoryDialog from "./component/RegisterRepositoryDialog";
import RepositoryDetailDialog from "./component/RepositoryDetailDialog";
import GithubrepositoryResponseDto from "shared/dist/github/dto/githubrepository.response.dto";
import githubrepositoryRepo from "../../data/githubrepository.repo";

export default function HomePage() {
    const [searchText, setSearchText] = useState('');
    const [selectedRepository, setSelectedRepository] = useState<GithubrepositoryResponseDto>();
    const [repositories, setRepositories] = useState<GithubrepositoryResponseDto[]>([]);
    
    const [showRegisterRepositoryDialog, setShowRegisterRepositoryDialog] = useState(false);
    const [showRepositoryDetailDialog, setShowRepositoryDetailDialog] = useState(false);
    
    const searchtedRepositories = repositories.filter(repository => (
        repository.url.includes(searchText) || repository.name.includes(searchText) || repository.description.includes(searchText)
    ))

    useEffect(() => {
        (async () => {
            const repositories = await githubrepositoryRepo.getAll();
            console.log(repositories);
            
            setRepositories(repositories.data ?? []);
        })();
    }, []);

    return (
        <>
            <S.container>
                <S.navContainer>
                    <S.navLeftContainer>
                        <S.logoContainer>
                            <Logo size={'large'}/>
                            <S.logoTitleContainer>코드스테이지</S.logoTitleContainer>
                        </S.logoContainer>
                    </S.navLeftContainer>
                    <S.searchInput value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    <S.navRightContainer>
                        <div style={{
                            padding: '0 12px'
                        }}>
                            <Button onClick={() => {
                                setShowRegisterRepositoryDialog(true);
                            }} text={'레포지토리 등록'}/>
                        </div>
                    </S.navRightContainer>
                </S.navContainer>
                <S.content>
                    {(searchText === '' ? repositories : searchtedRepositories).map(repository => (
                        <RepositoryCell
                            key={repository.id}
                            repository={repository}
                            onClick={() => {
                                setSelectedRepository(repository);
                                setShowRepositoryDetailDialog(true);
                            }}
                        />
                    ))}
                </S.content>
            </S.container>
            {showRegisterRepositoryDialog && (
                <RegisterRepositoryDialog dismiss={() => {
                    setShowRegisterRepositoryDialog(false);
                }}/>
            )}
            {showRepositoryDetailDialog && selectedRepository && (
                <RepositoryDetailDialog repository={selectedRepository} dismiss={() => {
                    setShowRepositoryDetailDialog(false);
                }}/>
            )}
        </>
    );
}