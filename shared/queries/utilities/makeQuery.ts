import qs from 'qs';
import snakeCase from 'lodash/snakeCase';
import * as Sentry from "@sentry/browser";

import { transformObjectKeys } from './transformObjectKeys';
import { getBackendUrl } from './getBackendUrl';
import { ResponseType } from '../types/ResponseType';
import { UserService } from "shared/services";

type GetOptionsType = {
    endpoint: string,
    host?: string,
    prefix?: string,
    headers?: Record<string, string>,
    params?: Record<string, string | number | string[] | number[] | null | undefined>
}

type PostOptionsType = GetOptionsType & {
    files?: FileList,
    body?: any
};

type SentryErrorType = {
    url?: string,
    endpoint?: string,
    method?: string,
    status?: string | number,
    response?: string | number,
    payload?: string | number,
    description?: string | number,
}

const catchError = ({ url, method, status, response, description, payload, endpoint }: SentryErrorType) => {
    Sentry.captureException(
        new Error(`Fetch failed: ${status} ${method} ${endpoint}`),
        (scope) => scope.setExtras({
            url,
            method,
            status,
            response,
            payload,
            description,
        })
    );
}

const _query = async (method: 'GET' | 'POST', {
    body: payload,
    files,
    headers,
    params,
    host,
    prefix = '/api',
    endpoint
}: PostOptionsType) => {
    const options: RequestInit = {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {}
    };
    let url = `${host || getBackendUrl()}${prefix}${endpoint}`;

    if (UserService.accessToken) {
        options.headers = {
            Authorization: `Bearer ${UserService.accessToken}`
        }
    }

    if (headers) {
        options.headers = {
            ...options.headers,
            ...headers
        }
    }

    if (params) {
        url = `${url}?` + qs.stringify(transformObjectKeys(params, snakeCase));
    }

    if (payload || files?.length) {
        const body = new FormData();
        if (payload) {
            body.set('_json', JSON.stringify(transformObjectKeys(payload, snakeCase)));
        }
        if (files?.length) {
            Array.from(files).forEach((file, index) => body.set(`file_${index}`, file));
        }
        options.body = body;
    }

    let response: Response;
    console.log(1)
    console.log(url)
    try {
        console.log(2)
        response = await fetch(url, options);
        console.log(response)
    } catch (e) {
        catchError({
            url, method, payload, endpoint,
            status: 900,
            response: '',
            description: 'Network error'
        });
        console.log(e)
        return {
            status: 'success',
            statusCode: 900,
            isSuccess: false,
            description: 'Ошибка со связью',
        }
    }

    const text = await response.text();

    if (response.status !== 200) {
        catchError({
            url, method, payload, endpoint,
            status: response.status,
            response: text,
        });
    }

    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        catchError({
            url, method, payload, endpoint,
            status: 409,
            response: text,
            description: 'json parse failed'
        });
        return {
            status: 'success',
            statusCode: 409,
            isSuccess: false,
            description: 'Ошибка обработки информации',
        }
    }

    const transformedResponse = transformObjectKeys(data);
    return {
        isSuccess: transformedResponse.status === 'success',
        description: '',
        ...transformedResponse,
    }
}

export const makeQuery = async <T = {}>(method: "GET" | "POST", options: GetOptionsType | PostOptionsType): Promise<ResponseType<T>> => {
    return await _query(method, options) as ResponseType<T>;
};
