import SortFilterButtons from "../Components/Buttons/SortFilterButtons";
import Catalog from "../Components/Catalog/Catalog";
import { Banner } from "../Components/Outlet/Banner";

export function MainPage() {
  return (
    <>
      <Banner />
      <div className="container">
        <SortFilterButtons/>
        <Catalog />
      </div>
    </>
  );
}
