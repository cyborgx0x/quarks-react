import LoadingOrError from "./components/LoadingOrError";
import type { ReactElement } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LayoutProvider from "./LayoutContext";
const TemplateList = lazy(async () => import("./pages/Templates"));
const ScanList = lazy(async () => import("./pages/ScanList"));
const ScanProfiles = lazy(async () => import("./pages/Profiles"));
const TargetList = lazy(async () => import("./pages/TargetList"));


const Login = lazy(async () => import("./pages/Login"));

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <LayoutProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/templates" element={<TemplateList />} />
            <Route path="/scans" element={<ScanList />} />
            <Route path="/profiles" element={<ScanProfiles />} />
            <Route path="/targets" element={<TargetList />} />

          </Routes>
        </LayoutProvider>
      </Suspense>
    </BrowserRouter>
  );
}
