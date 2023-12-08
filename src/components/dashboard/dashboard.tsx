import React, {
	Suspense,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Context, DispatchContext } from "../../store/store";
import Events from "./events";
import { GetEventsFuture } from "../../hooks/getEventsFuture";
import { getCookie } from "../../helpers/main";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DashboardProps } from "./types";
import Motion from "../../wrappers/motion";

const Panel = ({}: DashboardProps) => {
	const dispatch = useContext(DispatchContext);

	const { data, refetch, error, isLoading } = GetEventsFuture({
		timestamp: 1,
		dispatch,
	});
	//dont NOT use loader based on isLoading as causes issue with infinite scroll
	return <Events />;
};

type Props = {};
const Dashboard = ({}: Props) => {
	const { state } = useContext(Context);

	return <Motion>{state.mainUrl && <Panel />}</Motion>;
};

export default Dashboard;
