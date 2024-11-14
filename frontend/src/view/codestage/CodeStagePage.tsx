import {Editor} from "@monaco-editor/react";
import React, {useState} from "react";
import S from './CodeStage.style';
import Text, {TextSize} from "../../shared/component/Text";
import Spacer from "../../shared/component/Spacer";
import {dummyReviews} from "../../model/Review";
import './style.css';
import {SendIcon} from "../../shared/component/Icons";
import ReviewCell from "./component/ReviewCell";
import {css} from "styled-components";

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
                className={'code-editor'}
                height={'100%'}
                width={'calc(100vw - 480px)'}
                defaultLanguage={'swift'}
                defaultValue={dummyCode}
                theme={'vs-dark'}
            />
            <S.sidebarContainer>
                <Text size={TextSize.Large} text={'코드 리뷰'} customStyle={css`padding: 16px`}/>
                <S.commentContainer>
                    {dummyReviews.map(review => (
                        <ReviewCell review={review}/>
                    ))}
                </S.commentContainer>
                <S.inputContainer>
                    <S.textareaContainer>
                        <S.textarea/>
                    </S.textareaContainer>
                    <S.sendButton>
                        <SendIcon width={32} height={32} fill={'var(--primary)'}/>
                    </S.sendButton>
                </S.inputContainer>
            </S.sidebarContainer>
        </S.root>
    )
};