import React from "react";

export async function generateMetadata({ params }: any) {
    return {
        title: 'Корзина',
    };
}

export default function Layout({ children }: { children: React.ReactNode}) {
    return children;
}
