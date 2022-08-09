import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import NewQuotes from "./pages/NewQuotes";
import DetailQuotes from "./pages/DetailQuotes";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/quotes"></Redirect>
				</Route>
				<Route path="/quotes" exact>
					<AllQuotes />
				</Route>
				<Route path="/quotes/:quoteid">
					<DetailQuotes />
				</Route>
				<Route path="/add-quotes">
					<NewQuotes />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
