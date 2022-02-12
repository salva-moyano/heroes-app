import React, {useMemo} from "react";
import {useForm} from "../../hooks/UseForm";
import {getHeroesByName} from "../../selectors/getHeroesByName";
import {HeroCard} from "../hero/HeroCard";
import {useNavigate, useLocation} from "react-router-dom";
import queryString from 'query-string';

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {q = ''} = queryString.parse(location.search);

    const [formValues, handleInputChange, reset]  = useForm({
        searchText: q
    })
    const { searchText } = formValues;

    const heroesFiltered =  useMemo(() => getHeroesByName(q), [q])

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`)
    }

    return(
        <>
            <div className="row">
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr/>
                    <form onSubmit={ handleSearch }>
                        <input type="text"
                               placeholder="Buscar un héroe"
                               className="form-control"
                               autoComplete="off"
                               value={ searchText }
                               onChange={ handleInputChange }
                               name="searchText"/>
                        <div className="d-grid gap-2">
                            <button type="submit"
                                className="btn btn-outline-primary mt-3">
                                Buscar...
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>

                    {
                        (q === '') ? <div className="alert alert-info animate__animated animate__fadeIn">Buscar un héroe</div>
                            : ( heroesFiltered.length === 0) && <div className="alert alert-danger animate__animated animate__fadeIn">No hay resultados {q}</div>
                    }

                    <hr />
                    {
                      heroesFiltered.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                      ))
                    }
                </div>
            </div>
        </>
    )
}