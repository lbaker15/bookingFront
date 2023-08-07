import { useMemo, useContext } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context, State } from "../store/store";

const query2 = gql`
    mutation CreateEvent($input: CreateEvent!) {
        createEvent(input: $input) {
            _id
        }
    }
`;

export const CreateEvent = ({ file, input, enabled, token }: any) => {
    for (const key in input) {
        input[key] = input[key].value;
    }
    input.file = file;
    delete input.image;
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["createEvent", input],
        queryFn: async () => {
            const data = await graphQLClient.request(query2, { input });
            return data;
        },
        enabled: enabled,
    });

    return { data, refetch, error };
};
