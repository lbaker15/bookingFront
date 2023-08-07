import useSWR from "swr";
import { fetcher } from "../home/swr";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context, State } from "../../store/store";

const Info = ({ value }: { value: string }) => {
    const { data, errorPhone }: any = useSWR(
        `https://headless.local/wp-json/acf/v2/options/${value}`,
        fetcher
    );
    return (
        <>
            {data && (
                <Link
                    target="blank"
                    to={value === "email" ? "mailto:" : "tel:+" + data[value]}
                >
                    {data[value]}
                </Link>
            )}
        </>
    );
};
const Footer = () => {
    const value: State = useContext(Context);

    return (
        <div
            className={
                value.state.darkMode
                    ? "dark w-full py-10 overflow-hidden dark:bg-blackR-100 dark:text-white-100 bg-purple text-pink relative z-10 footerMotion"
                    : "w-full py-10 overflow-hidden dark:bg-blackR-100 dark:text-white-100 bg-purple text-pink relative z-10 footerMotion"
            }
        >
            <div className="flex flex-col py-6 border-t gap-y-4 sm:justify-between sm:flex-row u-wrapper dark:border-white-100 border-pink">
                <div>&copy; Brand name</div>

                <div className="flex gap-4">
                    <Info value="email" />
                    <Info value="phone_number" />
                </div>
            </div>
        </div>
    );
};
export default Footer;
