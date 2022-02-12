import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import {HeroCard} from "./HeroCard";
import {useMemo} from "react";

export const HeroList = ({ publisher }) => {

    const heroes =  useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="row animate__animated animate__fadeIn">
            <h1>{ publisher }</h1>
            <hr/>
            {
                heroes.map(hero => (
                    <div key={ hero.id } className="col-3">
                        <HeroCard {...hero} />
                    </div>
                ))
            }
        </div>
    )
}