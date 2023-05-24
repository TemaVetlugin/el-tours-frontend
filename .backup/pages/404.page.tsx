import { observer } from "mobx-react";
import { NextPage } from 'next'
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import { useRouter } from "next/router";
import { ROUTES } from "shared/contants";
import { useEffect } from "react";

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const Error404Page: NextPage<PropsType> = observer(({ application }) => {
    const router = useRouter();
    useEffect(() => {
        router.push(ROUTES.ERROR_404());
    }, [router]);
    return null;
});

export default Error404Page;
