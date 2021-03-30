export type LoadOptions = {
	page: {
		host: string;
		path: string;
		params: Record<string, string | string[]>;
		query: URLSearchParams;
	};
	fetch: (url: string, opts?: object) => Promise<Response>
	session: any;
	context: Record<string, any>;
};

export type Loaded = {
	status?: number;
	error?: Error | string;
	redirect?: string;
	maxage?: number;
	props?: Record<string, any>;
	context?: Record<string, any>;
};
