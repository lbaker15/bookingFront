import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;
const getStripe = () => {
    console.log("kye", process.env);
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);
    }
    return stripePromise;
};
export const checkout = async ({
    id,
    title,
    value,
    email,
    price,
    date,
}: any) => {
    const stripe = await getStripe();
    const mainUrlData = await fetch(
        "https://headless123321.000webhostapp.com/wp-json/acf/v2/options/main_url"
    );
    const mainUrlJson = await mainUrlData.json();
    console.log(mainUrlJson);
    const mainUrl = mainUrlJson.main_url;
    console.log(mainUrl);
    fetch(`${mainUrl}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, value, email, price }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const { id } = data;

            if (id) {
                document.cookie = `httpSessionId=${id}; expires=${date}; path=/ `;
                stripe.redirectToCheckout({
                    sessionId: id,
                });
            }
        })
        .catch((err) => console.log(err));
};
