import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const createNewBaseUrl = (url: string | undefined) =>
	axios.create({
		baseURL: url,
	});

const apiService = createNewBaseUrl(process.env.BASE_URL);

const requestInterceptor = (config: AxiosRequestConfig) => {
	return config;
};

const requestInterceptorError = (error: AxiosError): Promise<AxiosError> => {
	console.error(`[request error] [${JSON.stringify(error)}]`);
	return Promise.reject(error);
};

const responseInterceptor = (response: AxiosResponse) => {
	// console.info(`[response] [${JSON.stringify(response)}]`);
	return response;
};

const responseInterceptorError = (error: AxiosError): Promise<AxiosError> => {
	console.error(`[response error] [${JSON.stringify(error)}]`);

	return Promise.reject(error);
};

const addInterceptors = (axiosInstance: AxiosInstance) => {
	axiosInstance.interceptors.request.use(requestInterceptor, requestInterceptorError);
	axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError);
};

addInterceptors(apiService);

export { apiService };
