import { useMemo, useContext } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Context, State } from "../store/store";

export const FileUpload = (props: any) => {
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJYNTY5MlhBR1dMRFdIckF1VllteWgiLCJpYXQiOjE2NzY3NDAzODl9.8PJjv9fehRpn7bgmfnqf4WIF4TigosglI7s6XSjL79M",
        },
    });

    const query2 = gql`
        mutation fileUpload($file: Upload!) {
            fileUpload(file: $file) {
                Location
            }
        }
    `;
    const enabled = props.enabled;
    const file = props.file;

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["getEvents", file],
        queryFn: async () => {
            const data = await graphQLClient.request(query2, { file });
            return data;
        },
        enabled,
    });
    return { data, refetch, error };
};
