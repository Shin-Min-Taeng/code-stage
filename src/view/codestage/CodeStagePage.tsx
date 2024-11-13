import {Editor} from "@monaco-editor/react";
import React, {useState} from "react";
import S from './CodeStage.style';
import Text, {TextSize} from "../../shared/Text";
import Spacer from "../../shared/Spacer";
import {dummyComments} from "../../model/Review";

const dummyCode = 'import SwiftUI\n' +
    'import Component\n' +
    'import SwiftUIUtil\n' +
    '\n' +
    'struct HomeView {\n' +
    '    @EnvironmentObject private var alertProvider: AlertProvider\n' +
    '    @EnvironmentObject private var mainViewModel: MainViewModel\n' +
    '    @EnvironmentObject private var router: RouterViewModel\n' +
    '    \n' +
    '    @StateObject private var viewModel = HomeViewModel()\n' +
    '    \n' +
    '    private var isWorkspaceEmpty: Bool {\n' +
    '        mainViewModel.workspaces.data?.isEmpty ?? true\n' +
    '    }\n' +
    '    \n' +
    '    private var flow: HomeFetchFlow {\n' +
    '        if mainViewModel.workspaces.is(.fetching) {\n' +
    '            .fetching\n' +
    '        } else if isWorkspaceEmpty && mainViewModel.workspaces.is(.success) {\n' +
    '            .empty\n' +
    '        } else {\n' +
    '            .finished\n' +
    '        }\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    'extension HomeView: View {\n' +
    '    var body: some View {\n' +
    '        ScrollView {\n' +
    '            VStack(spacing: 8) {\n' +
    '                HomeWorkspaceContainer(for: flow) {\n' +
    '                    router.navigate(to: MainDestination.workspaceDetail)\n' +
    '                }\n' +
    '                HomeTimetableContainer(for: viewModel.timetables) {\n' +
    '                    router.navigate(to: MainDestination.timetable)\n' +
    '                }\n' +
    '                HomeMealContainer(for: viewModel.meals) {\n' +
    '                    router.navigate(to: MainDestination.meal)\n' +
    '                }\n' +
    '                HomeCatSeugiContainer(for: flow) { action in\n' +
    '                    switch action {\n' +
    '                    case .didClickedChat:\n' +
    '                        router.navigate(to: MainDestination.catSeugi)\n' +
    '                    }\n' +
    '                }\n' +
    '                HomeScheduleContainer(for: viewModel.schedules)\n' +
    '                HomeTaskContainer(for: viewModel.tasks) {\n' +
    '                    router.navigate(to: MainDestination.task)\n' +
    '                }\n' +
    '            }\n' +
    '            .padding(.top, 8)\n' +
    '            .padding(.bottom, 80)\n' +
    '            .padding(.horizontal, 20)\n' +
    '        }\n' +
    '        .refreshable {\n' +
    '            guard let id = mainViewModel.selectedWorkspace?.workspaceId else { return }\n' +
    '            self.viewModel.onAppear(workspaceId: id)\n' +
    '        }\n' +
    '        .scrollIndicators(.hidden)\n' +
    '        .seugiBackground(.primary(.p050))\n' +
    '        .seugiTopBar(\n' +
    '            title: "홈",\n' +
    '            colors: .default.copy(\n' +
    '                backgroundColor: .seugi(.primary(.p050))\n' +
    '            ),\n' +
    '            showBackButton: false\n' +
    '        )\n' +
    '        .animation(.spring(duration: 0.4), value: viewModel.meals)\n' +
    '        .animation(.spring(duration: 0.4), value: viewModel.timetables)\n' +
    '        .onChange(of: flow, initial: true) {\n' +
    '            if $0 == .empty {\n' +
    '                showJoinWorkspaceAlert()\n' +
    '            }\n' +
    '        }\n' +
    '        .onChange(of: mainViewModel.selectedWorkspace, initial: true) {\n' +
    '            guard let id = $0?.workspaceId else { return }\n' +
    '            viewModel.onAppear(workspaceId: id)\n' +
    '        }\n' +
    '    }\n' +
    '    \n' +
    '    func showJoinWorkspaceAlert() {\n' +
    '        alertProvider.present(\n' +
    '            .init(title: "학교 등록하기")\n' +
    '            .message("학교를 등록한 뒤 스기를 사용할 수 있어요")\n' +
    '            .primaryButton("기존 학교 가입") {\n' +
    '                router.navigate(to: MainDestination.joinWorkspaceRole)\n' +
    '            }\n' +
    '            .secondaryButton("새 학교 만들기") {\n' +
    '                router.navigate(to: MainDestination.createWorkspace)\n' +
    '            }\n' +
    '        )\n' +
    '    }\n' +
    '}'; 

export default function CodeStagePage() {
    const [comment, setComment] = useState('');

    return (
        <S.root>
            <Editor
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
                height={'100%'}
                width={'100%'}
                defaultLanguage={'swift'}
                defaultValue={dummyCode}
                theme={'vs-dark'}
            />
            <S.sidebarContainer>
                <S.title>
                    <Text size={TextSize.Large} fontWeight={'bold'} text={'의견 남기기'}/>
                </S.title>
                <Spacer h={10}/>
                <S.commentContainer>
                    {dummyComments.map(comment => (
                        <S.comment>{comment.content}</S.comment>
                    ))}
                </S.commentContainer>
                <div style={{
                    display: 'flex',
                    backgroundColor: '#262627'
                }}>
                    <S.input value={comment} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setComment(event.target.value);
                    }}/>
                    <S.sendButton>
                        Send
                    </S.sendButton>
                </div>
            </S.sidebarContainer>
        </S.root>
    )
};