import * as Sentry from "@sentry/browser";
import { BrowserTracing, } from "@sentry/tracing";

import { UserModel } from "shared/models";

export const ErrorTracker = new class {
    start = async () => {
        if (process.env.NEXT_PUBLIC_ERROR_TRACKING !== 'true') {
            return;
        }

        Sentry.init({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
            integrations: [new BrowserTracing()],
            environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'local',
            tracesSampleRate: process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE ? +process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE : 0.2,
        });
    }

    handle = (error: Error, context: Record<string, any> = {}) => {
        Sentry.captureException(error, {
            extra: context
        });
    }

    setUser = (user: UserModel) => {
        Sentry.setUser({
            id: `${user.id}`,
        });
    }
}


