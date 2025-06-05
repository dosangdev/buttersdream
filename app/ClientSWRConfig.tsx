"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";
import ky from "ky";
export class ApiError {
  status: number;
  message: string;

  constructor({ status, message }: { status: number; message: string }) {
    this.status = status;
    this.message = message || "An unexpected error occurred";
  }
}

export const baseFetcher = ky.extend({
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const data = (await response.json()) as { message?: string };
          const { message = "An error occurred while fetching the data." } =
            data;
          throw new ApiError({ status: response.status, message });
        }
        return response;
      },
    ],
  },
});

export const swrFetcher = async (url: string) => {
  return baseFetcher(url).json<any>();
};

export default function ClientSWRConfig({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnMount: true,
        fetcher: swrFetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
