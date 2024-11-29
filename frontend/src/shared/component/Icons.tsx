import React from "react";

export function SendIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg style={{flexShrink: 0}} viewBox="0 0 24 24" width="24" height="24" fill="current"
             xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M3.42922 20.1759C3.33789 20.5869 3.76435 20.9198 4.14092 20.7316L20.3069 12.6486C20.6754 12.4643 20.6754 11.9384 20.3069 11.7541L4.14092 3.67113C3.76435 3.48285 3.33789 3.81582 3.42922 4.22681L4.8257 10.011C4.91764 10.4247 5.26042 10.7356 5.68116 10.7867L12.8774 12.1007C12.8825 12.1016 12.8882 12.1021 12.8934 12.1023C13.4979 12.1179 13.0018 12.2864 12.8851 12.3006L5.68116 13.616C5.26042 13.6671 4.91764 13.978 4.8257 14.3917L3.42922 20.1759Z"
                  fill="current"/>
        </svg>
    );
}

export function ClosedDirectoryIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg style={{flexShrink: 0}} viewBox="0 0 16 16" width="16" height="16" fill="current"
             xmlns="http://www.w3.org/2000/svg" {...props} >
            <path
                d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path>
        </svg>
    );
}

export function OpenedDirectoryIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg style={{flexShrink: 0}} viewBox="0 0 16 16" width="16" height="16" fill="current"
             xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1H13a1 1 0 0 1 1 1v.5H2.75a.75.75 0 0 0 0 1.5h11.978a1 1 0 0 1 .994 1.117L15 13.25A1.75 1.75 0 0 1 13.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75c0-.464.184-.91.513-1.237Z"></path>
        </svg>
    );
}

export function FileIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg style={{flexShrink: 0}} viewBox="0 0 16 16" width="16" height="16" fill="current"
             xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path>
        </svg>
    );
}