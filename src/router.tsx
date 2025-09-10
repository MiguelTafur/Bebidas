import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

const IndexPage = lazy(() => import ('./views/IndexPage'))
const FavoritesPage = lazy(() => import ('./views/FavoritesPage'))
const AIPage = lazy(() => import ('./views/GenerateAI'))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={
                <Suspense fallback="Cargando...">
                  <IndexPage/>
                </Suspense>} index />
              <Route path="/favoritos" element={
                <Suspense>
                  <FavoritesPage/>
                </Suspense>
                } />
                <Route path="/AI" element={
                <Suspense>
                  <AIPage/>
                </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
