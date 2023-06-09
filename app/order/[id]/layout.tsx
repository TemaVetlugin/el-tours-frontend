import React from "react";

export async function generateMetadata({ params }: any) {
    return {
        title: `Заказ №${params.id}`,
    };
}

export default function Layout({ children }: { children: React.ReactNode}) {
    return children;
}
