import { useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const DetailQuotes = () => {
	const match = useRouteMatch();
	const params = useParams();
	const quoteid = params.quoteid;

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteid);
	}, [sendRequest, quoteid]);

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered focus">{error}</p>;
	}

	if (!loadedQuote.text) {
		return <p>NO quote found</p>;
	}

	return (
		<div>
			<HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
			<Route path={match.path} exact>
				<div className="centered">
					<Link className="btn--flat" to={`${match.url}/comments`}>
						Load Comments
					</Link>
				</div>
			</Route>
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
		</div>
	);
};

export default DetailQuotes;
