import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import {SearchDrugsList} from "./search-drugs-list";
import {searchDrugs} from "../../api";
import {parseDrugsData} from "../../data-parsers";
import {Drug} from "../../types";

export function DrugSearchForm(props: { addDrugToPrescriptionTable: Function }) {
    const [drugSearchItems, setDrugSearchItems] = useState<Drug[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null)
    const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchText(searchTerm);
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm]);
    useEffect(() => {
        if (debouncedSearchText && !selectedDrug) {
            searchDrugs(debouncedSearchText).then(drugsData => {
                const list: Drug[] = parseDrugsData(drugsData)
                setDrugSearchItems(list)
            })
        } else {
            setDrugSearchItems([])
        }
    }, [debouncedSearchText, selectedDrug]);

    function selectDrug(drug: Drug) {
        setSelectedDrug(drug)
        setSearchTerm(drug.name)
        setDrugSearchItems([])
    }

    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className={'drug-search-form'}>
            <div className={'search-bar'}>
                <input className={'search-text-input'}
                       placeholder={'Search Drugs, select and press Add Drug'}
                       type={'text'}
                       ref={inputRef}
                       value={searchTerm}
                       onChange={async (event) => {
                           if (selectedDrug) {
                               setSelectedDrug(null)
                           }
                           setSearchTerm(event.target.value)

                       }}
                       onClick={() => {
                           if (inputRef.current) {
                               inputRef.current.select()
                           }
                       }}
                />

                <button className={'add-drug-btn'}
                        onClick={() => props.addDrugToPrescriptionTable(selectedDrug)}>
                    Add Drug
                </button>

            </div>
            {drugSearchItems &&
                <SearchDrugsList
                    drugs={drugSearchItems}
                    selectDrug={selectDrug}
                />
            }
        </div>
    );
}