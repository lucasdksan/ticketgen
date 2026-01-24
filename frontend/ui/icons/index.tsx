import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const BaseIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg
        width={size}
        height={size}
        role="img"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        {...props}
    />
);

export const Icons = {
    Plus: (p: IconProps) => (
        <BaseIcon {...p}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </BaseIcon>
    ),

    Check: (p: IconProps) => (
        <BaseIcon {...p}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </BaseIcon>
    ),

    Download: (p: IconProps) => (
        <BaseIcon {...p}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </BaseIcon>
    ),

    History: (p: IconProps) => (
        <BaseIcon className="text-indigo-500" {...p}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </BaseIcon>
    ),

    User: (p: IconProps) => (
        <BaseIcon className="text-slate-400" {...p}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </BaseIcon>
    ),

    Event: (p: IconProps) => (
        <BaseIcon className="text-slate-400" {...p}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </BaseIcon>
    ),
};
