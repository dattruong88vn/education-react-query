import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";
import { HomePage } from "./components/HomePage";
import { RQSuperHeroesPage } from "./components/RQSuperHeroesPage";
import { SuperHeroesPage } from "./components/SuperHeroesPage";
import { HWSuperHeroesPage } from "./components/HWSuperHeroesPage";
import { RQSuperHeroPage } from "./components/RQSuperHeroPage";
import { ParallelQueries } from "./components/ParallelQueries";
import { DynamicParallelQuery } from "./components/DynamicParallelQuery";
import DependentQueryPage from "./components/DependentQuery";
import { PaginationQuery } from "./components/PaginationQuery";
import { InfiniteQuery } from "./components/InfiniteQuery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li> 
              <li>
                <Link to="/hw-super-heroes">HW Super Heroes</Link>
              </li> 
              <li>
                <Link to="/rq-parallel-queries">Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel-queries">
                  Dynamic Parallel Queries
                </Link>
              </li> */}
              <li>
                <Link to="/dependent-query">Dependent Query</Link>
              </li>
              <li>
                <Link to="/pagination-query">Pagination Query</Link>
              </li>
              <li>
                <Link to="/infinite-query">Infinite Query</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/rq-super-hero/:id">
              <RQSuperHeroPage />
            </Route>
            <Route path="/hw-super-heroes">
              <HWSuperHeroesPage />
            </Route>
            <Route path="/rq-parallel-queries">
              <ParallelQueries />
            </Route>
            <Route path="/rq-dynamic-parallel-queries">
              <DynamicParallelQuery heroIds={[1, 3]} />
            </Route>
            <Route path="/dependent-query">
              <DependentQueryPage email="dattruong88vn@gmail.com" />
            </Route>
            <Route path="/pagination-query">
              <PaginationQuery />
            </Route>
            <Route path="/infinite-query">
              <InfiniteQuery />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
