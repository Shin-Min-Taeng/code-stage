import React, {useState} from "react";
import GithubDirectory from "shared/dist/github/dto/github.tree.response.dto";
import styled, {css} from "styled-components";
import {ClosedDirectoryIcon, FileIcon, OpenedDirectoryIcon} from "../../../shared/component/Icons";

interface DirectoryCellProps {
    directory: GithubDirectory;
    depth: number;
    selectedFilePathId?: number;
    onClick: (path: string[]) => void;
}

function mergeDirectories(directory: GithubDirectory): GithubDirectory {
    if (directory.type === "directory" && directory.contents?.length === 1) {
        const child = directory.contents[0];
        if (child.type === "directory") {
            const mergedChild = mergeDirectories(child);
            return {
                ...mergedChild,
                name: `${directory.name}/${mergedChild.name}`,
            };
        }
    }
    return directory;
}

export default function DirectoryCell(
    {
        directory,
        depth,
        selectedFilePathId,
        onClick
    }: DirectoryCellProps
) {
    const [isOpen, setIsOpen] = useState(false);
    const mergedDirectory = mergeDirectories(directory);
    let isSelected = false;

    const renderIcon = () => {
        switch (directory.type) {
            case 'directory':
                if (isOpen) {
                    return <OpenedDirectoryIcon fill={'#7f8693'}/>;
                } else {
                    return <ClosedDirectoryIcon fill={'#7F8693'}/>;
                }
            case 'file':
                return <FileIcon fill={'#7F8693'}/>;
        }
    };

    const onTitleClick = () => {
        if (mergedDirectory.type === 'file') {
            onClick([mergedDirectory.name]);
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <S.container>
            <S.title
                depth={depth}
                $isSelected={isSelected}
                onClick={onTitleClick}
            >
                {renderIcon()}
                {mergedDirectory.name}
            </S.title>
            {isOpen && mergedDirectory.contents && (
                <S.children>
                    {mergedDirectory.contents.map((child, index) => (
                        <DirectoryCell
                            key={index}
                            directory={child}
                            depth={depth + 1}
                            selectedFilePathId={selectedFilePathId}
                            onClick={path => onClick([mergedDirectory.name, ...path])}
                        />
                    ))}
                </S.children>
            )}
        </S.container>
    );
}

const S = {
    container: styled.ul`
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    `,
    title: styled.div<{
        $isSelected: boolean;
        depth: number;
    }>`
        display: flex;
        align-items: center;
        justify-content: stretch;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
        padding: 8px;
        border-radius: 4px;
        gap: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
            background: rgba(48, 50, 51, 0.04);
        }

        ${(props) => css`
            padding-left: ${props.depth * 8}px;
            background: ${props.$isSelected ? 'var(--container-low)' : 'transparent'};
        `}
    `,
    children: styled.li`
        display: flex;
        flex-direction: column;

        list-style: none;
    `,
};
