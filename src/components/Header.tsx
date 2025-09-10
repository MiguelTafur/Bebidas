import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"

export default function Header() {

  const [searchFilter, setSearchFilter] = useState({
    ingredient: '',
    category: ''
  })

  const {pathname} = useLocation()

  const isHome = useMemo(() => pathname === '/' ,[pathname])
  
  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const categories = useAppStore((state) => state.categories)
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  const showNotification = useAppStore((state) => state.showNotification)

  useEffect(() => {fetchCategories()}, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(searchFilter).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return false
    }
    // Consultar las resetas  
    searchRecipes(searchFilter)
  }

  return (
    <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img src="/logo.svg" alt="Logotipo" className="w-32"/>
                </div>
                <nav className="flex gap-3">
                  <NavLink className={({isActive}) => isActive ?  'text-orange-400 uppercase font-bold' : 'text-white uppercase font-bold' } to="/">Inicio</NavLink>
                  <NavLink className={({isActive}) => isActive ?  'text-orange-400 uppercase font-bold' : 'text-white uppercase font-bold' } to="/favoritos">Favoritos</NavLink>
                  <NavLink className={({isActive}) => isActive ?  'text-orange-400 uppercase font-bold' : 'text-white uppercase font-bold' } to="/AI">Generar con IA</NavLink>
                </nav>
            </div>
            {isHome && (
              <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label htmlFor="ingredient" className="block text-white uppercase font-bold text-lg">Nombre o Ingredientes</label>
                  <input type="text" id="ingredient" name="ingredient" className="p-3 w-full rounded-lg focus:outline-none bg-amber-50" placeholder="Nombre o Ingrediente. Ej: Vodka, Tequila" value={searchFilter.ingredient} onChange={handleChange}/>  
                </div>
                <div className="space-y-4">
                  <label htmlFor="category" className="block text-white uppercase font-bold text-lg">Categoría</label>
                  <select id="category" name="category" className="p-3 w-full rounded-lg focus:outline-none bg-amber-50" value={searchFilter.category} onChange={handleChange}>  
                    <option value="">-- Selecciona --</option>
                    {categories.drinks.map(category => (
                      <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                    ))}
                  </select>
                </div>
                <input type="submit" className="cursor-pointer bg-orange-800 hover:bg-amber-900 text-white font-bold w-full p-2 rounded-lh uppercase" value="Buscar Recetas"/>
              </form>
            )}
        </div>
    </header>
  )
}
