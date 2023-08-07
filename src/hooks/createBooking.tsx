import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { getCookie } from "../helpers/main";
import { Context, State } from "../store/store";

export const CreateBooking = ({
    session,
    title,
    eventId,
    enabled,
    token,
    count,
}: any) => {
    const { state }: State = useContext(Context);

    const API_URL = `${state.mainUrl}/graphql`;

    const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const query2 = gql`
        mutation createData($input: CreateData!) {
            createData(input: $input) {
                _id
            }
        }
    `;
    const input = { title, eventId, count, session };
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["addData", input],
        queryFn: async () => {
            const data = await graphQLClient.request(query2, { input });
            return data;
        },
        enabled: enabled,
    });

    // console.log('parent', isLoading, data, error);
    return { data, refetch, error };
};
