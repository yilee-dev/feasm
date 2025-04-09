import { lazy, Suspense } from "react";
import { Route } from "react-router";

const RentalPage = lazy(() => import("../page/rental/RentalPage"));

export default function rentalRouter() {
  return (
    <Route path={"/rentals"}>
      <Route
        path={"new"}
        element={
          <Suspense>
            <RentalPage />
          </Suspense>
        }
      ></Route>
    </Route>
  );
}
