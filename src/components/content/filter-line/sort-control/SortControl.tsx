import "./SortControl.css";
import {SortByOption} from "../../../../constants/sort-control-const";

function SortControl({currentSorting, sortChanged}: {currentSorting: SortByOption, sortChanged: (value: SortByOption) => void}) {
    const onSortChange = (event: any)=> {
        sortChanged(event.target.value);
    }

    return (
        <div className="sort-by-block" data-testid="sort-control">
            <button className="sort-by-button">SORT BY</button>
            <select className="sort-by-dropdown"
                    value={currentSorting}
                    onChange={onSortChange}
                    data-testid="sort-select"
            >
                <option key={SortByOption.ReleaseDate}
                        value={SortByOption.ReleaseDate}
                >{SortByOption.ReleaseDate}</option>
                <option key={SortByOption.Title}
                        value={SortByOption.Title}
                >{SortByOption.Title}</option>
            </select>
        </div>
    );
}

export default SortControl;
