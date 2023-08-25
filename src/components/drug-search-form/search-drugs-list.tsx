import * as React from 'react';
import {SearchItem} from "./search-item";
import {Drug} from "../../types";

export function SearchDrugsList(props: { drugs: Drug[], selectDrug: Function }) {
    const drugs = props.drugs
    const selectDrug = props.selectDrug
    return (
        <div>
            {drugs.length > 0 && <div className={'search-drugs-list'}>
                {drugs.map((drug: Drug, index: number) =>
                    <SearchItem
                        key={`search-item-${index}`}
                        onClick={() => selectDrug(drug)}
                        name={drug.name}/>
                )
                }
            </div>}
        </div>
    );
}