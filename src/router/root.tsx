import { lazy, Suspense } from "react";
import { Route } from "react-router";
import memberRouter from "./memberRouter";

const Loading = <div>Loading...</div>;

const Index = lazy(() => import("../page/member/IndexPage"));

export default function rootRouter() {
  return [
    <Route
      path={"/"}
      element={
        <Suspense fallback={Loading}>
          <Index />
        </Suspense>
      }
    ></Route>,
    memberRouter(),
  ];
}
