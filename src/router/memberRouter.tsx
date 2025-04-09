import { lazy, Suspense } from "react";
import { Route } from "react-router";

const Loading = <div>Loading...</div>;

const LoginPage = lazy(() => import("./../page/member/LoginPage"));

export default function memberRouter() {
  return (
    <Route path="/members">
      <Route
        path="login"
        element={
          <Suspense fallback={Loading}>
            <LoginPage />
          </Suspense>
        }
      ></Route>
      <Route
        path="logout"
        element={<Suspense fallback={Loading}></Suspense>}
      ></Route>
    </Route>
  );
}
