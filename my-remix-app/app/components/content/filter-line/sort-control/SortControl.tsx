import {SortByOptions} from "../../../../constants/sort-control-const";
import {SortControlData} from "../../../../models/sortControl";
import React from "react";

function SortControl({currentSorting, onSortChanged}: SortControlData): React.JSX.Element {
    const onSortChange = (event: any)=> {
        onSortChanged(event.target.value);
    }

    return (
        <div className="sort-by-block" data-testid="sort-control">
            <span className="sort-by-text">SORT BY</span>
            <select className="sort-by-dropdown"
                    value={currentSorting}
                    onChange={onSortChange}
                    data-testid="sort-select"
            >
                <option key={SortByOptions.releaseDate.value}
                        value={SortByOptions.releaseDate.value}
                >{SortByOptions.releaseDate.label}</option>
                <option key={SortByOptions.title.value}
                        value={SortByOptions.title.value}
                >{SortByOptions.title.label}</option>
            </select>
        </div>
    );
}

export default SortControl;
