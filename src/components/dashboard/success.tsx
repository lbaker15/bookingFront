import { useEffect, useState, useContext } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CreateBooking } from "../../hooks/createBooking";
import { getCookie } from "../../helpers/main";
import { Context, State } from "../../store/store";

type SearchParamsTuple = ReturnType<typeof useSearchParams>;
interface SearchParams {
    [key: string]: string | string[] | undefined;
}

const SuccessInner = () => {
    const params = useParams();
    const [errorMsg, setError] = useState<string | null>(null);
    const [currId, setCurrId] = useState<string[] | null>(null);
    const [search] = useSearchParams() as SearchParamsTuple;
    const token = getCookie("httpCookie");
    const [session, setSession] = useState<string | null>(null);
    const [enabled, setEnabled] = useState(false);
    const [state, setState] = useState<any>({
        title: search.get("title"),
        eventId: search.get("eventId"),
        count: Number(search.get("count")),
    });
    const { data, refetch, error }: any = CreateBooking({
        ...state,
        enabled,
        token,
        session,
    });

    useEffect(() => {
        const session = getCookie("httpSessionId");
        setSession(session);
        setEnabled(true);
    }, []);

    useEffect(() => {
        if (data && data.createData) {
            setCurrId(data.createData);
        }
    }, [data]);

    return (
        <div className="min-h-screen">
            <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2 p-8 mx-auto rounded-sm bg-white-100 w-fit text-purple">
                    {errorMsg || error ? (
                        <>
                            <h1 className="mb-4 text-2xl uppercase">
                                Booking unsuccessful.{" "}
                            </h1>
                            <p className="mb-6 max-w-[250px] text-center">
                                {errorMsg
                                    ? errorMsg
                                    : error
                                    ? String(error).split("END ERROR")[0]
                                    : ""}
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="mb-4 text-2xl uppercase">
                                Booking successful
                            </h1>
                            <p className="">
                                Booking confirmation number
                                {currId && currId.length > 1 && "s"}:
                            </p>
                            <div className="mb-6">
                                {currId && (
                                    <ul>
                                        {currId.map(
                                            (value: any, index: number) => {
                                                return (
                                                    <li key={"cib" + index}>
                                                        Ticket {index + 1} :{" "}
                                                        {value._id}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                )}
                            </div>
                        </>
                    )}

                    <Link className="u-button" to="/dashboard">
                        Back to Dashboard
                    </Link>
                    <Link className="u-button" to="/profile">
                        View All Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Success = () => {
    const { state }: State = useContext(Context);
    return <>{state.mainUrl && <SuccessInner />}</>;
};
export default Success;
